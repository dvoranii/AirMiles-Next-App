import { mockPartners, mockTransactions } from "@/lib/data/mock-data";

export default function calculateMetrics() {
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
