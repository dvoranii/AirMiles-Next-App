// types/index.ts
export interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string;
  status: "active" | "inactive" | "pending";
  milesIssued: number;
  milesRedeemed: number;
  activeMembers: number;
  conversionRate: number;
  joinedDate: string;
}

export interface Transaction {
  id: string;
  memberId: string;
  memberName: string;
  partnerId: string;
  partnerName: string;
  type: "earn" | "redeem";
  miles: number;
  amount: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

export interface AnalyticsMetric {
  label: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease";
  format: "number" | "currency" | "percentage";
}

export interface ChartDataPoint {
  date: string;
  earned: number;
  redeemed: number;
  net: number;
}

export interface DashboardFilters {
  dateRange: {
    from: Date;
    to: Date;
  };
  partnerId?: string;
  transactionType?: "earn" | "redeem" | "all";
}

export interface Member {
  id: string;
  name: string;
  email: string;
  milesBalance: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  joinedDate: string;
  lastActivity: string;
}
