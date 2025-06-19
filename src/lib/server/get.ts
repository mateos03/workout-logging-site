import { eq } from "drizzle-orm";
import { db } from "./db";
import { user } from "./db/schema";

const adminUser = await db.select({ id: user.id }).from(user).where(eq(user.username, "adminuser"));

export async function getAllFromUserId(table: any, userId: string, orderBy?: any ){
  let data = [];
  if(orderBy){
    data = await db.select().from(table).where(eq(table.userId, userId || adminUser[0].id)).orderBy(orderBy);  
  } else {
    data = await db.select().from(table).where(eq(table.userId, userId || adminUser[0].id)) as any[];
  }
  return(data);
}