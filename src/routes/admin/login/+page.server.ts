import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, locals, url }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') ?? '').trim();

    if (!email) {
      return fail(400, { message: 'Zadej e-mail.' });
    }

    const { error } = await locals.supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${url.origin}/admin`
      }
    });

    if (error) {
      return fail(400, { message: error.message });
    }

    return { success: true };
  }
};