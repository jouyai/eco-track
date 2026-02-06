import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "@auth/core/adapters";

export const users = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  points: integer("points").default(0),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const activities = sqliteTable("activity", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  name: text("name").notNull(),
  value: real("value").notNull(),
  unit: text("unit").notNull(),
  carbonFootprint: real("carbonFootprint").notNull(),
  passengers: integer("passengers").default(1),
  date: integer("date", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).$defaultFn(() => new Date()),
});

export const challenges = sqliteTable("challenge", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  target: real("target").notNull(),
  unit: text("unit").notNull(),
  duration: integer("duration").notNull(),
  reward: text("reward").notNull(),
  difficulty: text("difficulty").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const userChallenges = sqliteTable("userChallenge", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  challengeId: text("challengeId")
    .notNull()
    .references(() => challenges.id, { onDelete: "cascade" }),
  progress: real("progress").default(0),
  status: text("status").default("ACTIVE"),
  startDate: integer("startDate", { mode: "timestamp_ms" }).default(new Date()),
  endDate: integer("endDate", { mode: "timestamp_ms" }),
  lastUpdated: integer("lastUpdated", { mode: "timestamp_ms" }),
});

export const goals = sqliteTable("goal", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  targetValue: real("targetValue").notNull(),
  currentValue: real("currentValue").default(0),
  startDate: integer("startDate", { mode: "timestamp_ms" }).notNull(),
  endDate: integer("endDate", { mode: "timestamp_ms" }).notNull(),
  isCompleted: integer("isCompleted", { mode: "boolean" }).default(false),
});

export const badges = sqliteTable("badge", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl"),
});

export const userBadges = sqliteTable("userBadge", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeId: text("badgeId").notNull().references(() => badges.id, { onDelete: "cascade" }),
  awardedAt: integer("awardedAt", { mode: "timestamp_ms" }).default(new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  activities: many(activities),
  userChallenges: many(userChallenges),
  userBadges: many(userBadges),
  goals: many(goals),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

export const userChallengesRelations = relations(userChallenges, ({ one }) => ({
  user: one(users, {
    fields: [userChallenges.userId],
    references: [users.id],
  }),
  challenge: one(challenges, {
    fields: [userChallenges.challengeId],
    references: [challenges.id],
  }),
}));

export const challengesRelations = relations(challenges, ({ many }) => ({
  userChallenges: many(userChallenges),
}));

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
  userBadges: many(userBadges),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
}));
