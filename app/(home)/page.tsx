import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import SummaryCard from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { Button } from "../_components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
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
      <SummaryCard />
    </div>
  );
}
