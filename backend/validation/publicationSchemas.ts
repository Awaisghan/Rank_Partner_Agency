// ============================================================
// backend/validation/publicationSchemas.ts
// Zod schemas for Publications
// ============================================================

import { z } from "zod";

export const publicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain: z.string().optional().nullable(),
  logoText: z.string().default(""),
  logoBg: z.string().default("#000000"),
  logoTextColor: z.string().default("#ffffff"),
  logoUrl: z.string().optional().nullable(),
  isNew: z.boolean().default(false),
  tag: z.string().optional().nullable(),
  price: z.number().min(0, "Price must be positive"),
  da: z.number().min(0).max(100, "DA must be between 0 and 100"),
  dr: z.number().min(0).max(100, "DR must be between 0 and 100"),
  tat: z.string().min(1, "Turnaround time is required"),
  region: z.array(z.string()).default([]),
  genres: z.array(z.string()).default([]),
  sponsored: z.boolean().default(false),
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

export const updatePublicationSchema = publicationSchema.partial();

export type PublicationInput = z.infer<typeof publicationSchema>;
export type UpdatePublicationInput = z.infer<typeof updatePublicationSchema>;
