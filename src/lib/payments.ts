import "server-only";

export type Provider = "paystack" | "flutterwave";

export function providerConfigured(p: Provider): boolean {
  return p === "paystack"
    ? Boolean(process.env.PAYSTACK_SECRET_KEY)
    : Boolean(process.env.FLUTTERWAVE_SECRET_KEY);
}

export function anyProviderConfigured() {
  return providerConfigured("paystack") || providerConfigured("flutterwave");
}

/** With no provider keys we simulate a successful payment so the whole flow is
 *  testable locally and demoable on a preview. Real keys switch to live calls. */
export function simulateMode() {
  return !anyProviderConfigured();
}

export async function initializePayment(opts: {
  provider: Provider;
  reference: string;
  amountNaira: number;
  email: string;
  callbackUrl: string;
}): Promise<{ authorizationUrl: string }> {
  if (opts.provider === "paystack") {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: opts.email,
        amount: opts.amountNaira * 100, // Paystack expects kobo
        reference: opts.reference,
        callback_url: opts.callbackUrl,
      }),
    });
    const json = await res.json();
    if (!json.status) throw new Error(json.message ?? "Paystack init failed");
    return { authorizationUrl: json.data.authorization_url as string };
  }

  const res = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: opts.reference,
      amount: opts.amountNaira,
      currency: "NGN",
      redirect_url: opts.callbackUrl,
      customer: { email: opts.email },
    }),
  });
  const json = await res.json();
  if (json.status !== "success") throw new Error(json.message ?? "Flutterwave init failed");
  return { authorizationUrl: json.data.link as string };
}

export async function verifyPayment(opts: {
  provider: Provider;
  reference: string;
}): Promise<boolean> {
  if (opts.provider === "paystack") {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(opts.reference)}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } },
    );
    const json = await res.json();
    return Boolean(json.status && json.data?.status === "success");
  }
  const res = await fetch(
    `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(opts.reference)}`,
    { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } },
  );
  const json = await res.json();
  return json.status === "success" && json.data?.status === "successful";
}
