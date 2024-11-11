import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import CardGrid from "./card-grid";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
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

  const investmentTotal = (
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
    Number(depositsTotal) - Number(expensesTotal) - Number(investmentTotal);

  return (
    <div className="space-y-6">
      <Card className="flex items-center justify-between">
        <div>
          <CardHeader className="flex flex-row items-center space-x-2">
            <WalletIcon size={20} className="mt-1" />
            <p className="text-white opacity-70">Saldo</p>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p className="text-3xl font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(balance)}
            </p>
          </CardContent>
        </div>
        <div className="p-6">
          <AddTransactionButton />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-5">
        <CardGrid
          icon={<PiggyBankIcon size={23} strokeWidth={1.5} className="mt-1" />}
          title="Investido"
          amount={Number(investmentTotal)}
        />
        <CardGrid
          icon={<TrendingUpIcon size={19} className="mt-1 text-green-500" />}
          title="Receita"
          amount={Number(depositsTotal)}
        />
        <CardGrid
          icon={<TrendingDownIcon size={19} className="mt-1 text-red-500" />}
          title="Despesas"
          amount={Number(expensesTotal)}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
