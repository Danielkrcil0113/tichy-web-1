import { error } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
  const { data: leads, error: dbError } = await locals.supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (dbError) {
    throw error(500, 'Leady se nepodařilo načíst.');
  }

  return {
    leads: leads ?? []
  };
};