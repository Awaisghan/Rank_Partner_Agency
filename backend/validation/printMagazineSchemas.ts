// ============================================================
// backend/validation/printMagazineSchemas.ts
// Zod schemas for Print Magazines
// ============================================================

import { z } from "zod";

export const printMagazineSchema = z.object({
  title: z.string().min(1, "Title is required"),
  domain: z.string().optional().nullable(),
  websiteUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  fullPagePrice: z.string().min(1, "Full page price is required"),
  spreadPrice: z.string().min(1, "Spread price is required"),
  turnaround: z.string().min(1, "Turnaround time is required"),
  circulation: z.string().min(1, "Circulation is required"),
  isActive: z.boolean().default(true),
});

export const updatePrintMagazineSchema = printMagazineSchema.partial();

export type PrintMagazineInput = z.infer<typeof printMagazineSchema>;
export type UpdatePrintMagazineInput = z.infer<typeof updatePrintMagazineSchema>;
