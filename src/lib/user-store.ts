/**
 * File-based user store — no database required.
 * Uses a JSON file on the server filesystem for persistence.
 * On Render / Vercel serverless, data resets on restart (acceptable for a portfolio demo).
 * For production, replace this with a real database adapter.
 */
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

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

// ── Persistence helpers ────────────────────────────────────────────────────────

const DB_PATH = path.join(process.cwd(), "users.json");

// In-memory store (seed from file if it exists)
let usersMap: Map<string, StoredUser> = new Map();

function loadFromDisk() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      const arr: StoredUser[] = JSON.parse(raw);
      usersMap = new Map(arr.map((u) => [u.email, u]));
    }
  } catch {
    usersMap = new Map();
  }
}

function saveToDisk() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify([...usersMap.values()], null, 2));
  } catch {
    // Silently fail in read-only environments (Vercel / serverless)
  }
}

// Load on module init
loadFromDisk();

// ── Helpers ────────────────────────────────────────────────────────────────────

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// ── Public API ─────────────────────────────────────────────────────────────────

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  loadFromDisk();
  return usersMap.get(normalizeEmail(email)) ?? null;
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  loadFromDisk();
  for (const user of usersMap.values()) {
    if (user.id === id) return user;
  }
  return null;
}

export async function createUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<Omit<StoredUser, "passwordHash">> {
  loadFromDisk();
  const name = params.name.trim();
  const email = normalizeEmail(params.email);
  const { password } = params;

  if (!name) throw new Error("Name is required");
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("Valid email is required");
  if (!password || password.length < 8) throw new Error("Password must be at least 8 characters");

  if (usersMap.has(email)) {
    const err = new Error("Email already in use");
    // @ts-expect-error add code for API layer
    err.code = "EMAIL_EXISTS";
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user: StoredUser = {
    id: randomUUID(),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
    notifications: {},
    privacy: {},
  };

  usersMap.set(email, user);
  saveToDisk();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = user;
  return safe;
}

export async function verifyUser(
  email: string,
  password: string
): Promise<Omit<StoredUser, "passwordHash"> | null> {
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
  loadFromDisk();
  let existing: StoredUser | undefined;
  for (const user of usersMap.values()) {
    if (user.id === id) { existing = user; break; }
  }
  if (!existing) throw new Error("User not found");

  const updated: StoredUser = {
    ...existing,
    ...patch,
    notifications: { ...existing.notifications, ...(patch.notifications ?? {}) },
    privacy: { ...existing.privacy, ...(patch.privacy ?? {}) },
  };

  usersMap.set(existing.email, updated);
  saveToDisk();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = updated;
  return safe;
}

export async function changePasswordById(params: {
  id: string;
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  loadFromDisk();
  let existing: StoredUser | undefined;
  for (const user of usersMap.values()) {
    if (user.id === params.id) { existing = user; break; }
  }
  if (!existing) throw new Error("User not found");

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
  usersMap.set(existing.email, { ...existing, passwordHash });
  saveToDisk();
}
