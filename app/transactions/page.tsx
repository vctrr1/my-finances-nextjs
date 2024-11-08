import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { Transactioncolumns } from "./_colums";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={Transactioncolumns} data={transactions} />
    </div>
  );
};

export default TransactionPage;
