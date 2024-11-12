import { userRole } from "@prisma/client";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
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