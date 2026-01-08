import { BarChart3, Receipt, Store, Home } from "lucide-react";

export const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: Receipt,
  },
  {
    title: "Partners",
    href: "/dashboard/partners",
    icon: Store,
  },
];
