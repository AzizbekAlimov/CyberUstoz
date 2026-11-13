import { boolean, index, int, mediumtext, mysqlEnum, mysqlTable, text, timestamp, unique, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  /** OAuth subject (Manus or namespaced Google subject), unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  username: varchar("username", { length: 64 }).unique(),
  passwordHash: varchar("passwordHash", { length: 256 }),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  authVersion: int("authVersion").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/** Personal learner details remain separate from the authentication identity. */
export const studentProfiles = mysqlTable("student_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  birthDate: varchar("birthDate", { length: 10 }),
  phone: varchar("phone", { length: 24 }),
  avatarUrl: varchar("avatarUrl", { length: 512 }),
  avatarData: mediumtext("avatarData"),
  avatarMime: varchar("avatarMime", { length: 24 }),
  lastActiveAt: timestamp("lastActiveAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const examAttempts = mysqlTable("exam_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  score: int("score").notNull(),
  total: int("total").notNull(),
  language: mysqlEnum("language", ["uz", "en"]).default("uz").notNull(),
  /** Null for historical/legacy attempts; non-null only for the official weekly exam. */
  weeklyExamDate: varchar("weeklyExamDate", { length: 10 }),
  details: text("details").notNull(),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
}, table => ({ weeklyAttempt: uniqueIndex("exam_attempts_user_week_unique").on(table.userId, table.weeklyExamDate) }));

export const courseProgress = mysqlTable("course_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseSlug: varchar("courseSlug", { length: 64 }).notNull(),
  lessonIndex: int("lessonIndex").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
}, table => ({ completion: unique("course_progress_user_course_lesson_unique").on(table.userId, table.courseSlug, table.lessonIndex) }));

export const adminAuditLogs = mysqlTable("admin_audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  actorId: int("actorId").notNull().references(() => users.id),
  targetUserId: int("targetUserId").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 48 }).notNull(),
  reason: varchar("reason", { length: 500 }).notNull(),
  details: mediumtext("details").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => ({ createdAtIndex: index("admin_audit_logs_created_at_idx").on(table.createdAt) }));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type StudentProfile = typeof studentProfiles.$inferSelect;
