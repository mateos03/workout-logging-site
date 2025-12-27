import { db } from '$lib/server/db/index.js'
import { exercise, exerciseTag, tag, workout, workoutExercise, type Exercise, type ExerciseTag, type Tag } from '$lib/server/db/schema.js'
import { getAllFromUserId } from '$lib/server/get.js';
import { redirect } from '@sveltejs/kit';
import { eq, inArray } from 'drizzle-orm'


export const load = async ({ params, locals }) => {
  const workoutId = params.workout_id
  const workoutResult = await db.select().from(workout).where(eq(workout.id, Number(workoutId)));
  const tags: Tag[] = await getAllFromUserId(tag, locals.user!.id, tag.name);
  const exercises: Exercise[] = await getAllFromUserId(exercise, locals.user!.id, exercise.name);
  const exerciseTags: ExerciseTag[] = await db.select().from(exerciseTag).where(inArray(exerciseTag.exerciseId, exercises.map((exercise) => exercise.id)));
  const workoutExercises: {id: number, name: string}[] = await db.select({ id: workoutExercise.id, name: exercise.name }).from(workoutExercise).where(eq(workoutExercise.workoutId, Number(workoutId))).innerJoin(exercise, eq(workoutExercise.exerciseId, exercise.id));

  return { workout: workoutResult[0], tags, exercises, exerciseTags, workoutExercises, workoutId }
}

export const actions = {
  change_workout_tag: async ({ request, params }) => {
    const data = await request.formData();

    const tagId = Number(data.get("workout_tag"));
    const workoutId = Number(params.workout_id);

    try{
      await db.update(workout).set({ tagId: tagId }).where(eq(workout.id, workoutId));
    } catch(error){
      console.log(error);
    }
  },
  change_workout_finished: async ({ request, params }) => {
    const data = await request.formData();

    const workoutId = Number(params.workout_id);
    const finished = Boolean(data.get("workout_finished") == "true");
    console.log(finished);

    try{
      await db.update(workout).set({ finished: finished }).where(eq(workout.id, workoutId));
    } catch(error){
      console.log(error);
    }
  },
  new_exercise: async ({ request, params }) => {
    const data = await request.formData();
    
    const workoutId = Number(params.workout_id);
    const exerciseId = Number(data.get("exercise_id"));

    let result;

    try{
      result = await db.insert(workoutExercise).values({ workoutId: workoutId, exerciseId: exerciseId }).returning({ id: workoutExercise.id });
    } catch(error){
      console.log(error)
    }

    throw redirect(303, `/workouts/${workoutId}/${result![0].id}`);
  }
}