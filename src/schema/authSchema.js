import { z } from "zod";
export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6)
    .max(255),
});

export const forgetPasswordSchema = z.object({
    email: z.string({ required_error: "Email is required"}).email(),
})
