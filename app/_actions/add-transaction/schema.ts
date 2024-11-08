import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import { number, z } from "zod";

export const addTransactionActionSchema = z.object({
  name: z.string().trim().min(1),
  amount: number().positive(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(PaymentMethod),
  date: z.date(),
});
