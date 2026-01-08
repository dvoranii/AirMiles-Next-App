"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "@/types";
import { CHART_COLORS } from "@/lib/cross-cutting/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface RevenueChartProps {
  data: ChartDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Miles Activity</CardTitle>
        <CardDescription>
          Daily miles earned and redeemed over the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value: number | undefined) =>
                value?.toLocaleString() ?? "0"
              }
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="earned"
              stroke={CHART_COLORS.earned}
              strokeWidth={2}
              name="Miles Earned"
            />
            <Line
              type="monotone"
              dataKey="redeemed"
              stroke={CHART_COLORS.redeemed}
              strokeWidth={2}
              name="Miles Redeemed"
            />
            <Line
              type="monotone"
              dataKey="net"
              stroke={CHART_COLORS.net}
              strokeWidth={2}
              name="Net Growth"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
