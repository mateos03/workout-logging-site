import { db } from "$lib/server/db"
import { tag, type NewTag, type Tag } from "$lib/server/db/schema"
import { isNameUnique, generalizeString } from "$lib/server/inputvalidation.js";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

let pubTags: Tag[] = [];

export const load = async ({ locals }) => {
  const tags: Tag[] = await db.select().from(tag).where(eq(tag.userId, locals.user!.id)).orderBy(tag.name);

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
      await db.insert(tag).values({ name: tagName, userId: locals.user!.id } as NewTag)
    } catch(error){
      console.log(error);
    }
  },
  delete_tag: async ({ request }) => {
    const data = await request.formData();

    const tagId = Number(data.get("tag_id"));
    
    try{
      await db.delete(tag).where(eq(tag.id, tagId));
    } catch(error){
      console.log(error);
    }
  },
  change_tag_name: async ({ request, locals }) => {
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
      await db.update(tag).set({ name: tagName }).where(eq(tag.id, tagId));
    } catch(error){
      console.log(error);
    }
  }
}