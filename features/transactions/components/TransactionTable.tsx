"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/types";
import {
  TRANSACTION_TYPES,
  //   STATUS_COLORS,
} from "@/lib/cross-cutting/constants";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Miles</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.memberName}
                </TableCell>
                <TableCell>{transaction.partnerName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {transaction.type === "earn" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        transaction.type === "earn"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {
                        TRANSACTION_TYPES[
                          transaction.type.toUpperCase() as keyof typeof TRANSACTION_TYPES
                        ].label
                      }
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {transaction.type === "earn" ? "+" : "-"}
                  {transaction.miles.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.amount > 0
                    ? `$${transaction.amount.toFixed(2)}`
                    : "—"}
                </TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
