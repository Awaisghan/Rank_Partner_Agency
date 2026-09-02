// ============================================================
// backend/services/broadcastTelevisionService.ts
// Business logic & DB access for Broadcast Television
// ============================================================

import { prisma } from "@/backend/db/prisma";
import type { BroadcastTelevisionInput, UpdateBroadcastTelevisionInput } from "@/backend/validation/broadcastTelevisionSchemas";

export async function getBroadcastTelevisions(params: {
  search?: string;
  state?: string;
  market?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  activeOnly?: boolean;
}) {
  const {
    search,
    state,
    market,
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
      { affiliate: { contains: search, mode: "insensitive" } },
      { calls: { contains: search, mode: "insensitive" } },
    ];
  }

  if (state) {
    where.state = { contains: state, mode: "insensitive" };
  }

  if (market) {
    where.market = { contains: market, mode: "insensitive" };
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.broadcastTelevision.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.broadcastTelevision.count({ where }),
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

export async function getBroadcastTelevisionById(id: string) {
  return prisma.broadcastTelevision.findUnique({
    where: { id },
  });
}

export async function createBroadcastTelevision(data: BroadcastTelevisionInput) {
  return prisma.broadcastTelevision.create({
    data: {
      ...data,
      exampleUrl: data.exampleUrl || null,
    },
  });
}

export async function updateBroadcastTelevision(id: string, data: UpdateBroadcastTelevisionInput) {
  return prisma.broadcastTelevision.update({
    where: { id },
    data: {
      ...data,
      ...(data.exampleUrl === "" ? { exampleUrl: null } : {}),
    },
  });
}

export async function deleteBroadcastTelevision(id: string, softDelete = true) {
  if (softDelete) {
    return prisma.broadcastTelevision.update({
      where: { id },
      data: { isActive: false },
    });
  }
  return prisma.broadcastTelevision.delete({
    where: { id },
  });
}
