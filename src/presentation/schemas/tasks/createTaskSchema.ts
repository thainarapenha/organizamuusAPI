import { z } from "zod";

export const createTaskSchema = z.object({
  apartmentId: z.string().min(1),
  responsibleMemberId: z.string().min(1),
  createdByMemberId: z.string().min(1),

  room: z.enum([
    "living_room",
    "kitchen",
    "bedroom",
    "bathroom",
  ]),

  description: z.string().trim().min(1),

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),

  recurrence: z.enum([
    "single",
    "weekly",
  ]),
});