import "server-only";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  resources,
  orders,
  orderItems,
  purchases,
  notifications,
  users,
} from "@/db/schema";
import type { CartItem } from "@/lib/cart";
import { sendReceiptEmail } from "@/lib/email";

function today() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function newReference() {
  return `SPK-${Math.floor(100000 + Math.random() * 900000)}`;
}

export interface PendingOrder {
  reference: string;
  totalNaira: number;
}

/** Create a Pending order from cart items, pricing them from the DB (never
 *  trusting client-supplied prices). Returns the order reference (its id). */
export async function createPendingOrder(
  userId: string,
  items: CartItem[],
  method: "Paystack" | "Flutterwave",
): Promise<PendingOrder> {
  const ids = items.map((i) => i.id);
  if (ids.length === 0) throw new Error("Cart is empty");

  const rows = await db
    .select({
      id: resources.id,
      title: resources.title,
      priceNaira: resources.priceNaira,
    })
    .from(resources)
    .where(inArray(resources.id, ids));

  if (rows.length === 0) throw new Error("No valid items in cart");
  const total = rows.reduce((sum, r) => sum + r.priceNaira, 0);
  const reference = newReference();

  await db.insert(orders).values({
    id: reference,
    userId,
    date: today(),
    totalNaira: total,
    status: "Pending",
    method,
  });
  await db.insert(orderItems).values(
    rows.map((r) => ({
      orderId: reference,
      resourceId: r.id,
      title: r.title,
      priceNaira: r.priceNaira,
    })),
  );

  return { reference, totalNaira: total };
}

/** Mark an order paid and grant the purchases. Idempotent: safe to call from the
 *  redirect callback and the webhook for the same order. */
export async function fulfillOrder(reference: string): Promise<boolean> {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, reference))
    .limit(1);
  if (!order) return false;
  if (order.status === "Paid") return true; // already fulfilled

  await db.update(orders).set({ status: "Paid" }).where(eq(orders.id, reference));

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, reference));

  const purchased = today();
  for (const it of items) {
    if (!it.resourceId) continue;
    await db
      .insert(purchases)
      .values({
        id: `pur_${reference}_${it.resourceId}`,
        userId: order.userId,
        resourceId: it.resourceId,
        priceNaira: it.priceNaira,
        purchasedOn: purchased,
        downloads: 0,
      })
      .onConflictDoNothing();
  }

  await db
    .insert(notifications)
    .values({
      id: `notif_${reference}`,
      userId: order.userId,
      kind: "purchase",
      title: "Payment successful",
      body: `Order ${reference} is complete and ready to download.`,
      time: "just now",
      read: false,
    })
    .onConflictDoNothing();

  // Email a receipt (best-effort — never block fulfilment on email).
  try {
    const [buyer] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, order.userId))
      .limit(1);
    if (buyer?.email) {
      await sendReceiptEmail({
        to: buyer.email,
        orderId: reference,
        items: items.map((it) => ({ title: it.title, priceNaira: it.priceNaira })),
        totalNaira: order.totalNaira,
        method: order.method,
      });
    }
  } catch {
    // ignore email failures
  }

  return true;
}

export async function getOrderForUser(reference: string, userId: string) {
  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, reference), eq(orders.userId, userId)))
    .limit(1);
  if (!order) return null;
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, reference));
  return { order, items };
}
