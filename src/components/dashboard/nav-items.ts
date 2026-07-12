import {
  SquaresFour,
  BagSimple,
  DownloadSimple,
  Heart,
  BookmarkSimple,
  Receipt,
  Bell,
  Gear,
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
  { href: "/dashboard/purchases", label: "Purchases", icon: BagSimple },
  { href: "/dashboard/downloads", label: "Downloads", icon: DownloadSimple },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/saved-searches", label: "Saved searches", icon: BookmarkSimple },
  { href: "/dashboard/orders", label: "Orders", icon: Receipt },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Gear },
];
