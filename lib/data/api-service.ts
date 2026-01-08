import { mockPartners, mockTransactions } from "./mock-data";

// ** Simulate call to the dedicated Node.js backend
export async function getDashboardData() {
  // ** Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    partners: mockPartners,
    transactions: mockTransactions,
  };
}
