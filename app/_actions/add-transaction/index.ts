"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import { addTransactionActionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface addTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  date: Date;
}

export const addTransaction = async (params: addTransactionParams) => {
  addTransactionActionSchema.parse(params); //validação dos parametros, se a validação falhar o zod lança uma exceção

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Sem autorização");
  }

  await db.transaction.upsert({
    where: {
      id: params.id,
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });

  revalidatePath("/transactions");
};
