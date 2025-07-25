import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .email("Invalid email address"),
});

export const BalanceSchema = z.object({
  amount: z
    .number({
      required_error: "amount is required",
      invalid_type_error: "amount must be a number",
    })
    .lte(1000, "Amount must be less than or equal to 1,000")
    .gte(1, "Amount must be greater than or equal to 1"),
});
