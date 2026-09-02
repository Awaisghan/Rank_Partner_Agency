// ============================================================
// backend/validation/digitalTelevisionSchemas.ts
// Zod schemas for Digital Television
// ============================================================

import { z } from "zod";

export const digitalTelevisionSchema = z.object({
  callSign: z.string().min(1, "Call sign is required"),
  station: z.string().min(1, "Station is required"),
  rate: z.string().min(1, "Rate is required"),
  tat: z.string().min(1, "Turnaround time is required"),
  sponsored: z.boolean().default(false),
  indexed: z.boolean().default(true),
  segmentLength: z.string().min(1, "Segment length is required"),
  location: z.string().min(1, "Location is required"),
  programName: z.string().min(1, "Program name is required"),
  interviewType: z.string().min(1, "Interview type is required"),
  exampleUrl: z.string().url("Invalid URL").optional().nullable().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export const updateDigitalTelevisionSchema = digitalTelevisionSchema.partial();

export type DigitalTelevisionInput = z.infer<typeof digitalTelevisionSchema>;
export type UpdateDigitalTelevisionInput = z.infer<typeof updateDigitalTelevisionSchema>;
