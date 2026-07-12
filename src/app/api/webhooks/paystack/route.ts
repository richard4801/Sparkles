import { createHmac } from "node:crypto";
import { fulfillOrder } from "@/lib/orders";

// Paystack calls this asynchronously to confirm a charge. Verifying the
// signature is what makes it trustworthy (never fulfil on a redirect alone).
export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const body = await req.text();

  if (secret) {
    const signature = req.headers.get("x-paystack-signature");
    const hash = createHmac("sha512", secret).update(body).digest("hex");
    if (hash !== signature) {
      return new Response("Invalid signature", { status: 401 });
    }
  }

  let event: { event?: string; data?: { reference?: string; status?: string } };
  try {
    event = JSON.parse(body);
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  if (event.event === "charge.success" && event.data?.reference) {
    await fulfillOrder(event.data.reference);
  }
  return new Response("ok");
}
