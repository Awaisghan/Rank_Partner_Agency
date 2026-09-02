// ============================================================
// backend/validation/broadcastTelevisionSchemas.ts
// Zod schemas for Broadcast Television
// ============================================================

import { z } from "zod";

export const broadcastTelevisionSchema = z.object({
  affiliate: z.string().min(1, "Affiliate is required"),
  exampleUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  calls: z.string().min(1, "Call sign is required"),
  state: z.string().min(1, "State is required"),
  market: z.string().min(1, "Market is required"),
  dma: z.string().min(1, "DMA is required"),
  segmentType: z.string().min(1, "Segment Type is required"),
  recordingType: z.string().min(1, "Recording Type is required"),
  time: z.string().min(1, "Time is required"),
  rate: z.string().min(1, "Rate is required"),
  isActive: z.boolean().default(true),
});

export const updateBroadcastTelevisionSchema = broadcastTelevisionSchema.partial();

export type BroadcastTelevisionInput = z.infer<typeof broadcastTelevisionSchema>;
export type UpdateBroadcastTelevisionInput = z.infer<typeof updateBroadcastTelevisionSchema>;
