import { pgTable, serial, integer, text, timestamp, primaryKey, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  age: integer("age"),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const workout = pgTable("workout", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  created: timestamp("created").notNull(),
  tagId: integer("tag_id").references(() => tag.id),
  rating: integer("rating"),
  notes: text("notes"),
  finished: boolean("finished").default(false),
});

export const set = pgTable("sets", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull().references(() => workout.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercise.id),
  setNumber: integer("set_number").notNull(),
  reps: integer("reps").notNull(),
  weight: integer("weight").notNull(),
  notes: text("notes"),
});

export const exercise = pgTable("exercise", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  userId: text("user_id").notNull().references(() => user.id),
});

export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull().references(() => user.id),
});


export const exerciseTag = pgTable("exercise_tags", {
  exerciseId: integer("exercise_id").notNull().references(() => exercise.id),
  tagId: integer("tag_id").notNull().references(() => tag.id),
}, (table) => [
  primaryKey({ columns: [table.exerciseId, table.tagId] }),
]);

export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Workout = typeof workout.$inferSelect;
export type NewWorkout = typeof workout.$inferInsert;

export type Set = typeof set.$inferSelect;
export type NewSet = typeof set.$inferInsert;

export type Exercise = typeof exercise.$inferSelect;
export type NewExercise = typeof exercise.$inferInsert;

export type Tag = typeof tag.$inferSelect;
export type NewTag = typeof tag.$inferInsert;

export type ExerciseTag = typeof exerciseTag.$inferSelect;
export type NewExerciseTag = typeof exerciseTag.$inferInsert;