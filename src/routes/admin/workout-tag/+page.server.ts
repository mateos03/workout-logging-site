import { db } from "$lib/server/db"
import { tag, workoutTag, type NewTag, type NewWorkoutTag, type Tag, type WorkoutTag } from "$lib/server/db/schema"
import { isNameUnique, generalizeString } from "$lib/server/inputvalidation.js";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

let pubTags: WorkoutTag[] = [];

export const load = async ({ locals }) => {
  const tags: WorkoutTag[] = await db.select().from(workoutTag).where(eq(workoutTag.userId, locals.user!.id)).orderBy(workoutTag.name);

  pubTags = tags;

  return { tags }
}

export const actions = {
  add_tag: async ({ request, locals }) => {
    const data = await request.formData();

    const tagName = generalizeString(data.get("tag_name"));
    if(!tagName || tagName == ""){
      return fail(400, {
        add_tag_message: "Missing tag name."
      });
    }

    try{
      await db.insert(workoutTag).values({ name: tagName, userId: locals.user!.id } as NewWorkoutTag)
    } catch(error){
      console.log(error);
    }
  },
  delete_tag: async ({ request }) => {
    const data = await request.formData();

    const tagId = Number(data.get("tag_id"));
    
    try{
      await db.delete(workoutTag).where(eq(workoutTag.id, tagId));
    } catch(error){
      console.log(error);
    }
  },
  change_tag_name: async ({ request }) => {
    const data = await request.formData();

    const tagName = generalizeString(data.get("tag_name"));
    if(!tagName || tagName == ""){
      return fail(400, {
        change_tag_name_message: "Missing tag name"
      });
    }

    const tagId = Number(data.get("tag_id"));

    if(!isNameUnique(pubTags, tagName, tagId)){
      return fail(400, {
        change_tag_name_message: "Tag already exists"
      });
    }

    try{
      await db.update(workoutTag).set({ name: tagName }).where(eq(workoutTag.id, tagId));
    } catch(error){
      console.log(error);
    }
  }
}