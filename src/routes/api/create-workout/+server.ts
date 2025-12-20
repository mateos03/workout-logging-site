import { db } from "$lib/server/db";
import { workout, type NewWorkout } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals }) => {
  const date = new Date();

  try {
    const result = await db
      .insert(workout)
      .values({ userId: locals.user!.id, created: date } as NewWorkout)
      .returning({ id: workout.id });

    // Redirect to the new workout page
    return new Response(null, {
      status: 302,
      headers: { Location: `/workouts/${result[0].id}` }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};