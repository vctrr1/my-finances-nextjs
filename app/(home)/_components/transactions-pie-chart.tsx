"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#ffffff",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
};

interface TransactionPieChartProps {
  investmentTotal: number;
  depositsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

export const TransactionsPieChart = ({
  investmentTotal,
  depositsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="mb-6 flex flex-col space-y-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="text-green-500" />
              <p className="text-sm text-muted-foreground">Ganhos</p>
            </div>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.DEPOSIT] || 0}%
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDownIcon className="text-red-500" />
              <p className="text-sm text-muted-foreground">Despesas</p>
            </div>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.EXPENSE] || 0}%
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <PiggyBankIcon className="text-white" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">Investimentos</p>
            </div>
            <p className="text-sm font-bold">
              {typesPercentage[TransactionType.INVESTMENT] || 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
