import { z } from "zod";

export const listTasksSchema = z.object({
  apartmentId: z.string().min(1, "apartmentId is required"),
});