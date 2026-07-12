import { fulfillOrder } from "@/lib/orders";

// Flutterwave posts here on completed charges. It authenticates with a shared
// secret hash you set in the Flutterwave dashboard and in FLUTTERWAVE_WEBHOOK_HASH.
export async function POST(req: Request) {
  const expected = process.env.FLUTTERWAVE_WEBHOOK_HASH;
  if (expected && req.headers.get("verif-hash") !== expected) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: {
    event?: string;
    data?: { tx_ref?: string; status?: string };
  };
  try {
    event = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const ref = event.data?.tx_ref;
  if (event.data?.status === "successful" && ref) {
    await fulfillOrder(ref);
  }
  return new Response("ok");
}
