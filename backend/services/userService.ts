// ============================================================
// backend/services/userService.ts
// Business logic & DB access for Users
// ============================================================

import { prisma } from "@/backend/db/prisma";
import bcrypt from "bcryptjs";
import type { CreateUserInput, UpdateUserInput } from "@/backend/validation/userSchemas";

export async function getUsers(params: {
  search?: string;
  role?: "ADMIN" | "CLIENT";
  activeOnly?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const {
    search,
    role,
    activeOnly = false,
    page = 1,
    limit = 50,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  const where: any = {};

  if (activeOnly) {
    where.isActive = true;
  }

  if (role) {
    where.role = role;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      } // Never return password hashes
    }),
    prisma.user.count({ where }),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    }
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: CreateUserInput) {
  // Check if email already exists
  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
      isActive: data.isActive ?? true,
    },
  });

  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUser(id: string, data: UpdateUserInput) {
  const updateData: any = { ...data };
  
  // Hash new password if provided
  if (data.password && data.password.trim() !== "") {
    updateData.passwordHash = await bcrypt.hash(data.password, 10);
  }
  
  // Remove password from updateData since it maps to passwordHash in db
  delete updateData.password;

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function deleteUser(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.user.delete({
    where: { id },
  });
}
