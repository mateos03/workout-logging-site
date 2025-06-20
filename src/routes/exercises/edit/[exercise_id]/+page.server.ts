import { db } from '$lib/server/db/index.js'
import { exercise, exerciseTag, tag, type Exercise, type NewExerciseTag } from '$lib/server/db/schema.js'
import { getAllFromUserId } from '$lib/server/get.js';
import { generalizeString, isNameUnique } from '$lib/index';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm'


export const load = async ({ params, locals }) => {
  const exerciseResult = await db.select().from(exercise).where(eq(exercise.id, Number(params.exercise_id)));
  if(exerciseResult[0].userId != locals.user!.id){
    throw redirect(302, "/");
  }

  const exerciseTagResult = await db.select().from(exerciseTag).where(eq(exerciseTag.exerciseId, Number(params.exercise_id)));
  const tagResult = await getAllFromUserId(tag, locals.user!.id, tag.name);

  return { exercise: exerciseResult[0], exerciseTags: exerciseTagResult, tags: tagResult }
}

export const actions = {
  default: async ({ locals, request, params }) => {
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

    const exerciseId = Number(params.exercise_id);

    const exerciseTagIds = data.getAll("exercise_tag_ids");
    if(!exerciseTagIds || exerciseTagIds.length == 0){
      return fail(400, {
        message: "Missing exercise tag"
      });
    }

    const exercises: Exercise[] = await getAllFromUserId(exercise, locals.user!.id);
    if(!isNameUnique(exercises, exerciseName, exerciseId)){
      return fail(400, {
        message: "Exercise already exists"
      });
    }


    try{
      await db.update(exercise).set({ name: exerciseName, description: exerciseDescription }).where(eq(exercise.id, exerciseId));
      
      await db.delete(exerciseTag).where(eq(exerciseTag.exerciseId, exerciseId));

      const insertArray: NewExerciseTag[] = exerciseTagIds.map((exerciseTagId) => { return({ exerciseId: exerciseId, tagId: Number(exerciseTagId) }) });

      await db.insert(exerciseTag).values(insertArray);
    } catch(error){
      console.log(error)
    }

    throw redirect(303, "/exercises"); 
  }
}



