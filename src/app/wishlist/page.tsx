import { redirect } from "next/navigation";

// The wishlist lives in the authenticated dashboard; /wishlist is a friendly
// public entry point that sends people there (and to /login first if needed).
export default function WishlistRedirect() {
  redirect("/dashboard/wishlist");
}
