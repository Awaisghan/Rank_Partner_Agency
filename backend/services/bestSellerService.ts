// ============================================================
// backend/services/bestSellerService.ts
// Business logic & DB access for Best Sellers
// ============================================================

import { prisma } from "@/backend/db/prisma";
import type { BestSellerInput, UpdateBestSellerInput } from "@/backend/validation/bestSellerSchemas";

export async function getBestSellers(params: {
  search?: string;
  region?: string;
  genre?: string;
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

  if (indexed !== undefined) where.indexed = indexed;
  if (doFollow !== undefined) where.doFollow = doFollow;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.bestSeller.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.bestSeller.count({ where }),
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

export async function getBestSellerById(id: string) {
  return prisma.bestSeller.findUnique({
    where: { id },
  });
}

export async function createBestSeller(data: BestSellerInput) {
  return prisma.bestSeller.create({
    data: {
      ...data,
      domain: data.domain || "",
      exampleUrl: data.exampleUrl || null,
    },
  });
}

export async function updateBestSeller(id: string, data: UpdateBestSellerInput) {
  return prisma.bestSeller.update({
    where: { id },
    data: {
      ...data,
      ...(data.domain === null || data.domain === undefined ? {} : { domain: data.domain }),
      ...(data.exampleUrl === "" ? { exampleUrl: null } : {}),
    },
  });
}

export async function deleteBestSeller(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.bestSeller.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.bestSeller.delete({
    where: { id },
  });
}
