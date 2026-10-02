import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, uuid, timestamp, boolean, integer, decimal, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userRoleEnum = pgEnum('user_role', ['customer', 'admin', 'staff']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']);
export const paymentMethodEnum = pgEnum('payment_method', ['cash_on_delivery', 'online_payment']);
export const paymentStatusEnum = pgEnum('payment_status', ['paid', 'unpaid', 'refunded']);
export const reservationStatusEnum = pgEnum('reservation_status', ['pending', 'confirmed', 'cancelled']);

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).unique().notNull(),
  role: userRoleEnum("role").default('customer').notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// Addresses table
export const addresses = pgTable("addresses", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  street: varchar("street", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  area: varchar("area", { length: 100 }).notNull(),
  buildingNumber: varchar("building_number", { length: 50 }),
  apartmentNumber: varchar("apartment_number", { length: 50 }),
  details: text("details"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// Categories table
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).unique().notNull(),
  nameAr: varchar("name_ar", { length: 100 }).notNull(),
  description: text("description"),
  orderIndex: integer("order_index"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Menu items table
export const menuItems = pgTable("menu_items", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  description: text("description"),
  descriptionAr: text("description_ar"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  categoryId: uuid("category_id").notNull().references(() => categories.id),
  isAvailable: boolean("is_available").default(true),
  calories: integer("calories"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// Orders table
export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id),
  guestName: varchar("guest_name", { length: 255 }),
  guestPhone: varchar("guest_phone", { length: 20 }),
  guestEmail: varchar("guest_email", { length: 255 }),
  street: varchar("street", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  area: varchar("area", { length: 100 }).notNull(),
  buildingNumber: varchar("building_number", { length: 50 }),
  apartmentNumber: varchar("apartment_number", { length: 50 }),
  addressDetails: text("address_details"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 10, scale: 8 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").default('pending').notNull(),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").default('unpaid').notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// Order items table
export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: 'cascade' }),
  menuItemId: uuid("menu_item_id").notNull().references(() => menuItems.id),
  quantity: integer("quantity").notNull(),
  priceAtOrder: decimal("price_at_order", { precision: 10, scale: 2 }).notNull(),
});

// Reservations table
export const reservations = pgTable("reservations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id),
  guestName: varchar("guest_name", { length: 255 }),
  guestPhone: varchar("guest_phone", { length: 20 }).notNull(),
  guestEmail: varchar("guest_email", { length: 255 }),
  reservationDate: timestamp("reservation_date", { withTimezone: true }).notNull(),
  numberOfGuests: integer("number_of_guests").notNull(),
  specialOccasion: varchar("special_occasion", { length: 100 }),
  notes: text("notes"),
  status: reservationStatusEnum("status").default('pending').notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// Website Settings table
export const websiteSettings = pgTable("website_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  // Colors
  primaryColor: varchar("primary_color", { length: 7 }).default('#FF6B35').notNull(),
  secondaryColor: varchar("secondary_color", { length: 7 }).default('#FFB800').notNull(),
  accentColor: varchar("accent_color", { length: 7 }).default('#1A1A1A').notNull(),
  backgroundColor: varchar("background_color", { length: 7 }).default('#FAFAFA').notNull(),
  
  // Logo and Branding
  logoUrl: varchar("logo_url", { length: 500 }),
  logoText: varchar("logo_text", { length: 100 }).default('تشكن هات').notNull(),
  faviconUrl: varchar("favicon_url", { length: 500 }),
  
  // Contact Information
  contactPhone: varchar("contact_phone", { length: 20 }).default('+966501234567').notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).default('info@chickenhat.com').notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }).default('+966501234567'),
  
  // Address Information
  streetAddress: varchar("street_address", { length: 255 }).default('شارع الملك عبدالعزيز').notNull(),
  city: varchar("city", { length: 100 }).default('الرياض').notNull(),
  area: varchar("area", { length: 100 }).default('الملز').notNull(),
  postalCode: varchar("postal_code", { length: 10 }).default('12345'),
  mapLocation: text("map_location"), // Google Maps embed link
  
  // Social Media
  facebookUrl: varchar("facebook_url", { length: 500 }),
  instagramUrl: varchar("instagram_url", { length: 500 }),
  twitterUrl: varchar("twitter_url", { length: 500 }),
  tiktokUrl: varchar("tiktok_url", { length: 500 }),
  
  // Website Content
  heroTitle: varchar("hero_title", { length: 255 }).default('وجهتكم الأولى لأشهى أنواع الدجاج المقلي والبروستد').notNull(),
  heroSubtitle: text("hero_subtitle").default('نقدم لكم أجود أنواع الدجاج المقرمش بأفضل المكونات والنكهات الأصيلة\nمع خدمة توصيل سريعة وجودة لا تُضاهى').notNull(),
  aboutTitle: varchar("about_title", { length: 255 }).default('عن تشكن هات').notNull(),
  aboutDescription: text("about_description").default('مطعم تشكن هات هو وجهتكم المفضلة لأشهى أنواع الدجاج المقلي والبروستد. نحن نفخر بتقديم أجود أنواع الدجاج الطازج المتبل بأفضل الخلطات والتوابل السرية التي تميزنا عن غيرنا.').notNull(),
  
  // Operating Hours
  operatingHours: text("operating_hours").default('السبت - الخميس: 10:00 ص - 12:00 م\nالجمعة: 2:00 م - 12:00 م').notNull(),
  
  // Delivery Information
  deliveryFee: decimal("delivery_fee", { precision: 10, scale: 2 }).default('15.00').notNull(),
  freeDeliveryThreshold: decimal("free_delivery_threshold", { precision: 10, scale: 2 }).default('100.00').notNull(),
  deliveryTime: varchar("delivery_time", { length: 50 }).default('30-45 دقيقة').notNull(),
  
  // Features
  isDeliveryEnabled: boolean("is_delivery_enabled").default(true).notNull(),
  isPickupEnabled: boolean("is_pickup_enabled").default(true).notNull(),
  isReservationsEnabled: boolean("is_reservations_enabled").default(true).notNull(),
  isOnlinePaymentEnabled: boolean("is_online_payment_enabled").default(true).notNull(),
  
  // Meta Information
  siteTitle: varchar("site_title", { length: 100 }).default('تشكن هات - أفضل دجاج مقلي في المملكة').notNull(),
  siteDescription: text("site_description").default('تشكن هات - مطعم متخصص في الدجاج المقلي والبروستد بأجود أنواع التوابل والنكهات. اطلب الآن واستمتع بطعم لا يُنسى مع توصيل مجاني.').notNull(),
  siteKeywords: text("site_keywords").default('دجاج مقلي, بروستد, مطعم, توصيل, الرياض, طعام سريع').notNull(),
  
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
  orders: many(orders),
  reservations: many(reservations),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  menuItems: many(menuItems),
}));

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  menuItem: one(menuItems, {
    fields: [orderItems.menuItemId],
    references: [menuItems.id],
  }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAddressSchema = createInsertSchema(addresses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWebsiteSettingsSchema = createInsertSchema(websiteSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Address = typeof addresses.$inferSelect;
export type InsertAddress = z.infer<typeof insertAddressSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;

export type WebsiteSettings = typeof websiteSettings.$inferSelect;
export type InsertWebsiteSettings = z.infer<typeof insertWebsiteSettingsSchema>;

// Extended types with relations
export type OrderWithItems = Order & {
  items: (OrderItem & { menuItem: MenuItem })[];
  user?: User;
};

export type MenuItemWithCategory = MenuItem & {
  category: Category | null;
};
