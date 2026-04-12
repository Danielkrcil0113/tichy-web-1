import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

// Pokud máš validation.ts ve STEJNÉ složce, použij tento import místo toho spodního:
// import { leadSchema } from './validation';
import { leadSchema } from '$lib/server/validation';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const areaRaw = formData.get('area_m2');

    const raw = {
      property_type: String(formData.get('property_type') ?? 'byt'),
      purpose: String(formData.get('purpose') ?? 'prodej'),
      city: String(formData.get('city') ?? ''),
      area_m2: areaRaw && String(areaRaw).trim() !== '' ? Number(areaRaw) : null,
      disposition: String(formData.get('disposition') ?? ''),
      condition: formData.get('condition') ? String(formData.get('condition')) : undefined,
      full_name: String(formData.get('full_name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      note: String(formData.get('note') ?? ''),
      consent: formData.get('consent') === 'on'
    };

    const parsed = leadSchema.safeParse(raw);

    if (!parsed.success) {
      return fail(400, {
        success: false,
        message: 'Formulář obsahuje chyby.',
        errors: parsed.error.flatten().fieldErrors,
        values: raw
      });
    }

    console.log('VALID LEAD:', parsed.data);

    return {
      success: true,
      message: 'Formulář byl úspěšně odeslán.',
      values: {}
    };
  }
};