// ============================================================
// backend/validation/listicleSchemas.ts
// Zod schemas for Listicles
// ============================================================

import { z } from "zod";

export const listicleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain: z.string().optional().nullable(),
  logoText: z.string().default(""),
  logoBg: z.string().default("#000000"),
  logoTextColor: z.string().default("#ffffff"),
  logoUrl: z.string().optional().nullable(),
  genres: z.array(z.string()).default([]),
  top5Price: z.string().min(1, "Top 5 Price is required"),
  top10Price: z.string().min(1, "Top 10 Price is required"),
  da: z.number().min(0).max(100, "DA must be between 0 and 100"),
  dr: z.number().min(0).max(100, "DR must be between 0 and 100"),
  tat: z.string().min(1, "Turnaround time is required"),
  region: z.array(z.string()).default([]),
  sponsored: z.boolean().default(false),
  indexed: z.boolean().default(true),
  doFollow: z.boolean().default(false),
  exampleUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  llmAeo: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const updateListicleSchema = listicleSchema.partial();

export type ListicleInput = z.infer<typeof listicleSchema>;
export type UpdateListicleInput = z.infer<typeof updateListicleSchema>;
