import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    // 1. Získáme data z formuláře
    const data = await request.formData();
    
    const property_type = data.get('property_type')?.toString();
    const purpose = data.get('purpose')?.toString();
    const city = data.get('city')?.toString();
    const area_m2 = data.get('area_m2')?.toString();
    const disposition = data.get('disposition')?.toString();
    const condition = data.get('condition')?.toString();
    const full_name = data.get('full_name')?.toString();
    const email = data.get('email')?.toString();
    const phone = data.get('phone')?.toString();
    const note = data.get('note')?.toString();
    
    // Získáme všechny nahrané soubory
    const images = data.getAll('images') as File[];

    // 2. Základní backend validace
    if (!full_name || !email || !city || !area_m2) {
      return fail(400, {
        message: 'Chybí některé povinné údaje.',
        values: Object.fromEntries(data) 
      });
    }

    try {
      // 3. Připrava příloh (převod z File na Buffer pro nodemailer)
      const attachments = await Promise.all(
        images
          .filter(file => file.size > 0 && file.name !== 'undefined' && file.name !== '')
          .map(async (file) => ({
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()),
            contentType: file.type
          }))
      );

      // 4. Nastavení SMTP transportéru (přihlašovací údaje z .env)
      const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT) || 465,
        secure: true, // true pro port 465 (SSL), false pro 587 (TLS)
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS
        }
      });

      // 5. Sestavení samotného e-mailu
      const mailOptions = {
        from: `"Odhad Nemovitosti" <${env.SMTP_USER}>`, 
        to: 'info@nejlepsiodhad.cz',
        replyTo: email,
        subject: `Nová poptávka po odhadu: ${property_type?.toUpperCase()} - ${city}`,
        text: `Nová poptávka po ocenění nemovitosti z webu:

ZÁKLADNÍ ÚDAJE:
Typ: ${property_type}
Účel: ${purpose}

LOKALITA A PARAMETRY:
Adresa: ${city}
Užitná plocha: ${area_m2} m²
Dispozice: ${disposition}
Stav: ${condition || 'Neuvedeno'}

KONTAKTNÍ ÚDAJE:
Jméno: ${full_name}
E-mail: ${email}
Telefon: ${phone}

POZNÁMKA KLIENTA:
${note || 'Bez poznámky'}`,
        attachments
      };

      // 6. Odeslání
      await transporter.sendMail(mailOptions);

      // 7. Úspěšná odpověď pro frontend (zobrazí se zelený banner)
      return { success: true };

    } catch (error) {
      console.error('Chyba při odesílání e-mailu:', error);
      return fail(500, {
        message: 'Omlouváme se, formulář se nepodařilo odeslat. Zkuste to prosím za chvíli.',
        values: Object.fromEntries(data)
      });
    }
  }
} satisfies Actions;