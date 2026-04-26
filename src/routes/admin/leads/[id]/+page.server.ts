import { error, fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { Actions, ServerLoad } from '@sveltejs/kit';

const ALLOWED_STATUSES = ['new', 'contacted', 'in_progress', 'done', 'archived'];

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

export const load: ServerLoad = async ({ params }) => {
  const supabaseAdmin = getSupabaseAdmin();

  const { data: lead, error: dbError } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', params.id)
    .single();

  if (dbError || !lead) {
    throw error(404, 'Poptávka nebyla nalezena');
  }

  return { lead };
};

export const actions: Actions = {
  updateLead: async ({ request, params }) => {
    const supabaseAdmin = getSupabaseAdmin();

    const formData = await request.formData();

    const status = String(formData.get('status') ?? '');
    const internalNote = String(formData.get('internal_note') ?? '');

    if (!ALLOWED_STATUSES.includes(status)) {
      return fail(400, {
        success: false,
        message: 'Neplatný stav.'
      });
    }

    const { error: updateError } = await supabaseAdmin
      .from('leads')
      .update({
        status,
        internal_note: internalNote || null
      })
      .eq('id', params.id);

    if (updateError) {
      return fail(500, {
        success: false,
        message: `Změny se nepodařilo uložit: ${updateError.message}`
      });
    }

    return {
      success: true,
      message: 'Změny byly uložené.'
    };
  },

  deleteLead: async ({ params }) => {
    const supabaseAdmin = getSupabaseAdmin();

    const { error: deleteError } = await supabaseAdmin
      .from('leads')
      .delete()
      .eq('id', params.id);

    if (deleteError) {
      return fail(500, {
        success: false,
        message: `Lead se nepodařilo smazat: ${deleteError.message}`
      });
    }

    throw redirect(303, '/admin');
  }
};