"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { requireUser } from "@/lib/require-user";
import { createPendingOrder, fulfillOrder } from "@/lib/orders";
import {
  initializePayment,
  simulateMode,
  providerConfigured,
  type Provider,
} from "@/lib/payments";
import type { CartItem } from "@/lib/cart";

export async function startCheckout(items: CartItem[], provider: Provider) {
  const user = await requireUser();
  const method = provider === "paystack" ? "Paystack" : "Flutterwave";
  const { reference, totalNaira } = await createPendingOrder(user.id, items, method);

  // No real keys (or this provider not configured): simulate a paid order so
  // the flow completes end to end.
  if (simulateMode() || !providerConfigured(provider)) {
    await fulfillOrder(reference);
    redirect(`/checkout/success?ref=${reference}`);
  }

  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${h.get("host")}`;
  const { authorizationUrl } = await initializePayment({
    provider,
    reference,
    amountNaira: totalNaira,
    email: user.email ?? "",
    callbackUrl: `${origin}/checkout/callback?provider=${provider}&ref=${reference}`,
  });
  redirect(authorizationUrl);
}
