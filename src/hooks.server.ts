import type { Handle } from '@sveltejs/kit';
import { createSupabaseServer } from '$lib/server';

export const handle: Handle = async ({ event, resolve }) => {
  const supabase = createSupabaseServer(event.cookies);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  event.locals.supabase = supabase;
  event.locals.user = user;

  return resolve(event);
};