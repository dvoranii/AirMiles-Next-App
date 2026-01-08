"use client";

import { TransactionTable } from "@/features/transactions/components/TransactionTable";
import { TransactionFilters } from "@/features/transactions/components/TransactionFilters";
import { useTransactionFilters } from "@/features/transactions/hooks/useTransactionFilters";
import { mockTransactions } from "@/lib/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionsPage() {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    filteredTransactions,
    resetFilters,
    hasActiveFilters,
  } = useTransactionFilters(mockTransactions);

  const totalEarned = filteredTransactions
    .filter((t) => t.type === "earn")
    .reduce((sum, t) => sum + t.miles, 0);

  const totalRedeemed = filteredTransactions
    .filter((t) => t.type === "redeem")
    .reduce((sum, t) => sum + t.miles, 0);

  const completedCount = filteredTransactions.filter(
    (t) => t.status === "completed"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">
          View and manage all miles transactions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{totalEarned.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From{" "}
              {filteredTransactions.filter((t) => t.type === "earn").length}{" "}
              transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -{totalRedeemed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From{" "}
              {filteredTransactions.filter((t) => t.type === "redeem").length}{" "}
              redemptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredTransactions.length > 0
                ? (
                    (completedCount / filteredTransactions.length) *
                    100
                  ).toFixed(0)
                : 0}
              % success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TransactionFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            onReset={resetFilters}
            hasActiveFilters={hasActiveFilters}
            resultCount={filteredTransactions.length}
          />
          <TransactionTable transactions={filteredTransactions} />
        </CardContent>
      </Card>
    </div>
  );
}
