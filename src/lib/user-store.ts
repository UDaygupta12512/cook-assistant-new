import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  bio?: string;
  dietaryPref?: string;
  skillLevel?: string;
  notifications?: {
    emailAlerts?: boolean;
    pushNotifications?: boolean;
    weeklyDigest?: boolean;
    newRecipeAlerts?: boolean;
    cookingReminders?: boolean;
  };
  privacy?: {
    profilePublic?: boolean;
    showActivity?: boolean;
    dataCollection?: boolean;
  };
};

function usersFilePath() {
  return path.join(process.cwd(), "data", "users.json");
}

async function ensureUsersFile(): Promise<void> {
  const file = usersFilePath();
  const dir = path.dirname(file);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify({ users: [] }, null, 2), "utf8");
  }
}

async function readUsers(): Promise<StoredUser[]> {
  await ensureUsersFile();
  const raw = await fs.readFile(usersFilePath(), "utf8");
  const parsed = JSON.parse(raw) as { users?: StoredUser[] };
  return Array.isArray(parsed.users) ? parsed.users : [];
}

async function writeUsers(users: StoredUser[]): Promise<void> {
  await ensureUsersFile();
  await fs.writeFile(usersFilePath(), JSON.stringify({ users }, null, 2), "utf8");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  const e = normalizeEmail(email);
  const users = await readUsers();
  return users.find((u) => normalizeEmail(u.email) === e) ?? null;
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function createUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<Omit<StoredUser, "passwordHash">> {
  const name = params.name.trim();
  const email = normalizeEmail(params.email);
  const password = params.password;

  if (!name) throw new Error("Name is required");
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("Valid email is required");
  if (!password || password.length < 8) throw new Error("Password must be at least 8 characters");

  const users = await readUsers();
  if (users.some((u) => normalizeEmail(u.email) === email)) {
    const err = new Error("Email already in use");
    // @ts-expect-error add code for API layer
    err.code = "EMAIL_EXISTS";
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);

  // omit passwordHash from return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = user;
  return safe;
}

export async function verifyUser(email: string, password: string): Promise<Omit<StoredUser, "passwordHash"> | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = user;
  return safe;
}

export async function updateUserById(
  id: string,
  patch: Partial<Omit<StoredUser, "id" | "createdAt" | "passwordHash">>
): Promise<Omit<StoredUser, "passwordHash">> {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");
  const existing = users[idx];
  const updated: StoredUser = {
    ...existing,
    ...patch,
    // merge nested objects safely
    notifications: { ...existing.notifications, ...patch.notifications },
    privacy: { ...existing.privacy, ...patch.privacy },
  };
  users[idx] = updated;
  await writeUsers(users);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = updated;
  return safe;
}

export async function changePasswordById(params: {
  id: string;
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === params.id);
  if (idx === -1) throw new Error("User not found");
  const existing = users[idx];
  const ok = await bcrypt.compare(params.currentPassword, existing.passwordHash);
  if (!ok) {
    const err = new Error("Current password is incorrect");
    // @ts-expect-error code for API
    err.code = "BAD_PASSWORD";
    throw err;
  }
  if (!params.newPassword || params.newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const passwordHash = await bcrypt.hash(params.newPassword, 12);
  users[idx] = { ...existing, passwordHash };
  await writeUsers(users);
}

