import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';
import type { Actions } from './$types';

type FormValues = {
  property_type: string;
  purpose: string;
  city: string;
  area_m2: string;
  disposition: string;
  condition: string;
  elevator: string;
  full_name: string;
  email: string;
  phone: string;
  note: string;
  consent: boolean;
  current_step: string;
};

type FormErrors = Record<string, string[]>;

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY ?? '', {
  auth: {
    persistSession: false
  }
});

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

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
    elevator: getString(data, 'elevator'),
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
  if (values.property_type === 'byt' && !values.elevator) errors.elevator = ['Vyberte prosím, zda je v domě výtah.'];
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
      return 'Rodinný dům';
    case 'ostatni':
      return 'Pozemek / Ostatní';
    default:
      return propertyType || 'Neuvedeno';
  }
}

function getPurposeLabel(purpose: string): string {
  switch (purpose) {
    case 'prodavam':
      return 'Prodávám nemovitost';
    case 'kupuji':
      return 'Kupuji nemovitost';
    case 'dedictvi':
      return 'Dědictví';
    case 'sjm_rozvod':
      return 'Vypořádání SJM při rozvodu';
    case 'jine':
      return 'Jiný důvod';
    default:
      return purpose || 'Neuvedeno';
  }
}

function getConditionLabel(condition: string): string {
  switch (condition) {
    case 'novostavba':
      return 'Novostavba / perfektní stav';
    case 'po_rekonstrukci':
      return 'Po kompletní rekonstrukci';
    case 'dobry_stav':
      return 'Dobrý stav, udržované';
    case 'puvodni_stav':
      return 'Původní stav, před rekonstrukcí';
    default:
      return condition || 'Neuvedeno';
  }
}

function getElevatorLabel(elevator: string): string {
  switch (elevator) {
    case 'ano':
      return 'Ano';
    case 'ne':
      return 'Ne';
    case 'nevim':
      return 'Nevím';
    default:
      return elevator || 'Neuvedeno';
  }
}

function bufferToBase64(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString('base64');
}

function emailSection(title: string, rows: Array<[string, string]>): string {
  return `
    <div style="margin-top:22px;">
      <h2 style="margin:0 0 12px;font-size:17px;line-height:1.3;color:#0f172a;">
        ${escapeHtml(title)}
      </h2>

      <div style="border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;background:#ffffff;">
        ${rows
          .map(([label, value], index) => {
            const border = index === rows.length - 1 ? '' : 'border-bottom:1px solid #e2e8f0;';

            return `
              <div style="display:flex;${border}">
                <div style="width:42%;background:#f8fafc;padding:13px 15px;font-size:13px;line-height:1.5;font-weight:700;color:#64748b;">
                  ${escapeHtml(label)}
                </div>
                <div style="width:58%;padding:13px 15px;font-size:14px;line-height:1.5;color:#0f172a;font-weight:600;white-space:pre-wrap;">
                  ${escapeHtml(value || 'Neuvedeno')}
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    </div>
  `;
}

function createAdminEmailHtml(params: {
  propertyTypeLabel: string;
  purposeLabel: string;
  conditionLabel: string;
  elevatorLabel: string;
  values: FormValues;
  imageCount: number;
}): string {
  const { propertyTypeLabel, purposeLabel, conditionLabel, elevatorLabel, values, imageCount } = params;

  return `
<!doctype html>
<html lang="cs">
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <div style="padding:32px 16px;background:#f8fafc;">
    <div style="max-width:760px;margin:0 auto;background:#ffffff;border-radius:28px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#0f172a;padding:32px;">
        <div style="display:inline-block;background:rgba(99,102,241,.18);color:#c7d2fe;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:700;">
          Nová poptávka z webu
        </div>

        <h1 style="margin:18px 0 0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:800;">
          Nový odhad nemovitosti
        </h1>

        <p style="margin:10px 0 0;color:#cbd5e1;font-size:15px;line-height:1.6;">
          ${escapeHtml(propertyTypeLabel)} · ${escapeHtml(values.city)}
        </p>
      </div>

      <div style="padding:28px;">
        <div style="display:flex;gap:14px;margin-bottom:24px;">
          <div style="width:50%;background:#eef2ff;border:1px solid #c7d2fe;border-radius:18px;padding:18px;">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#4f46e5;font-weight:700;">
              Typ nemovitosti
            </div>
            <div style="margin-top:6px;font-size:18px;font-weight:800;color:#111827;">
              ${escapeHtml(propertyTypeLabel)}
            </div>
          </div>

          <div style="width:50%;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:18px;padding:18px;">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#16a34a;font-weight:700;">
              Účel odhadu
            </div>
            <div style="margin-top:6px;font-size:18px;font-weight:800;color:#111827;">
              ${escapeHtml(purposeLabel)}
            </div>
          </div>
        </div>

        ${emailSection('Lokalita a parametry', [
          ['Adresa / lokalita', values.city],
          ['Užitná plocha', `${values.area_m2} m²`],
          ['Dispozice / typ', values.disposition],
          ['Stav', conditionLabel],
          ['Výtah', values.property_type === 'byt' ? elevatorLabel : 'Nerelevantní']
        ])}

        ${emailSection('Kontaktní údaje', [
          ['Jméno', values.full_name],
          ['E-mail', values.email],
          ['Telefon', values.phone]
        ])}

        ${emailSection('Poznámka klienta', [['Poznámka', values.note || 'Bez poznámky']])}

        ${emailSection('Fotografie a souhlas', [
          ['Počet fotografií', String(imageCount)],
          ['Souhlas GDPR', values.consent ? 'Ano' : 'Ne']
        ])}

        <div style="margin-top:28px;padding:18px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;color:#64748b;font-size:13px;line-height:1.6;">
          Tento e-mail byl automaticky odeslán z formuláře na webu Nejlepší odhad nemovitosti.
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

function createCustomerEmailHtml(params: {
  propertyTypeLabel: string;
  purposeLabel: string;
  values: FormValues;
}): string {
  const { propertyTypeLabel, purposeLabel, values } = params;

  return `
<!doctype html>
<html lang="cs">
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <div style="padding:32px 16px;background:#f8fafc;">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:28px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#0f172a;padding:32px;">
        <div style="display:inline-block;background:rgba(99,102,241,.18);color:#c7d2fe;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:700;">
          Nejlepší odhad nemovitosti
        </div>

        <h1 style="margin:18px 0 0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:800;">
          Děkujeme, poptávku jsme přijali
        </h1>

        <p style="margin:10px 0 0;color:#cbd5e1;font-size:15px;line-height:1.6;">
          Ozveme se vám s dalším postupem.
        </p>
      </div>

      <div style="padding:28px;">
        <p style="margin:0;font-size:16px;line-height:1.7;color:#0f172a;">
          Dobrý den, ${escapeHtml(values.full_name)},
        </p>

        <p style="margin:16px 0 0;font-size:16px;line-height:1.7;color:#334155;">
          děkujeme za zaslání poptávky. Vaše údaje jsme přijali a brzy se vám ozveme s dalším postupem.
        </p>

        <div style="margin-top:24px;padding:20px;border-radius:20px;background:#eef2ff;border:1px solid #c7d2fe;">
          <div style="font-size:13px;font-weight:800;color:#4f46e5;text-transform:uppercase;letter-spacing:.06em;">
            Shrnutí poptávky
          </div>

          <div style="margin-top:12px;font-size:15px;line-height:1.8;color:#0f172a;">
            <strong>Nemovitost:</strong> ${escapeHtml(propertyTypeLabel)}<br />
            <strong>Lokalita:</strong> ${escapeHtml(values.city)}<br />
            <strong>Účel:</strong> ${escapeHtml(purposeLabel)}
          </div>
        </div>

        <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#64748b;">
          Tento e-mail je automatické potvrzení přijetí formuláře. Na tuto zprávu můžete odpovědět, pokud chcete něco doplnit.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
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
      if (dev) {
        console.log('FORM VALUES:', values);
        console.log('FORM ERRORS:', errors);
        console.log('IMAGE COUNT:', images.length);
        console.log('RAW FORM DATA:', Object.fromEntries(data.entries()));
      }

      return fail(422, {
        success: false,
        message: 'Některá políčka je potřeba ještě upravit. Zkontrolujte prosím formulář.',
        errors,
        values
      });
    }

    if (!env.RESEND_API_KEY) {
      return fail(500, {
        success: false,
        message: 'Server není správně nastaven pro odesílání e-mailů.',
        errors: {},
        values
      });
    }

    if (!env.SUPABASE_SERVICE_ROLE_KEY) {
      return fail(500, {
        success: false,
        message: 'Server není správně nastaven pro ukládání poptávek.',
        errors: {},
        values
      });
    }

    const propertyTypeLabel = getPropertyTypeLabel(values.property_type);
    const purposeLabel = getPurposeLabel(values.purpose);
    const conditionLabel = getConditionLabel(values.condition);
    const elevatorLabel = getElevatorLabel(values.elevator);

    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .insert({
        property_type: values.property_type,
        purpose: values.purpose,
        city: values.city,
        area_m2: values.area_m2,
        disposition: values.disposition,
        condition: values.condition || null,
        elevator: values.elevator || null,
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        note: values.note || null,
        consent: values.consent,
        image_count: images.length,
        admin_email_sent: false,
        customer_email_sent: false,
        email_error: null
      })
      .select('id')
      .single();

    if (leadError || !lead) {
      return fail(500, {
        success: false,
        message: `Uložení poptávky se nezdařilo: ${leadError?.message || 'Neznámá chyba'}`,
        errors: {},
        values
      });
    }

    try {
      const resend = new Resend(env.RESEND_API_KEY);

      const attachments = await Promise.all(
        images.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();

          return {
            filename: file.name,
            content: bufferToBase64(arrayBuffer)
          };
        })
      );

      const elevatorText =
        values.property_type === 'byt'
          ? `Výtah v domě: ${elevatorLabel}`
          : 'Výtah v domě: nerelevantní';

      const adminEmail = await resend.emails.send({
        from: 'Nejlepší odhad <noreply@nejlepsiodhadnemovitosti.cz>',
        to: ['info@nejlepsiodhadnemovitosti.cz'],
        replyTo: values.email || 'info@nejlepsiodhadnemovitosti.cz',
        subject: `Nová poptávka po odhadu: ${propertyTypeLabel} - ${values.city}`,
        html: createAdminEmailHtml({
          propertyTypeLabel,
          purposeLabel,
          conditionLabel,
          elevatorLabel,
          values,
          imageCount: images.length
        }),
        text: `Nová poptávka po ocenění nemovitosti z webu:

ZÁKLADNÍ ÚDAJE:
Typ nemovitosti: ${propertyTypeLabel}
Účel odhadu: ${purposeLabel}

LOKALITA A PARAMETRY:
Adresa / lokalita: ${values.city}
Užitná plocha: ${values.area_m2} m²
Dispozice / typ: ${values.disposition}
Stav: ${conditionLabel}
${elevatorText}

KONTAKTNÍ ÚDAJE:
Jméno: ${values.full_name}
E-mail: ${values.email}
Telefon: ${values.phone}

POZNÁMKA KLIENTA:
${values.note || 'Bez poznámky'}

FOTOGRAFIE:
Počet přiložených fotografií: ${images.length}

SOUHLAS GDPR:
${values.consent ? 'Ano' : 'Ne'}
`,
        attachments
      });

      const customerEmail = await resend.emails.send({
        from: 'Nejlepší odhad <noreply@nejlepsiodhadnemovitosti.cz>',
        to: [values.email],
        replyTo: 'info@nejlepsiodhadnemovitosti.cz',
        subject: 'Vaši poptávku jsme přijali',
        html: createCustomerEmailHtml({
          propertyTypeLabel,
          purposeLabel,
          values
        }),
        text: `Dobrý den, ${values.full_name},

děkujeme za zaslání poptávky. Vaše údaje jsme přijali a brzy se vám ozveme s dalším postupem.

Shrnutí poptávky:
Nemovitost: ${propertyTypeLabel}
Lokalita: ${values.city}
Účel: ${purposeLabel}

Nejlepší odhad nemovitosti
`
      });

      const adminEmailSent = !adminEmail.error;
      const customerEmailSent = !customerEmail.error;
      const emailError = adminEmail.error?.message || customerEmail.error?.message || null;

      await supabaseAdmin
        .from('leads')
        .update({
          admin_email_sent: adminEmailSent,
          customer_email_sent: customerEmailSent,
          email_error: emailError
        })
        .eq('id', lead.id);

      if (adminEmail.error) {
        return fail(500, {
          success: false,
          message: `Poptávka byla uložena, ale e-mail administrátorovi se nepodařilo odeslat: ${adminEmail.error.message}`,
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

      await supabaseAdmin
        .from('leads')
        .update({
          admin_email_sent: false,
          customer_email_sent: false,
          email_error: message
        })
        .eq('id', lead.id);

      return fail(500, {
        success: false,
        message: `Poptávka byla uložena, ale odeslání e-mailu se nezdařilo: ${message}`,
        errors: {},
        values
      });
    }
  }
};