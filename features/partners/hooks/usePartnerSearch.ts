"use client";

import { useState, useMemo } from "react";
import { Partner } from "@/types";
import { logger } from "@/lib/cross-cutting/logger";

export function usePartnerSearch(partners: Partner[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPartners = useMemo(() => {
    if (!searchTerm) return partners;

    const results = partners.filter(
      (partner) =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    logger.info("Partner search performed", {
      searchTerm,
      resultCount: results.length,
    });

    return results;
  }, [partners, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredPartners,
  };
}
