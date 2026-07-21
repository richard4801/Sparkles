import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  doublePrecision,
  timestamp,
  jsonb,
  uuid,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/* -------------------------------------------------------------------------- */
/*  Catalog                                                                    */
/* -------------------------------------------------------------------------- */

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  logoSeed: text("logo_seed").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  iconName: text("icon_name").notNull(),
  accent: text("accent").notNull(),
});

export const resources = pgTable(
  "resources",
  {
    id: text("id").primaryKey(), // slug-style id
    title: text("title").notNull(),
    type: text("type").notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    institutionId: integer("institution_id")
      .notNull()
      .references(() => universities.id),
    department: text("department").notNull(),
    faculty: text("faculty").notNull(),
    course: text("course").notNull(),
    description: text("description").notNull(),
    abstract: text("abstract").notNull(),
    tableOfContents: jsonb("table_of_contents").$type<string[]>().notNull(),
    rating: doublePrecision("rating").notNull(),
    reviewsCount: integer("reviews_count").notNull(),
    downloads: integer("downloads").notNull(),
    pages: integer("pages").notNull(),
    priceNaira: integer("price_naira").notNull(),
    level: text("level").notNull(),
    year: integer("year").notNull(),
    thumbnailSeed: text("thumbnail_seed").notNull(),
    trending: boolean("trending").notNull().default(false),
    fileUrl: text("file_url"), // Blob URL of the downloadable file (null = placeholder)
    fileName: text("file_name"), // original filename for the download
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("resources_category_idx").on(t.categoryId),
    index("resources_institution_idx").on(t.institutionId),
    index("resources_type_idx").on(t.type),
  ],
);

export const reviews = pgTable(
  "reviews",
  {
    id: text("id").primaryKey(),
    resourceId: text("resource_id")
      .notNull()
      .references(() => resources.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    avatarSeed: text("avatar_seed").notNull(),
    rating: integer("rating").notNull(),
    date: text("date").notNull(),
    body: text("body").notNull(),
  },
  (t) => [index("reviews_resource_idx").on(t.resourceId)],
);

/* -------------------------------------------------------------------------- */
/*  Users + auth                                                               */
/* -------------------------------------------------------------------------- */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"), // null for OAuth-only accounts
  avatarSeed: text("avatar_seed").notNull().default("new-student"),
  institution: text("institution").notNull().default(""),
  department: text("department").notNull().default(""),
  level: text("level").notNull().default("BSc"),
  role: text("role").notNull().default("user"), // user | admin
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  User-scoped commerce + activity                                            */
/* -------------------------------------------------------------------------- */

export const orders = pgTable(
  "orders",
  {
    id: text("id").primaryKey(), // e.g. SPK-10428
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
    totalNaira: integer("total_naira").notNull(),
    status: text("status").notNull(), // Paid | Refunded | Pending
    method: text("method").notNull(), // Paystack | Flutterwave
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("orders_user_idx").on(t.userId)],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    resourceId: text("resource_id").references(() => resources.id),
    title: text("title").notNull(),
    priceNaira: integer("price_naira").notNull(),
  },
  (t) => [index("order_items_order_idx").on(t.orderId)],
);

export const purchases = pgTable(
  "purchases",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    resourceId: text("resource_id")
      .notNull()
      .references(() => resources.id),
    priceNaira: integer("price_naira").notNull(),
    purchasedOn: text("purchased_on").notNull(),
    downloads: integer("downloads").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("purchases_user_resource_idx").on(t.userId, t.resourceId),
  ],
);

export const downloads = pgTable(
  "downloads",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    resourceId: text("resource_id")
      .notNull()
      .references(() => resources.id),
    title: text("title").notNull(),
    type: text("type").notNull(),
    downloadedOn: text("downloaded_on").notNull(),
    sizeMb: doublePrecision("size_mb").notNull(),
  },
  (t) => [index("downloads_user_idx").on(t.userId)],
);

export const wishlists = pgTable(
  "wishlists",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    resourceId: text("resource_id")
      .notNull()
      .references(() => resources.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("wishlists_user_resource_idx").on(t.userId, t.resourceId)],
);

export const savedSearches = pgTable(
  "saved_searches",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    query: text("query").notNull(),
    filtersLabel: text("filters_label").notNull(),
    newMatches: integer("new_matches").notNull().default(0),
    savedOn: text("saved_on").notNull(),
  },
  (t) => [index("saved_searches_user_idx").on(t.userId)],
);

export const notifications = pgTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: text("kind").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    time: text("time").notNull(),
    read: boolean("read").notNull().default(false),
  },
  (t) => [index("notifications_user_idx").on(t.userId)],
);

/* -------------------------------------------------------------------------- */
/*  Site (newsletter + contact)                                                */
/* -------------------------------------------------------------------------- */

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Single-use tokens for password reset and email verification. */
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: serial("id").primaryKey(),
    identifier: text("identifier").notNull(), // email
    token: text("token").notNull().unique(),
    type: text("type").notNull(), // password_reset | email_verify
    expires: timestamp("expires", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("verification_tokens_identifier_idx").on(t.identifier)],
);
