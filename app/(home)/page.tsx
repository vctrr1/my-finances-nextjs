import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { Button } from "../_components/ui/button";
import { isMatch } from "date-fns";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import getDashBoard from "../_data/get-dashboard";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("?month=01");
  }

  const dashboard = await getDashBoard(month);

  return (
    <div className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-3xl">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="ghost">Relátorio IA</Button>
          <TimeSelect />
        </div>
      </div>
      <div className="grid grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <SummaryCards
            expensesTotal={Number(dashboard.expensesTotal)}
            depositsTotal={Number(dashboard.depositsTotal)}
            investmentTotal={Number(dashboard.investmentsTotal)}
            balance={Number(dashboard.balance)}
          />
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionsPieChart
              expensesTotal={Number(dashboard.expensesTotal)}
              depositsTotal={Number(dashboard.depositsTotal)}
              investmentTotal={Number(dashboard.investmentsTotal)}
              typesPercentage={dashboard.typesPercentage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
