"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  PAYMENT_METHOD_LABELS,
  TRANSACTION_CATEGORY_LABELS,
} from "@/app/_constants/transactions";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, DeleteIcon } from "lucide-react";
import EditTransactionButton from "../_components/edit-transaction";

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
          <Badge className="bg-danger bg-opacity-10 text-danger hover:bg-muted">
            <CircleIcon className="mr-1 fill-danger" size={10} />
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
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <Button variant="ghost" size="icon">
            <DeleteIcon />
          </Button>
        </div>
      );
    },
  },
];
