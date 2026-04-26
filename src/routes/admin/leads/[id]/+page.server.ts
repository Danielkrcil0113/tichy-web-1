import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, ServerLoad } from '@sveltejs/kit';

const ALLOWED_STATUSES = ['new', 'contacted', 'in_progress', 'done', 'archived'];

export const load: ServerLoad = async ({ locals, params }) => {
  const { data: lead, error: dbError } = await locals.supabase
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
  updateLead: async ({ request, locals, params }) => {
    const formData = await request.formData();

    const status = String(formData.get('status') ?? '');
    const internalNote = String(formData.get('internal_note') ?? '');

    if (!ALLOWED_STATUSES.includes(status)) {
      return fail(400, {
        message: 'Neplatný stav.'
      });
    }

    const { error: updateError } = await locals.supabase
      .from('leads')
      .update({
        status,
        internal_note: internalNote || null
      })
      .eq('id', params.id);

    if (updateError) {
      return fail(500, {
        message: 'Změny se nepodařilo uložit.'
      });
    }

    return {
      success: true,
      message: 'Změny byly uložené.'
    };
  },

  deleteLead: async ({ locals, params }) => {
    const { error: deleteError } = await locals.supabase
      .from('leads')
      .delete()
      .eq('id', params.id);

    if (deleteError) {
      return fail(500, {
        message: 'Lead se nepodařilo smazat.'
      });
    }

    throw redirect(303, '/admin');
  }
};