import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPartners, mockTransactions } from "@/lib/data/mock-data";
import { TrendingUp, TrendingDown, Users, Award } from "lucide-react";

function calculateMetrics() {
  const totalMilesIssued = mockPartners.reduce(
    (sum, p) => sum + p.milesIssued,
    0
  );
  const totalMilesRedeemed = mockPartners.reduce(
    (sum, p) => sum + p.milesRedeemed,
    0
  );
  const activePartners = mockPartners.filter(
    (p) => p.status === "active"
  ).length;
  const totalTransactions = mockTransactions.length;

  return {
    milesIssued: {
      value: totalMilesIssued.toLocaleString(),
      change: 12.5,
      label: "Total Miles Issued",
    },
    milesRedeemed: {
      value: totalMilesRedeemed.toLocaleString(),
      change: 8.2,
      label: "Total Miles Redeemed",
    },
    activePartners: {
      value: activePartners.toString(),
      change: 0,
      label: "Active Partners",
    },
    transactions: {
      value: totalTransactions.toString(),
      change: 5.3,
      label: "Recent Transactions",
    },
  };
}

export default function DashboardPage() {
  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome to your Air Miles partner analytics dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metrics.milesIssued.label}
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.milesIssued.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">
                +{metrics.milesIssued.change}%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metrics.milesRedeemed.label}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.milesRedeemed.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">
                +{metrics.milesRedeemed.change}%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metrics.activePartners.label}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.activePartners.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All partners active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metrics.transactions.label}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.transactions.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">
                +{metrics.transactions.change}%
              </span>
              <span>from yesterday</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Redemption Rate
              </span>
              <span className="font-medium">28.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Avg. Transaction Value
              </span>
              <span className="font-medium">$89.20</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Net Miles Growth
              </span>
              <span className="font-medium text-green-500">+6.8M</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
