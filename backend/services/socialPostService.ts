// ============================================================
// backend/services/socialPostService.ts
// Business logic & DB access for Social Posts
// ============================================================

import { prisma } from "@/backend/db/prisma";
import type { SocialPostInput, UpdateSocialPostInput } from "@/backend/validation/socialPostSchemas";

export async function getSocialPosts(params: {
  search?: string;
  category?: string;
  platform?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  activeOnly?: boolean;
}) {
  const {
    search,
    category,
    platform,
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
    ];
  }

  if (category) {
    where.category = { contains: category, mode: "insensitive" };
  }

  if (platform) {
    // Filter by specific platform in the platforms array
    where.platforms = { has: platform };
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.socialPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.socialPost.count({ where }),
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

export async function getSocialPostById(id: string) {
  return prisma.socialPost.findUnique({
    where: { id },
  });
}

export async function createSocialPost(data: SocialPostInput) {
  return prisma.socialPost.create({
    data: {
      ...data,
      exampleUrl: data.exampleUrl || null,
    },
  });
}

export async function updateSocialPost(id: string, data: UpdateSocialPostInput) {
  return prisma.socialPost.update({
    where: { id },
    data: {
      ...data,
      ...(data.exampleUrl === "" ? { exampleUrl: null } : {}),
    },
  });
}

export async function deleteSocialPost(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.socialPost.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.socialPost.delete({
    where: { id },
  });
}
