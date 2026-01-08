export const APP_NAME = "Air Miles Dashboard";

export const STORAGE_KEYS = {
  FILTERS: "air_miles_filters",
  USER_PREFERENCES: "air_miles_preferences",
  THEME: "air_miles_theme",
} as const;

export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  API: "yyyy-MM-dd",
  TIMESTAMP: "yyyy-MM-dd HH:mm:ss",
} as const;

export const MEMBER_TIERS = {
  BRONZE: { label: "Bronze", color: "#CD7F32", minMiles: 0 },
  SILVER: { label: "Silver", color: "#C0C0C0", minMiles: 5000 },
  GOLD: { label: "Gold", color: "#FFD700", minMiles: 15000 },
  PLATINUM: { label: "Platinum", color: "#E5E4E2", minMiles: 30000 },
} as const;

export const TRANSACTION_TYPES = {
  EARN: { label: "Earned", color: "green" },
  REDEEM: { label: "Redeemed", color: "red" },
} as const;

export const PARTNER_CATEGORIES = [
  "Gas & Fuel",
  "Grocery",
  "Pharmacy",
  "Liquor",
  "Office Supplies",
  "Restaurants",
  "Travel",
  "Retail",
] as const;

export const STATUS_COLORS = {
  active: "green",
  inactive: "gray",
  pending: "yellow",
  completed: "blue",
  cancelled: "red",
} as const;

export const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  earned: "#10b981",
  redeemed: "#ef4444",
  net: "#3b82f6",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;
