import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

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

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// Convert Prisma user record to StoredUser shape
function toStoredUser(dbUser: {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  bio: string | null;
  dietaryPref: string | null;
  skillLevel: string | null;
  notifications: unknown;
  privacy: unknown;
  createdAt: Date;
}): StoredUser {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    passwordHash: dbUser.passwordHash,
    createdAt: dbUser.createdAt.toISOString(),
    bio: dbUser.bio ?? undefined,
    dietaryPref: dbUser.dietaryPref ?? undefined,
    skillLevel: dbUser.skillLevel ?? undefined,
    notifications: (dbUser.notifications as StoredUser["notifications"]) ?? undefined,
    privacy: (dbUser.privacy as StoredUser["privacy"]) ?? undefined,
  };
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  const e = normalizeEmail(email);
  const user = await prisma.user.findUnique({ where: { email: e } });
  return user ? toStoredUser(user) : null;
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? toStoredUser(user) : null;
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

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("Email already in use");
    // @ts-expect-error add code for API layer
    err.code = "EMAIL_EXISTS";
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      notifications: {},
      privacy: {},
    },
  });

  const stored = toStoredUser(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = stored;
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
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new Error("User not found");

  const updateData: Record<string, unknown> = {};
  if (patch.name !== undefined) updateData.name = patch.name;
  if (patch.email !== undefined) updateData.email = normalizeEmail(patch.email);
  if (patch.bio !== undefined) updateData.bio = patch.bio;
  if (patch.dietaryPref !== undefined) updateData.dietaryPref = patch.dietaryPref;
  if (patch.skillLevel !== undefined) updateData.skillLevel = patch.skillLevel;
  if (patch.notifications !== undefined) {
    const existingNotif = (existing.notifications as Record<string, unknown>) ?? {};
    updateData.notifications = { ...existingNotif, ...patch.notifications };
  }
  if (patch.privacy !== undefined) {
    const existingPrivacy = (existing.privacy as Record<string, unknown>) ?? {};
    updateData.privacy = { ...existingPrivacy, ...patch.privacy };
  }

  const updated = await prisma.user.update({ where: { id }, data: updateData });
  const stored = toStoredUser(updated);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = stored;
  return safe;
}

export async function changePasswordById(params: {
  id: string;
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  const existing = await prisma.user.findUnique({ where: { id: params.id } });
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
  await prisma.user.update({ where: { id: params.id }, data: { passwordHash } });
}
