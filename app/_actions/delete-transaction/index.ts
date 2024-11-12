import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (id: string) => {
  await db.transaction.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/transactions");
};
