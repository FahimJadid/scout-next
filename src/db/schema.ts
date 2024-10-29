import { doublePrecision, pgTable as table, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const productsTable = table("products", {
  id: varchar().primaryKey().default("uuid_generate_v4()"),
  title: text("title").notNull(),
  imageId: varchar("image_id").notNull(),
  price: doublePrecision("price").notNull(),
  description: varchar("description", { length: 1024 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


export type Product = typeof productsTable.$inferSelect