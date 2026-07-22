import type {
  DashNotification,
  DashStats,
  DashUser,
  DownloadEntry,
  Order,
  Purchase,
  SavedSearch,
  SpendPoint,
} from "@/types/dashboard";
import { resources } from "@/lib/data";

function resourceById(id: string) {
  const resource = resources.find((item) => item.id === id);
  if (!resource) {
    throw new Error(`Unknown resource id referenced in dashboard data: ${id}`);
  }
  return resource;
}

export const currentUser: DashUser = {
  name: "Adaeze Chukwuma",
  email: "adaezechukwuma01@gmail.com",
  avatarSeed: "adaeze-chukwuma-portrait",
  institution: "University of Nigeria, Nsukka",
  department: "Computer Science",
  level: "BSc",
  memberSince: "March 2025",
};

const purchaseResourceIds = [
  "campus-course-registration-system",
  "past-questions-circuit-theory-electromagnetic-futa",
  "past-questions-financial-accounting-nd",
  "machine-learning-crop-disease-detection",
  "youth-unemployment-south-east-nigeria",
  "impact-mobile-banking-sme-lagos",
  "microbial-contamination-sachet-water-kano",
] as const;

const purchaseMeta: Record<
  (typeof purchaseResourceIds)[number],
  { purchasedOn: string; downloads: number }
> = {
  "campus-course-registration-system": { purchasedOn: "14 Jan 2026", downloads: 3 },
  "past-questions-circuit-theory-electromagnetic-futa": {
    purchasedOn: "2 Feb 2026",
    downloads: 5,
  },
  "past-questions-financial-accounting-nd": { purchasedOn: "2 Feb 2026", downloads: 2 },
  "machine-learning-crop-disease-detection": { purchasedOn: "19 Feb 2026", downloads: 1 },
  "youth-unemployment-south-east-nigeria": { purchasedOn: "3 Apr 2026", downloads: 4 },
  "impact-mobile-banking-sme-lagos": { purchasedOn: "27 Apr 2026", downloads: 1 },
  "microbial-contamination-sachet-water-kano": { purchasedOn: "9 Jun 2026", downloads: 2 },
};

export const purchases: Purchase[] = purchaseResourceIds.map((resourceId, index) => {
  const resource = resourceById(resourceId);
  const meta = purchaseMeta[resourceId];
  return {
    id: `purchase-${String(index + 1).padStart(2, "0")}`,
    resourceId: resource.id,
    title: resource.title,
    type: resource.type,
    institution: resource.institution,
    thumbnailSeed: resource.thumbnailSeed,
    priceNaira: resource.priceNaira,
    purchasedOn: meta.purchasedOn,
    downloads: meta.downloads,
  };
});

export const orders: Order[] = [
  {
    id: "SPK-10428",
    date: "14 Jan 2026",
    items: [resourceById("campus-course-registration-system").title],
    totalNaira: 5000,
    status: "Paid",
    method: "Paystack",
  },
  {
    id: "SPK-10469",
    date: "2 Feb 2026",
    items: [
      resourceById("past-questions-circuit-theory-electromagnetic-futa").title,
      resourceById("past-questions-financial-accounting-nd").title,
    ],
    totalNaira: 3500,
    status: "Paid",
    method: "Paystack",
  },
  {
    id: "SPK-10512",
    date: "19 Feb 2026",
    items: [resourceById("machine-learning-crop-disease-detection").title],
    totalNaira: 9000,
    status: "Paid",
    method: "Paystack",
  },
  {
    id: "SPK-10587",
    date: "3 Apr 2026",
    items: [resourceById("youth-unemployment-south-east-nigeria").title],
    totalNaira: 5500,
    status: "Refunded",
    method: "Paystack",
  },
  {
    id: "SPK-10634",
    date: "27 Apr 2026",
    items: [resourceById("impact-mobile-banking-sme-lagos").title],
    totalNaira: 4000,
    status: "Paid",
    method: "Paystack",
  },
  {
    id: "SPK-10701",
    date: "9 Jun 2026",
    items: [resourceById("microbial-contamination-sachet-water-kano").title],
    totalNaira: 3000,
    status: "Pending",
    method: "Paystack",
  },
];

export const downloadHistory: DownloadEntry[] = [
  {
    id: "download-01",
    resourceId: "microbial-contamination-sachet-water-kano",
    title: resourceById("microbial-contamination-sachet-water-kano").title,
    type: resourceById("microbial-contamination-sachet-water-kano").type,
    downloadedOn: "yesterday",
    sizeMb: 4.6,
  },
  {
    id: "download-02",
    resourceId: "campus-course-registration-system",
    title: resourceById("campus-course-registration-system").title,
    type: resourceById("campus-course-registration-system").type,
    downloadedOn: "3 days ago",
    sizeMb: 6.4,
  },
  {
    id: "download-03",
    resourceId: "past-questions-circuit-theory-electromagnetic-futa",
    title: resourceById("past-questions-circuit-theory-electromagnetic-futa").title,
    type: resourceById("past-questions-circuit-theory-electromagnetic-futa").type,
    downloadedOn: "5 days ago",
    sizeMb: 2.1,
  },
  {
    id: "download-04",
    resourceId: "past-questions-financial-accounting-nd",
    title: resourceById("past-questions-financial-accounting-nd").title,
    type: resourceById("past-questions-financial-accounting-nd").type,
    downloadedOn: "5 days ago",
    sizeMb: 1.8,
  },
  {
    id: "download-05",
    resourceId: "machine-learning-crop-disease-detection",
    title: resourceById("machine-learning-crop-disease-detection").title,
    type: resourceById("machine-learning-crop-disease-detection").type,
    downloadedOn: "1 week ago",
    sizeMb: 12.4,
  },
  {
    id: "download-06",
    resourceId: "youth-unemployment-south-east-nigeria",
    title: resourceById("youth-unemployment-south-east-nigeria").title,
    type: resourceById("youth-unemployment-south-east-nigeria").type,
    downloadedOn: "2 weeks ago",
    sizeMb: 7.9,
  },
  {
    id: "download-07",
    resourceId: "impact-mobile-banking-sme-lagos",
    title: resourceById("impact-mobile-banking-sme-lagos").title,
    type: resourceById("impact-mobile-banking-sme-lagos").type,
    downloadedOn: "3 weeks ago",
    sizeMb: 5.3,
  },
  {
    id: "download-08",
    resourceId: "campus-course-registration-system",
    title: resourceById("campus-course-registration-system").title,
    type: resourceById("campus-course-registration-system").type,
    downloadedOn: "3 weeks ago",
    sizeMb: 6.4,
  },
];

export const savedSearches: SavedSearch[] = [
  {
    id: "saved-search-01",
    query: "final year project topics computer science",
    filtersLabel: "Computer Science, BSc",
    newMatches: 6,
    savedOn: "2 weeks ago",
  },
  {
    id: "saved-search-02",
    query: "feasibility study solar energy",
    filtersLabel: "Electrical Engineering, Feasibility Study",
    newMatches: 2,
    savedOn: "1 month ago",
  },
  {
    id: "saved-search-03",
    query: "past questions accounting ND level",
    filtersLabel: "Accounting, ND",
    newMatches: 0,
    savedOn: "5 days ago",
  },
  {
    id: "saved-search-04",
    query: "youth unemployment Nigeria economics",
    filtersLabel: "Economics, MSc",
    newMatches: 3,
    savedOn: "3 weeks ago",
  },
];

export const notifications: DashNotification[] = [
  {
    id: "notification-01",
    kind: "purchase",
    title: "Payment confirmed",
    body: "Your payment for 'Microbial Contamination of Sachet Water Sold Within Kano Metropolis' was successful.",
    time: "2h ago",
    read: false,
  },
  {
    id: "notification-02",
    kind: "price-drop",
    title: "Price drop alert",
    body: "'Feasibility Study on Mini-Grid Solar Electrification for Rural Communities in Kaduna State' dropped from 7000 to 6000 naira.",
    time: "6h ago",
    read: false,
  },
  {
    id: "notification-03",
    kind: "new-match",
    title: "New match for your saved search",
    body: "3 new resources match 'youth unemployment Nigeria economics'.",
    time: "1d ago",
    read: false,
  },
  {
    id: "notification-04",
    kind: "system",
    title: "Download link refreshed",
    body: "We refreshed your download link for 'A Comparative Study of Machine Learning Algorithms for Crop Disease Detection' after it expired.",
    time: "2d ago",
    read: true,
  },
  {
    id: "notification-05",
    kind: "purchase",
    title: "Order receipt sent",
    body: "Receipt for order SPK-10587 was emailed to your inbox.",
    time: "3d ago",
    read: true,
  },
  {
    id: "notification-06",
    kind: "new-match",
    title: "New match for your saved search",
    body: "6 new resources match 'final year project topics computer science'.",
    time: "1w ago",
    read: true,
  },
  {
    id: "notification-07",
    kind: "system",
    title: "Account verified",
    body: "Your student email was verified successfully. You now get early access to new uploads.",
    time: "2w ago",
    read: true,
  },
];

export const spendSeries: SpendPoint[] = [
  { month: "Jan", spendNaira: 5000, downloads: 3 },
  { month: "Feb", spendNaira: 12500, downloads: 8 },
  { month: "Mar", spendNaira: 0, downloads: 2 },
  { month: "Apr", spendNaira: 9500, downloads: 5 },
  { month: "May", spendNaira: 0, downloads: 1 },
  { month: "Jun", spendNaira: 3000, downloads: 4 },
  { month: "Jul", spendNaira: 0, downloads: 2 },
  { month: "Aug", spendNaira: 0, downloads: 0 },
];

export const dashStats: DashStats = {
  purchases: purchases.length,
  downloads: downloadHistory.length,
  wishlist: 5,
  totalSpendNaira: purchases.reduce((sum, purchase) => sum + purchase.priceNaira, 0),
};

export const recentlyViewed: string[] = [
  resourceById("solar-cold-storage-business-plan-ogun").id,
  resourceById("mini-grid-solar-electrification-kaduna").id,
  resourceById("fair-hearing-election-tribunals-nigeria").id,
  resourceById("social-media-political-participation-benin").id,
  resourceById("land-use-act-property-rights-nigeria").id,
];
