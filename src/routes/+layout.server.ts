import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, locals }) => {
  const URLs = ["/about", "/login", "/register"]

  if (!locals.user && !URLs.includes(url.pathname)) {
    throw redirect(302, "/about");
  }

  return { user: locals.user };
};