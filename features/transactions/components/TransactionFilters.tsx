"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { ChangeEvent } from "react";

type TransactionType = "all" | "earn" | "redeem";

interface TransactionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  typeFilter: TransactionType;
  setTypeFilter: (type: TransactionType) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}

export function TransactionFilters({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  onReset,
  hasActiveFilters,
  resultCount,
}: TransactionFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    if (value === "all" || value === "earn" || value === "redeem") {
      setTypeFilter(value);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by member or partner..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>

        <Select value={typeFilter} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="earn">Earned Only</SelectItem>
            <SelectItem value="redeem">Redeemed Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
