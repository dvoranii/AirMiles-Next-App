import { Partner, Transaction } from "@/types";

export default function calculateMetrics(
  partners: Partner[],
  transactions: Transaction[]
) {
  // Perform all calculations in a single pass O(n)
  const totals = partners.reduce(
    (acc, p) => {
      acc.issued += p.milesIssued;
      acc.redeemed += p.milesRedeemed;
      if (p.status === "active") {
        acc.activeCount += 1;
      }
      return acc;
    },
    { issued: 0, redeemed: 0, activeCount: 0 }
  );

  const totalTransactions = transactions.length;

  return {
    milesIssued: {
      value: totals.issued.toLocaleString(),
      change: 12.5,
      label: "Total Miles Issued",
    },
    milesRedeemed: {
      value: totals.redeemed.toLocaleString(),
      change: 8.2,
      label: "Total Miles Redeemed",
    },
    activePartners: {
      value: totals.activeCount.toString(),
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
