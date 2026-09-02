// ============================================================
// backend/services/publicationService.ts
// Business logic & DB access for Publications
// ============================================================

import { prisma } from "@/backend/db/prisma";
import type { PublicationInput, UpdatePublicationInput } from "@/backend/validation/publicationSchemas";

export async function getPublications(params: {
  search?: string;
  region?: string;
  genre?: string;
  priceMin?: number;
  priceMax?: number;
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
    priceMin,
    priceMax,
    sponsored,
    indexed,
    doFollow,
    page = 1,
    limit = 50,
    sortBy = "createdAt",
    sortOrder = "desc",
    activeOnly = true,
  } = params;

  // Build the where clause
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

  if (priceMin !== undefined || priceMax !== undefined) {
    where.price = {};
    if (priceMin !== undefined) where.price.gte = priceMin;
    if (priceMax !== undefined) where.price.lte = priceMax;
  }

  if (sponsored !== undefined) where.sponsored = sponsored;
  if (indexed !== undefined) where.indexed = indexed;
  if (doFollow !== undefined) where.doFollow = doFollow;

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query and count in parallel
  const [items, total] = await Promise.all([
    prisma.publication.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.publication.count({ where }),
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

export async function getPublicationById(id: string) {
  return prisma.publication.findUnique({
    where: { id },
  });
}

export async function createPublication(data: PublicationInput) {
  return prisma.publication.create({
    data: {
      ...data,
      exampleUrl: data.exampleUrl || null,
    },
  });
}

export async function updatePublication(id: string, data: UpdatePublicationInput) {
  return prisma.publication.update({
    where: { id },
    data: {
      ...data,
      // If exampleUrl is passed as empty string, convert to null
      ...(data.exampleUrl === "" ? { exampleUrl: null } : {}),
    },
  });
}

export async function deletePublication(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.publication.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.publication.delete({
    where: { id },
  });
}
