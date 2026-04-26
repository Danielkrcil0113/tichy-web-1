import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { ServerLoad } from '@sveltejs/kit';

function getSupabaseAdmin() {
  if (!PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase env variables.');
  }

  return createClient(PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false
    }
  });
}

export const load: ServerLoad = async () => {
  const supabaseAdmin = getSupabaseAdmin();

  const { data: leads, error: dbError } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (dbError) {
    throw error(500, `Leady se nepodařilo načíst: ${dbError.message}`);
  }

  return {
    leads: leads ?? []
  };
};