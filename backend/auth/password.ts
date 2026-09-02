// ============================================================
// backend/auth/password.ts
// bcrypt password hashing helpers
// ============================================================

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

// Hash a plain-text password
export async function hashPassword(plainText: string): Promise<string> {
  return await bcrypt.hash(plainText, SALT_ROUNDS);
}

// Compare plain-text with hashed password
export async function comparePassword(
  plainText: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(plainText, hash);
}
