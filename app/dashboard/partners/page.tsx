"use client";

import { PartnerCard } from "@/features/partners/components/PartnerCard";
import { mockPartners } from "@/lib/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePartnerSearch } from "@/features/partners/hooks/usePartnerSearch";
import { ChangeEvent } from "react";

export default function PartnersPage() {
  const { searchTerm, setSearchTerm, filteredPartners } =
    usePartnerSearch(mockPartners);

  const totalPartners = filteredPartners.length;
  const activePartners = filteredPartners.filter(
    (p) => p.status === "active"
  ).length;
  const totalMembers = filteredPartners.reduce(
    (sum, p) => sum + p.activeMembers,
    0
  );
  const avgConversion =
    filteredPartners.length > 0
      ? filteredPartners.reduce((sum, p) => sum + p.conversionRate, 0) /
        totalPartners
      : 0;

  const topPartner =
    filteredPartners.length > 0
      ? filteredPartners.reduce((top, partner) =>
          partner.milesIssued > top.milesIssued ? partner : top
        )
      : null;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
        <p className="text-muted-foreground">
          Manage and monitor partner performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Partners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPartners}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activePartners} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMembers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all partners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(avgConversion * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Network average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            {topPartner ? (
              <>
                <div className="text-2xl font-bold">{topPartner.name}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {topPartner.milesIssued.toLocaleString()} miles
                </p>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                No partners found
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All Partners</h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search partners..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
        </div>

        {filteredPartners.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">
                No partners found matching &quot;{searchTerm}&quot;
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
