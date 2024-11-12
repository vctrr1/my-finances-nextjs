import { db } from "@/app/_lib/prisma";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { TransactionType } from "@prisma/client";

const getDashBoard = async (month: string) => {
  // objeto que vai ser passado na query do db para perar as transações apenas no mes selecionado
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "DEPOSIT" },
      _sum: { amount: true },
    })
  )?._sum?.amount;

  const investmentsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "INVESTMENT" },
      _sum: { amount: true },
    })
  )?._sum?.amount;

  const expensesTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "EXPENSE" },
      _sum: { amount: true },
    })
  )?._sum?.amount;

  const balance =
    Number(depositsTotal) - Number(expensesTotal) - Number(investmentsTotal);

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / transactionsTotal) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / transactionsTotal) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / transactionsTotal) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  return {
    balance,
    expensesTotal,
    investmentsTotal,
    depositsTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};

export default getDashBoard;
