import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

/** Local profile row. Auth identity and passwords live in Supabase Auth; `id` matches auth.users.id. */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  /** Access to the higher daily Pro quota until this instant (inclusive). Granted manually after payment. */
  proUntil: timestamp("pro_until", { withTimezone: true }),
  ...timestamps,
});

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    relation: text("relation", { enum: ["self", "partner", "child", "parent", "friend", "other"] }).notNull(),
    /** AES-256-GCM encrypted BirthDetails JSON (name, date, time, place). */
    birthEncrypted: text("birth_encrypted").notNull(),
    ...timestamps,
  },
  (t) => [index("profiles_user_idx").on(t.userId)],
);

export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    ...timestamps,
  },
  (t) => [index("conversations_profile_idx").on(t.userId, t.profileId)],
);

export const proInquiries = pgTable("pro_inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  plan: text("plan", { enum: ["monthly", "yearly"] }).notNull(),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const featureUses = pgTable(
  "feature_uses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    subjectType: text("subject_type", { enum: ["user", "guest"] }).notNull(),
    subjectId: text("subject_id").notNull(),
    feature: text("feature", { enum: ["kundli", "matching", "manglik", "moon_sign", "chat"] }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("feature_uses_subject_idx").on(t.subjectId, t.feature, t.createdAt)],
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["user", "assistant"] }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("messages_conversation_idx").on(t.conversationId, t.createdAt),
    index("messages_user_created_idx").on(t.userId, t.createdAt),
  ],
);
