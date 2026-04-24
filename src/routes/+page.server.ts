import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

type FormValues = {
  property_type: string;
  purpose: string;
  city: string;
  area_m2: string;
  disposition: string;
  condition: string;
  full_name: string;
  email: string;
  phone: string;
  note: string;
  consent: boolean;
  current_step: string;
};

type FormErrors = Record<string, string[]>;

function getString(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getBoolean(data: FormData, key: string): boolean {
  const value = data.get(key);
  return value === 'on' || value === 'true' || value === '1';
}

function getValues(data: FormData): FormValues {
  return {
    property_type: getString(data, 'property_type'),
    purpose: getString(data, 'purpose'),
    city: getString(data, 'city'),
    area_m2: getString(data, 'area_m2'),
    disposition: getString(data, 'disposition'),
    condition: getString(data, 'condition'),
    full_name: getString(data, 'full_name'),
    email: getString(data, 'email'),
    phone: getString(data, 'phone'),
    note: getString(data, 'note'),
    consent: getBoolean(data, 'consent'),
    current_step: getString(data, 'current_step')
  };
}

function validate(values: FormValues, imageCount: number): FormErrors {
  const errors: FormErrors = {};

  if (!values.property_type) errors.property_type = ['Vyberte typ nemovitosti.'];
  if (!values.purpose) errors.purpose = ['Vyberte účel odhadu.'];
  if (!values.city || values.city.length < 3) errors.city = ['Zadejte prosím adresu nebo lokalitu.'];
  if (!values.area_m2 || Number(values.area_m2) <= 0) errors.area_m2 = ['Zadejte prosím platnou užitnou plochu.'];
  if (!values.disposition) errors.disposition = ['Vyberte prosím možnost z nabídky.'];
  if (!values.full_name || values.full_name.length < 2) errors.full_name = ['Zadejte prosím své jméno a příjmení.'];
  if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = ['Zadejte prosím platnou e-mailovou adresu.'];
  if (!values.phone || values.phone.length < 9) errors.phone = ['Zadejte prosím platné telefonní číslo.'];
  if (!values.consent) errors.consent = ['Je potřeba souhlasit se zpracováním údajů.'];
  if (imageCount > 10) errors.images = ['Můžete nahrát maximálně 10 fotografií.'];

  return errors;
}

function getPropertyTypeLabel(propertyType: string): string {
  switch (propertyType) {
    case 'byt':
      return 'Byt';
    case 'dum':
      return 'Dům';
    case 'pozemek':
      return 'Pozemek';
    case 'komercni':
      return 'Komerční';
    default:
      return propertyType || 'Neuvedeno';
  }
}

function getPurposeLabel(purpose: string): string {
  switch (purpose) {
    case 'prodej':
      return 'Plánuji prodej';
    case 'pronajem':
      return 'Chci pronajmout';
    case 'odhad':
      return 'Jen pro zajímavost';
    default:
      return purpose || 'Neuvedeno';
  }
}

function bufferToBase64(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString('base64');
}

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const values = getValues(data);

    const rawImages = data.getAll('images');
    const images = rawImages.filter((item): item is File => {
      return item instanceof File && item.size > 0 && item.name !== '' && item.name !== 'undefined';
    });

    const errors = validate(values, images.length);

    if (Object.keys(errors).length > 0) {
      return fail(422, {
        success: false,
        message: 'Některá políčka je potřeba ještě upravit. Zkontrolujte prosím formulář.',
        errors,
        values
      });
    }

    const resendApiKey = env.RESEND_API_KEY;

    if (!resendApiKey) {
      return fail(500, {
        success: false,
        message: 'Server není správně nastaven pro odesílání e-mailů.',
        errors: {},
        values
      });
    }

    try {
      const resend = new Resend(resendApiKey);

      const attachments = await Promise.all(
        images.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();

          return {
            filename: file.name,
            content: bufferToBase64(arrayBuffer)
          };
        })
      );

      const propertyTypeLabel = getPropertyTypeLabel(values.property_type);
      const purposeLabel = getPurposeLabel(values.purpose);

      const { error } = await resend.emails.send({
        from: 'Nejlepší odhad <	info@nejlepsiodhadnemovitosti.cz>',
        to: ['info@nejlepsiodhadnemovitosti.cz'],
        replyTo: values.email,
        subject: `Nová poptávka po odhadu: ${propertyTypeLabel} - ${values.city}`,
        text: `Nová poptávka po ocenění nemovitosti z webu:

ZÁKLADNÍ ÚDAJE:
Typ: ${propertyTypeLabel}
Účel: ${purposeLabel}

LOKALITA A PARAMETRY:
Adresa: ${values.city}
Užitná plocha: ${values.area_m2} m²
Dispozice / typ: ${values.disposition}
Stav: ${values.condition || 'Neuvedeno'}

KONTAKTNÍ ÚDAJE:
Jméno: ${values.full_name}
E-mail: ${values.email}
Telefon: ${values.phone}

POZNÁMKA KLIENTA:
${values.note || 'Bez poznámky'}

SOUHLAS GDPR:
${values.consent ? 'Ano' : 'Ne'}
`,
        attachments
      });

      if (error) {
        return fail(500, {
          success: false,
          message: `Odeslání e-mailu se nezdařilo: ${error.message}`,
          errors: {},
          values
        });
      }

      return {
        success: true,
        message: 'Děkujeme, formulář byl úspěšně odeslán.'
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Neznámá chyba';

      return fail(500, {
        success: false,
        message: `Odeslání e-mailu se nezdařilo: ${message}`,
        errors: {},
        values
      });
    }
  }
};