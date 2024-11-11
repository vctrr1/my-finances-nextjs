import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import SummaryCard from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { Button } from "../_components/ui/button";
import { isMatch } from "date-fns";

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

  return (
    <div className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-3xl">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="ghost">Relátorio IA</Button>
          <TimeSelect />
        </div>
      </div>
      <SummaryCard month={month} />
    </div>
  );
}
