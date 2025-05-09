import { timestamp } from "drizzle-orm/pg-core";
import { date, varchar, uuid, integer, text, boolean, pgTable, pgEnum } from "drizzle-orm/pg-core";
import { title } from "process";

export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", {length: 255}).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const books = pgTable("books", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  title: varchar('title', { length: 512 }).notNull(),
  author: varchar('author', { length: 512 }).notNull(),
  genre: text('genre').notNull(),
  rating: integer('rating').notNull(),
  coverUrl: text('cover_url').notNull(),
  coverColor: varchar('cover_color', { length: 7 }).notNull(),
  description: text('description').notNull(),
  totalCopies: integer('total_copies').notNull(),
  availableCopies: integer('available_copies').notNull().default(0),
  summary: varchar('summary', { length: 1000 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})
