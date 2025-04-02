import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  universityId: z.coerce.number(),
  universityCard: z.string().min(1, "University Card is required"), // Fixed
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"), // Added error message for consistency
});
