import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if(locals.user!.username != "adminuser"){
    throw redirect(302, "/")
  }
};