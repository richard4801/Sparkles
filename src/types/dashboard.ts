export interface DashUser {
  name: string; // realistic Nigerian name
  email: string;
  avatarSeed: string; // name-based seed → a Nigerian face from the /avatars pool
  institution: string;
  department: string;
  level: string; // e.g. "BSc"
  memberSince: string; // e.g. "March 2025"
}

export interface Purchase {
  id: string; // e.g. "purchase-01"
  resourceId: string; // REAL Resource.id
  title: string; // REAL Resource.title
  type: string;
  institution: string;
  thumbnailSeed: string; // REAL Resource.thumbnailSeed
  priceNaira: number;
  purchasedOn: string; // e.g. "12 Jun 2026"
  downloads: number; // how many times this user downloaded it
}

export interface Order {
  id: string; // e.g. "SPK-10428"
  date: string; // e.g. "12 Jun 2026"
  items: string[]; // resource titles in the order
  totalNaira: number;
  status: "Paid" | "Refunded" | "Pending";
  method: "Paystack" | "Flutterwave";
}

export interface DownloadEntry {
  id: string;
  resourceId: string; // REAL Resource.id
  title: string;
  type: string;
  downloadedOn: string; // e.g. "2 days ago"
  sizeMb: number; // e.g. 4.2
}

export interface SavedSearch {
  id: string;
  query: string;
  filtersLabel: string; // e.g. "Computer Science, BSc"
  newMatches: number;
  savedOn: string;
}

export interface DashNotification {
  id: string;
  kind: "purchase" | "price-drop" | "new-match" | "system";
  title: string;
  body: string;
  time: string; // e.g. "2h ago"
  read: boolean;
}

export interface SpendPoint {
  month: string; // e.g. "Jan"
  spendNaira: number;
  downloads: number;
}

export interface DashStats {
  purchases: number;
  downloads: number;
  wishlist: number;
  totalSpendNaira: number;
}
