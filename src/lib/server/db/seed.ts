import 'dotenv/config';
import crypto from 'crypto';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { hash } from '@node-rs/argon2';
import { db } from './seed-client';
import * as table from './schema';
import type {
  NewUser,
  NewWorkout,
  NewExercise,
  NewTag,
  NewExerciseTag,
  Exercise,
  Tag,
} from './schema';

/* ----------------------------------------
   Helpers
----------------------------------------- */

function generateId() {
  const bytes = crypto.getRandomValues(new Uint8Array(15));
  return encodeBase32LowerCase(bytes);
}

async function hashPassword(password: string) {
  return hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}

/* ----------------------------------------
   Seed Data
----------------------------------------- */

const users: NewUser[] = [
  { id: '', age: 25, username: 'adminuser', passwordHash: 'adminuser' },
  { id: '', age: 18, username: 'testuser', passwordHash: 'testuser' },
];

async function seedUsers() {
  for (const user of users) {
    user.id = generateId();
    user.passwordHash = await hashPassword(user.passwordHash);

    await db.insert(table.user).values(user);
  }
  
  return users;
}

/* ----------------------------------------
   Tags
----------------------------------------- */

async function seedTags(userId: string) {
  const tags: NewTag[] = [
    { name: 'Strength', userId },
    { name: 'Hypertrophy', userId },
    { name: 'Cardio', userId },
  ];

  const inserted = await db
    .insert(table.tag)
    .values(tags)
    .returning();

  return inserted;
}

/* ----------------------------------------
   Exercises
----------------------------------------- */

async function seedExercises(userId: string) {
  const exercises: NewExercise[] = [
    {
      name: 'Bench Press',
      description: 'Chest compound movement',
      userId,
    },
    {
      name: 'Squat',
      description: 'Lower body compound movement',
      userId,
    },
    {
      name: 'Deadlift',
      description: 'Posterior chain compound movement',
      userId,
    },
  ];

  const inserted = await db
    .insert(table.exercise)
    .values(exercises)
    .returning();

  return inserted;
}

/* ----------------------------------------
   Exercise ↔ Tag Relations
----------------------------------------- */

async function seedExerciseTags(exercises: Exercise[], tags: Tag[]) {
  const relations: NewExerciseTag[] = [
    { exerciseId: exercises[0].id, tagId: tags[0].id }, // Bench → Strength
    { exerciseId: exercises[1].id, tagId: tags[0].id }, // Squat → Strength
    { exerciseId: exercises[2].id, tagId: tags[1].id }, // Deadlift → Hypertrophy
  ];

  await db.insert(table.exerciseTag).values(relations);
}

/* ----------------------------------------
   Workouts
----------------------------------------- */

async function seedWorkout(userId: string, tagId: number) {
  const workout: NewWorkout = {
    userId,
    created: new Date(),
    tagId,
    rating: 5,
    notes: 'Great session',
    finished: true,
  };

  const [inserted] = await db
    .insert(table.workout)
    .values(workout)
    .returning();

  return inserted;
}

/* ----------------------------------------
   Workout Exercises & Sets
----------------------------------------- */

async function seedWorkoutExercises(workoutId: number, exercises: Exercise[]) {
  const [bench, squat] = exercises;

  const workoutExercises = await db
    .insert(table.workoutExercise)
    .values([
      { workoutId, exerciseId: bench.id, notes: 'Felt strong' },
      { workoutId, exerciseId: squat.id, notes: 'Heavy sets' },
    ])
    .returning();

  for (const we of workoutExercises) {
    await db.insert(table.set).values([
      { workoutExerciseId: we.id, setNumber: 1, reps: 5, weight: 100 },
      { workoutExerciseId: we.id, setNumber: 2, reps: 5, weight: 100 },
      { workoutExerciseId: we.id, setNumber: 3, reps: 5, weight: 100 },
    ]);
  }
}

/* ----------------------------------------
   Main
----------------------------------------- */

async function main() {
  console.log('🌱 Seeding database...');

  const seededUsers = await seedUsers();
  const adminUser = seededUsers[0];

  const tags = await seedTags(adminUser.id);
  const exercises = await seedExercises(adminUser.id);

  await seedExerciseTags(exercises, tags);

  const workout = await seedWorkout(adminUser.id, tags[0].id);

  await seedWorkoutExercises(workout.id, exercises);

  console.log('✅ Seeding complete');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed');
  console.error(err);
  process.exit(1);
});

