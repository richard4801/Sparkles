import {
  SquaresFour,
  BagSimple,
  DownloadSimple,
  Heart,
  BookmarkSimple,
  Receipt,
  Bell,
  Gear,
  Sparkle,
  ChartLineUp,
  Books,
  SquaresFour as GridIcon,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";

export interface DashNavItem {
  href: string;
  label: string;
  icon: Icon;
  exact?: boolean;
}

export const dashNav: DashNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: SquaresFour, exact: true },
  { href: "/dashboard/assistant", label: "Study assistant", icon: Sparkle },
  { href: "/dashboard/purchases", label: "Purchases", icon: BagSimple },
  { href: "/dashboard/downloads", label: "Downloads", icon: DownloadSimple },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/saved-searches", label: "Saved searches", icon: BookmarkSimple },
  { href: "/dashboard/orders", label: "Orders", icon: Receipt },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Gear },
];

/** Admin-only navigation, rendered as a separate group for role=admin. */
export const adminNav: DashNavItem[] = [
  { href: "/dashboard/admin", label: "Analytics", icon: ChartLineUp, exact: true },
  { href: "/dashboard/admin/resources", label: "Resources", icon: Books },
  { href: "/dashboard/admin/categories", label: "Categories", icon: GridIcon },
  { href: "/dashboard/admin/orders", label: "Orders", icon: Receipt },
  { href: "/dashboard/admin/users", label: "Users", icon: UsersThree },
];
