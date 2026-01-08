import { PartnerCard } from "@/features/partners/components/PartnerCard";
import { mockPartners } from "@/lib/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PartnersPage() {
  // Calculate partner metrics
  const totalPartners = mockPartners.length;
  const activePartners = mockPartners.filter(
    (p) => p.status === "active"
  ).length;
  const totalMembers = mockPartners.reduce(
    (sum, p) => sum + p.activeMembers,
    0
  );
  const avgConversion =
    mockPartners.reduce((sum, p) => sum + p.conversionRate, 0) / totalPartners;

  // Find top performer
  const topPartner = mockPartners.reduce((top, partner) =>
    partner.milesIssued > top.milesIssued ? partner : top
  );

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
            <div className="text-2xl font-bold">{topPartner.name}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {topPartner.milesIssued.toLocaleString()} miles
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">All Partners</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockPartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}
