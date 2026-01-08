"use client";

import { useState, useEffect, useMemo } from "react";
import { Transaction } from "@/types";
import { storage } from "@/lib/cross-cutting/storage";
import { logger } from "@/lib/cross-cutting/logger";

type TransactionType = "all" | "earn" | "redeem";

interface SavedFilters {
  searchTerm: string;
  typeFilter: TransactionType;
}

export function useTransactionFilters(transactions: Transaction[]) {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const saved = storage.get<SavedFilters>("transaction_filters");
    return saved?.searchTerm || "";
  });

  const [typeFilter, setTypeFilter] = useState<TransactionType>(() => {
    const saved = storage.get<SavedFilters>("transaction_filters");
    const savedType = saved?.typeFilter;

    if (savedType === "earn" || savedType === "redeem" || savedType === "all") {
      return savedType;
    }
    return "all";
  });

  useEffect(() => {
    if (searchTerm || typeFilter !== "all") {
      storage.set("transaction_filters", { searchTerm, typeFilter });
      logger.info("Transaction filters updated", { searchTerm, typeFilter });
    }
  }, [searchTerm, typeFilter]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.memberName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.partnerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, typeFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    storage.remove("transaction_filters");
    logger.info("Transaction filters reset");
  };

  return {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    filteredTransactions,
    resetFilters,
    hasActiveFilters: searchTerm !== "" || typeFilter !== "all",
  };
}
