import { db } from '$lib/server/db/index.js'
import { exercise, exerciseTag, type Exercise, type ExerciseTag } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const load = async ({ locals }) => {
  const exercises: Exercise[] = await db.select().from(exercise).where(eq(exercise.userId, locals.user!.id)).orderBy(exercise.name);
  
  const exerciseTags: ExerciseTag[] = (await db.select().from(exerciseTag)).filter((x) => exercises.map((y) => y.id).includes(x.exerciseId));

  return { exercises, exerciseTags }
}

export const actions = {
  delete_exercise: ({ request, locals }) => {
    
  }
}