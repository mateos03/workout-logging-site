import { db } from '$lib/server/db/index.js'
import { exercise, exerciseTag, tag, type Exercise, type NewExercise, type NewExerciseTag } from '$lib/server/db/schema'
import { getAllFromUserId } from '$lib/server/get.js';
import { generalizeString, isNameUnique } from '$lib/index';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const tags = await getAllFromUserId(tag, locals.user!.id, tag.name);

  return { tags }
}

export const actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();

    const exerciseName = generalizeString(data.get("exercise_name"));
    if(!exerciseName || exerciseName === ""){
      return fail(400, {
        message: "Missing exercise name"
      });
    }

    const exerciseDescription = generalizeString(data.get("exercise_description"));
    if(!exerciseDescription || exerciseDescription === ""){
      return fail(400, {
        message: "Missing exercise description"
      });
    } 

    const exerciseTagIds = data.getAll("exercise_tag_ids");
    if(!exerciseTagIds || exerciseTagIds.length == 0){
      return fail(400, {
        message: "Missing exercise tag"
      });
    }

    const exercises: Exercise[] = await getAllFromUserId(exercise, locals.user!.id);
    if(!isNameUnique(exercises, exerciseName)){
      return fail(400, {
        message: "Exercise already exists"
      });
    }

    try{
      const result = await db.insert(exercise).values({ name: exerciseName, userId: locals.user!.id, description: exerciseDescription } as NewExercise).returning({ exerciseId: exercise.id });

      const insertArray: NewExerciseTag[] = exerciseTagIds.map((exerciseTagId) => { return({ exerciseId: result[0].exerciseId, tagId: Number(exerciseTagId) }) });

      await db.insert(exerciseTag).values(insertArray);
    } catch(error){
      console.log(error);
    }
  }
}