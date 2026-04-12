import { z } from 'zod';

export const leadSchema = z.object({
  property_type: z.enum(['byt', 'dum', 'pozemek', 'komercni']),
  purpose: z.enum(['prodej', 'pronajem', 'odhad']),
  city: z.string().min(2, 'Vyplňte město'),
  area_m2: z.number().positive('Plocha musí být větší než 0').nullable(),
  disposition: z.string().optional(),
  condition: z
    .enum(['novostavba', 'po_rekonstrukci', 'dobry_stav', 'puvodni_stav'])
    .optional(),
  full_name: z.string().min(2, 'Vyplňte jméno a příjmení'),
  email: z.string().email('Zadejte platný e-mail'),
  phone: z.string().min(9, 'Zadejte platný telefon'),
  note: z.string().optional(),
  consent: z.literal(true, {
    error: 'Musíte souhlasit se zpracováním údajů'
  })
});

export type LeadInput = z.infer<typeof leadSchema>;