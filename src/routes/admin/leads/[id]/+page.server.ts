import { error } from '@sveltejs/kit';
import type { Actions, ServerLoad } from '@sveltejs/kit';

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
  updateStatus: async ({ request, locals, params }) => {
    const formData = await request.formData();
    const status = String(formData.get('status') ?? '');

    const allowed = ['new', 'contacted', 'in_progress', 'done', 'archived'];

    if (!allowed.includes(status)) {
      return { success: false };
    }

    const { error: updateError } = await locals.supabase
      .from('leads')
      .update({ status })
      .eq('id', params.id);

    return { success: !updateError };
  }
};