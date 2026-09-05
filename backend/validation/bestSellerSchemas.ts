// ============================================================
// backend/validation/bestSellerSchemas.ts
// Zod schemas for Best Sellers
// ============================================================

import { z } from "zod";

export const bestSellerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain: z.string().optional().nullable(),
  logoText: z.string().min(1, "Logo text is required").max(4, "Max 4 characters"),
  logoBg: z.string().default("#000000"),
  logoTextColor: z.string().default("#ffffff"),
  genres: z.array(z.string()).default([]),
  price: z.string().min(1, "Price is required"),
  da: z.number().min(0).max(100, "DA must be between 0 and 100"),
  dr: z.number().min(0).max(100, "DR must be between 0 and 100"),
  tat: z.string().min(1, "Turnaround time is required"),
  region: z.array(z.string()).default([]),
  sponsored: z.string().min(1, "Sponsored label is required"),
  indexed: z.boolean().default(true),
  doFollow: z.boolean().default(false),
  exampleUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  llmAeo: z.boolean().default(false),
  nicheAge18: z.boolean().default(false),
  nicheHeart: z.boolean().default(false),
  nicheCannabis: z.boolean().default(false),
  nicheCopyright: z.boolean().default(false),
  nicheCasino: z.boolean().default(false),
  nicheAge18Multiplier: z.string().optional().nullable().or(z.literal("")),
  nicheHeartMultiplier: z.string().optional().nullable().or(z.literal("")),
  nicheCannabisMultiplier: z.string().optional().nullable().or(z.literal("")),
  nicheCopyrightMultiplier: z.string().optional().nullable().or(z.literal("")),
  nicheCasinoMultiplier: z.string().optional().nullable().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export const updateBestSellerSchema = bestSellerSchema.partial();

export type BestSellerInput = z.infer<typeof bestSellerSchema>;
export type UpdateBestSellerInput = z.infer<typeof updateBestSellerSchema>;
