/* eslint-disable no-undef */
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

export const newPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(6)
    .max(255),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(6)
    .max(255),
}).superRefine((data, context) => {
  if (data.password !== data.confirmPassword) {
    context.addIssue({
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });
  }
});