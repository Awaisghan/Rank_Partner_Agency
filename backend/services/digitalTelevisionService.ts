// ============================================================
// backend/services/digitalTelevisionService.ts
// Business logic & DB access for Digital Television
// ============================================================

import { prisma } from "@/backend/db/prisma";
import type { DigitalTelevisionInput, UpdateDigitalTelevisionInput } from "@/backend/validation/digitalTelevisionSchemas";

export async function getDigitalTelevisions(params: {
  search?: string;
  location?: string;
  programName?: string;
  sponsored?: boolean;
  indexed?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  activeOnly?: boolean;
}) {
  const {
    search,
    location,
    programName,
    sponsored,
    indexed,
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
      { callSign: { contains: search, mode: "insensitive" } },
      { station: { contains: search, mode: "insensitive" } },
    ];
  }

  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }

  if (programName) {
    where.programName = { contains: programName, mode: "insensitive" };
  }

  if (sponsored !== undefined) where.sponsored = sponsored;
  if (indexed !== undefined) where.indexed = indexed;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.digitalTelevision.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.digitalTelevision.count({ where }),
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

export async function getDigitalTelevisionById(id: string) {
  return prisma.digitalTelevision.findUnique({
    where: { id },
  });
}

export async function createDigitalTelevision(data: DigitalTelevisionInput) {
  return prisma.digitalTelevision.create({
    data: {
      ...data,
      exampleUrl: data.exampleUrl || null,
    },
  });
}

export async function updateDigitalTelevision(id: string, data: UpdateDigitalTelevisionInput) {
  return prisma.digitalTelevision.update({
    where: { id },
    data: {
      ...data,
      ...(data.exampleUrl === "" ? { exampleUrl: null } : {}),
    },
  });
}

export async function deleteDigitalTelevision(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.digitalTelevision.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.digitalTelevision.delete({
    where: { id },
  });
}
