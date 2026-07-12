"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  resources,
  categories,
  users,
  orders,
} from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/utils";
import { CATEGORY_ACCENTS } from "@/lib/catalog";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function str(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}
function int(fd: FormData, key: string, fallback = 0) {
  const n = Number(str(fd, key));
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}
function num(fd: FormData, key: string, fallback = 0) {
  const n = Number(str(fd, key));
  return Number.isFinite(n) ? n : fallback;
}

function revalidateCatalog(resourceId?: string) {
  revalidatePath("/dashboard/admin/resources");
  revalidatePath("/dashboard/admin");
  revalidatePath("/browse");
  revalidatePath("/");
  if (resourceId) revalidatePath(`/resource/${resourceId}`);
}

function readResourceForm(fd: FormData) {
  const title = str(fd, "title");
  const toc = str(fd, "tableOfContents")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return {
    title,
    type: str(fd, "type"),
    categoryId: int(fd, "categoryId"),
    institutionId: int(fd, "institutionId"),
    department: str(fd, "department"),
    faculty: str(fd, "faculty"),
    course: str(fd, "course"),
    description: str(fd, "description"),
    abstract: str(fd, "abstract") || str(fd, "description"),
    tableOfContents: toc.length ? toc : ["Introduction", "Body", "Conclusion"],
    rating: Math.min(5, Math.max(0, num(fd, "rating", 0))),
    reviewsCount: int(fd, "reviewsCount", 0),
    downloads: int(fd, "downloads", 0),
    pages: int(fd, "pages", 1),
    priceNaira: int(fd, "priceNaira", 0),
    level: str(fd, "level") || "BSc",
    year: int(fd, "year", new Date().getFullYear()),
    thumbnailSeed: str(fd, "thumbnailSeed") || slugify(title) || "resource",
    trending: fd.get("trending") === "on" || fd.get("trending") === "true",
  };
}

function validateResource(v: ReturnType<typeof readResourceForm>): string | null {
  if (!v.title) return "Title is required.";
  if (!v.type) return "Type is required.";
  if (!v.categoryId) return "Category is required.";
  if (!v.institutionId) return "Institution is required.";
  if (!v.department) return "Department is required.";
  if (!v.course) return "Course is required.";
  if (v.priceNaira < 0) return "Price cannot be negative.";
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Resources                                                                  */
/* -------------------------------------------------------------------------- */

export async function createResource(fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const v = readResourceForm(fd);
  const err = validateResource(v);
  if (err) return { ok: false, error: err };

  // Unique slug-style id from the title.
  const base = slugify(v.title) || "resource";
  let id = base;
  for (let i = 0; i < 50; i++) {
    const [exists] = await db
      .select({ id: resources.id })
      .from(resources)
      .where(eq(resources.id, id))
      .limit(1);
    if (!exists) break;
    id = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }

  await db.insert(resources).values({ id, ...v });
  revalidateCatalog(id);
  redirect("/dashboard/admin/resources");
}

export async function updateResource(id: string, fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const v = readResourceForm(fd);
  const err = validateResource(v);
  if (err) return { ok: false, error: err };

  await db.update(resources).set(v).where(eq(resources.id, id));
  revalidateCatalog(id);
  redirect("/dashboard/admin/resources");
}

export async function deleteResource(id: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    await db.delete(resources).where(eq(resources.id, id));
  } catch {
    return {
      ok: false,
      error: "Cannot delete: this resource has purchases or downloads attached.",
    };
  }
  revalidateCatalog(id);
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  Categories                                                                 */
/* -------------------------------------------------------------------------- */

export async function createCategory(fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const name = str(fd, "name");
  if (!name) return { ok: false, error: "Name is required." };
  const slug = slugify(name);
  const [exists] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  if (exists) return { ok: false, error: "A category with that name already exists." };

  const accent = str(fd, "accent") || CATEGORY_ACCENTS[0];
  const iconName = str(fd, "iconName") || "Folder";
  await db.insert(categories).values({ slug, name, iconName, accent });
  revalidatePath("/dashboard/admin/categories");
  revalidatePath("/browse");
  return { ok: true };
}

export async function updateCategory(id: number, fd: FormData): Promise<ActionResult> {
  await requireAdmin();
  const name = str(fd, "name");
  if (!name) return { ok: false, error: "Name is required." };
  const accent = str(fd, "accent");
  const iconName = str(fd, "iconName");
  await db
    .update(categories)
    .set({
      name,
      ...(accent ? { accent } : {}),
      ...(iconName ? { iconName } : {}),
    })
    .where(eq(categories.id, id));
  revalidatePath("/dashboard/admin/categories");
  revalidatePath("/browse");
  return { ok: true };
}

export async function deleteCategory(id: number): Promise<ActionResult> {
  await requireAdmin();
  const [used] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(resources)
    .where(eq(resources.categoryId, id));
  if ((used?.count ?? 0) > 0) {
    return {
      ok: false,
      error: `Cannot delete: ${used.count} resource(s) still use this category.`,
    };
  }
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/dashboard/admin/categories");
  revalidatePath("/browse");
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  Users                                                                      */
/* -------------------------------------------------------------------------- */

export async function setUserRole(userId: string, role: string): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (role !== "user" && role !== "admin") return { ok: false, error: "Invalid role." };

  if (userId === admin.id && role !== "admin") {
    return { ok: false, error: "You cannot remove your own admin access." };
  }

  // Never allow the last admin to be demoted.
  if (role === "user") {
    const [count] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(users)
      .where(and(eq(users.role, "admin"), ne(users.id, userId)));
    if ((count?.n ?? 0) === 0) {
      return { ok: false, error: "There must be at least one admin." };
    }
  }

  await db.update(users).set({ role }).where(eq(users.id, userId));
  revalidatePath("/dashboard/admin/users");
  revalidatePath("/dashboard/admin");
  return { ok: true };
}

export async function deleteUser(userId: string): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (userId === admin.id) return { ok: false, error: "You cannot delete your own account." };

  const [target] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!target) return { ok: false, error: "User not found." };
  if (target.role === "admin") {
    return { ok: false, error: "Demote this admin to a user before deleting." };
  }

  await db.delete(users).where(eq(users.id, userId));
  revalidatePath("/dashboard/admin/users");
  revalidatePath("/dashboard/admin");
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  Orders                                                                     */
/* -------------------------------------------------------------------------- */

export async function setOrderStatus(orderId: string, status: string): Promise<ActionResult> {
  await requireAdmin();
  if (!["Paid", "Pending", "Refunded"].includes(status)) {
    return { ok: false, error: "Invalid status." };
  }
  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
  revalidatePath("/dashboard/admin/orders");
  revalidatePath("/dashboard/admin");
  return { ok: true };
}
