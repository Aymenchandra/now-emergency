import { userRole } from "@prisma/client";
import { z } from "zod";

export const expenseSchema = z.object({
  id: z.string(),
  label: z.string(),
  note: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.string()
});

export type Expense = z.infer<typeof expenseSchema>;

export const usersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum([userRole.ADMIN,userRole.USER]),
  image: z.string(),
  emailVerified: z.union([z.date(), z.null(), z.undefined()])
});

export type Users = z.infer<typeof usersSchema>;

export const editUserSchema = z.object({
  name : z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(8),{
      message: "Minimum 8 characters required"
  }),
  newPassword: z.optional(z.string().min(8),{
      message: "Minimum 8 characters required"
  }),
  role: z.enum([userRole.ADMIN,userRole.USER]),
  emailVerified : z.union([z.date(), z.null(), z.undefined()]),
  isTwoFactorEnabled : z.optional(z.boolean())
})

export const deleteUserSchema = z.object({
  id: z.string()
});

export const multideleteUserSchema = z.object({
  idList: z.string().array()
});