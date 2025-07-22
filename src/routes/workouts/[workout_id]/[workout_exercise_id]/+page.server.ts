import { db } from '$lib/server/db/index.js'
import { exercise, set, workoutExercise } from '$lib/server/db/schema.js'
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm'

export const load = async ({ params }) => {
  const workoutExerciseId = params.workout_exercise_id;
  const workoutId = params.workout_id;
  const exerciseResult = await db.select({ name: exercise.name }).from(workoutExercise).where(eq(workoutExercise.id, Number(workoutExerciseId))).innerJoin(exercise, eq(workoutExercise.exerciseId, exercise.id));
  const sets = await db.select().from(set).where(eq(set.workoutExerciseId, Number(workoutExerciseId))).orderBy(set.setNumber);

  return { exerciseName: exerciseResult[0].name, sets, workoutId, workoutExerciseId }
}

export const actions = {
  new_set: async ({ request, params }) => {
    const data = await request.formData();

    const workoutExerciseId = Number(params.workout_exercise_id)

    const weight = Number(data.get("set_weight"));
    if(!weight){
      return fail(400, {
        message: "Missing Weight"
      });
    }

    const reps = Number(data.get("set_reps"));
    if(!reps){
      return fail(400, {
        message: "Missing Reps"
      })
    }

    const setNumber = Number(data.get("set_number"));

    try{
      await db.insert(set).values({workoutExerciseId: workoutExerciseId, setNumber: setNumber, weight: weight, reps: reps});
    } catch(error){
      return fail(500, {
        message: "Something went wrong"
      });
    }
  },
  delete_exercise: async ({ params }) => {
    const workoutExerciseId = Number(params.workout_exercise_id);
    const workoutId = params.workout_id;
    
    try{
      await Promise.all([
        db.delete(set).where(eq(set.workoutExerciseId, workoutExerciseId)),
        db.delete(workoutExercise).where(eq(workoutExercise.id, workoutExerciseId))
      ]);
    } catch(error){
      return fail(500, {
        message_delete: "Something went wrong"
      });
    }

    throw(redirect(303, `/workouts/${workoutId}`));
  }
}