// ============================================================
// backend/services/printMagazineService.ts
// Business logic & DB access for Print Magazines
// ============================================================

import { prisma } from "@/backend/db/prisma";
import type { PrintMagazineInput, UpdatePrintMagazineInput } from "@/backend/validation/printMagazineSchemas";

export async function getPrintMagazines(params: {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  activeOnly?: boolean;
}) {
  const {
    search,
    page = 1,
    limit = 50,
    sortBy = "createdAt",
    sortOrder = "desc",
    activeOnly = true,
  } = params;

  const where: any = {};

  if (activeOnly) {
    where.isActive = true;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { domain: { contains: search, mode: "insensitive" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.printMagazine.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.printMagazine.count({ where }),
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

export async function getPrintMagazineById(id: string) {
  return prisma.printMagazine.findUnique({
    where: { id },
  });
}

export async function createPrintMagazine(data: PrintMagazineInput) {
  return prisma.printMagazine.create({
    data: {
      ...data,
      websiteUrl: data.websiteUrl || null,
    },
  });
}

export async function updatePrintMagazine(id: string, data: UpdatePrintMagazineInput) {
  return prisma.printMagazine.update({
    where: { id },
    data: {
      ...data,
      ...(data.websiteUrl === "" ? { websiteUrl: null } : {}),
    },
  });
}

export async function deletePrintMagazine(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.printMagazine.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.printMagazine.delete({
    where: { id },
  });
}
