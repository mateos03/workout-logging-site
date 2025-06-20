import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { workout, type NewWorkout } from "$lib/server/db/schema";

export const load: LayoutServerLoad = async ({ url, locals }) => {
  const URLs = ["/about", "/login", "/register"]

  if (!locals.user && !URLs.includes(url.pathname)) {
    throw redirect(302, "/about");
  }

  return { user: locals.user };
};