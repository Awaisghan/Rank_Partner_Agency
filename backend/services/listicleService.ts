// ============================================================
// backend/services/listicleService.ts
// Business logic & DB access for Listicles
// ============================================================

import { prisma } from "@/backend/db/prisma";
import type { ListicleInput, UpdateListicleInput } from "@/backend/validation/listicleSchemas";

export async function getListicles(params: {
  search?: string;
  region?: string;
  genre?: string;
  sponsored?: boolean;
  indexed?: boolean;
  doFollow?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  activeOnly?: boolean;
}) {
  const {
    search,
    region,
    genre,
    sponsored,
    indexed,
    doFollow,
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
      { name: { contains: search, mode: "insensitive" } },
      { domain: { contains: search, mode: "insensitive" } },
    ];
  }

  if (region) {
    where.region = { has: region };
  }

  if (genre) {
    where.genres = { has: genre };
  }

  if (sponsored !== undefined) where.sponsored = sponsored;
  if (indexed !== undefined) where.indexed = indexed;
  if (doFollow !== undefined) where.doFollow = doFollow;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.listicle.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.listicle.count({ where }),
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

export async function getListicleById(id: string) {
  return prisma.listicle.findUnique({
    where: { id },
  });
}

export async function createListicle(data: ListicleInput) {
  return prisma.listicle.create({
    data: {
      ...data,
      exampleUrl: data.exampleUrl || null,
    },
  });
}

export async function updateListicle(id: string, data: UpdateListicleInput) {
  return prisma.listicle.update({
    where: { id },
    data: {
      ...data,
      ...(data.exampleUrl === "" ? { exampleUrl: null } : {}),
    },
  });
}

export async function deleteListicle(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.listicle.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.listicle.delete({
    where: { id },
  });
}
