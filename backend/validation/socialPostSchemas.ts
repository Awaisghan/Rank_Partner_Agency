// ============================================================
// backend/validation/socialPostSchemas.ts
// Zod schemas for Social Posts
// ============================================================

import { z } from "zod";

export const socialPostSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  logoText: z.string().min(1, "Logo text is required").max(4, "Max 4 characters"),
  logoBg: z.string().default("#000000"),
  logoTextColor: z.string().default("#ffffff"),
  platforms: z.array(z.string()).min(1, "At least one platform is required"),
  price: z.string().min(1, "Price is required"),
  tat: z.string().min(1, "Turnaround time is required"),
  exampleUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export const updateSocialPostSchema = socialPostSchema.partial();

export type SocialPostInput = z.infer<typeof socialPostSchema>;
export type UpdateSocialPostInput = z.infer<typeof updateSocialPostSchema>;
