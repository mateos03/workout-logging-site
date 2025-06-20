import { tag, workout, type Tag, type Workout } from '$lib/server/db/schema'
import { getAllFromUserId } from '$lib/server/get.js'


export const load = async ({ locals }) => {
  const workouts: Workout[] = await getAllFromUserId(workout, locals.user!.id, workout.created);
  const tags: Tag[] = await getAllFromUserId(tag, locals.user!.id);

  return { workouts, tags }
}