import { redirect } from "next/navigation";
import { requireUser } from "@/lib/require-user";
import { verifyPayment, type Provider } from "@/lib/payments";
import { fulfillOrder } from "@/lib/orders";

// Where the payment provider redirects the user back to after paying. We verify
// server-side, then fulfil and send them to the success page.
export default async function CheckoutCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireUser();
  const sp = await searchParams;
  const pick = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]);

  const reference = pick("ref") ?? pick("reference") ?? pick("tx_ref") ?? "";
  const provider = (pick("provider") ?? "paystack") as Provider;
  if (!reference) redirect("/cart");

  const ok = await verifyPayment({ provider, reference });
  if (ok) {
    await fulfillOrder(reference);
    redirect(`/checkout/success?ref=${reference}`);
  }
  redirect("/cart?payment=failed");
}
