// ============================================================
// backend/db/prisma.ts
// Prisma Client Singleton — Prevents too many connections in dev
// ============================================================

import { PrismaClient } from "@prisma/client";

// In Next.js dev mode, hot reload creates new connections.
// We use globalThis to reuse the same instance.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
