import { RevenueChart } from "@/features/analytics/components/RevenueChart";
import { mockChartData, mockPartners } from "@/lib/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  // Calculate aggregate metrics
  const totalEarned = mockChartData.reduce((sum, d) => sum + d.earned, 0);
  const totalRedeemed = mockChartData.reduce((sum, d) => sum + d.redeemed, 0);
  const netGrowth = totalEarned - totalRedeemed;
  const avgDailyEarned = Math.round(totalEarned / mockChartData.length);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed insights into miles activity and partner performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Week Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalEarned.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg. {avgDailyEarned.toLocaleString()} per day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Week Total Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRedeemed.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalRedeemed / totalEarned) * 100).toFixed(1)}% redemption
              rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{netGrowth.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((netGrowth / totalEarned) * 100).toFixed(1)}% net retention
            </p>
          </CardContent>
        </Card>
      </div>

      <RevenueChart data={mockChartData} />

      <Card>
        <CardHeader>
          <CardTitle>Partner Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{partner.logo}</span>
                  <div>
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {partner.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {partner.milesIssued.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">miles issued</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
