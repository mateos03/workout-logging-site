import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db/index.js";
import { exercise, exerciseTag, tag, workoutTag, type NewExercise, type NewExerciseTag, type NewTag, type NewWorkoutTag, type Tag } from "$lib/server/db/schema.js"

export const load = async () => {
  const tags: Tag[] = await db.select().from(tag);

  return { tags: tags };
};

export const actions = {
  add_workout_tag: async ({ request, locals }) => {
    const data = await request.formData();

    const name = data.get("name")?.toString();

    if(!name || name == ""){
      return fail(400, {
        message: "Missing name"
      });
    }

    try{
      await db.insert(workoutTag).values({ name: name?.toString(), userId: locals.user?.id.toString() } as NewWorkoutTag);
    } catch(error){
      console.error(error);
    }

  },
  add_tag: async ({ request, locals }) => {
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const userId = locals.user?.id.toString();

    try{
      await db.insert(tag).values({ name: name, userId: userId } as NewTag);
    } catch(error){
      console.error(error);
    }
  },
  add_exercise: async ({ request, locals }) => {
    const data = await request.formData();
    const name = data.get("name")?.toString()
    const description = data.get("description")?.toString()
    const userId = locals.user?.id.toString();
    const tags = data.getAll("tag[]");

    let insertArray: NewExerciseTag[] = [];

    
    try{
      const result = await db.insert(exercise).values({name: name, userId: userId, description: description} as NewExercise).returning({ id: exercise.id });

      tags.map((tag) => insertArray.push({ exerciseId: result[0].id, tagId: Number(tag) }));

      await db.insert(exerciseTag).values(insertArray);
    } catch(error){
      console.error(error);
    }
  },
}