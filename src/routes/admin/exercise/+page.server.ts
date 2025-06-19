import { db } from '$lib/server/db/index.js'
import { exercise, exerciseTag, type Exercise } from '$lib/server/db/schema'
import { getAllFromUserId } from '$lib/server/get.js'
import { eq } from 'drizzle-orm'

export const load = async ({ locals }) => {
  const exercises: Exercise[] = await getAllFromUserId(exercise, locals.user!.id, exercise.name);

  return { exercises }
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const exerciseId = Number(data.get("exercise_id"));

    try{
      await db.delete(exerciseTag).where(eq(exerciseTag.exerciseId, exerciseId));
      await db.delete(exercise).where(eq(exercise.id, exerciseId));
    } catch(error){
      console.log(error)
    }
  }
}