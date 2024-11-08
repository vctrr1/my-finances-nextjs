"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

export const Transactioncolumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-lime-500 bg-opacity-10 text-lime-500 hover:bg-muted">
            <CircleIcon className="mr-1 fill-lime-500" size={10} />
            Depósito
          </Badge>
        );
      } else if (transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge className="text-danger bg-danger bg-opacity-10 hover:bg-muted">
            <CircleIcon className="fill-danger mr-1" size={10} />
            Despesa
          </Badge>
        );
      } else {
        return (
          <Badge className="bg-white bg-opacity-10 text-white hover:bg-muted">
            <CircleIcon className="mr-1 fill-white" size={10} />
            Investimento
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
