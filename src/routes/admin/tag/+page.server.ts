import { db } from "$lib/server/db"
import { tag, type NewTag, type Tag } from "$lib/server/db/schema"
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async () => {
  const tags: Tag[] = await db.select().from(tag);

  return { tags }
}

export const actions = {
  add_tag: async ({ request, locals }) => {
    const data = await request.formData();

    const name = data.get("tag_name");
    if(!name || name == ""){
      return fail(400, {
        message: "Missing tag name."
      });
    }

    try{
      await db.insert(tag).values({ name: name, userId: locals.user!.id } as NewTag)
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
  }
}