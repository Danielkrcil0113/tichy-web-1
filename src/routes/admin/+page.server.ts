import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
  const status = url.searchParams.get('status');
  const q = url.searchParams.get('q');

  let query = locals.supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (status) {
    query = query.eq('status', status);
  }

  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,city.ilike.%${q}%`
    );
  }

  const { data: leads, error } = await query;

  return {
    leads: leads ?? [],
    error: error?.message ?? null
  };
};