export type PropertyType = 'byt' | 'dum' | 'pozemek' | 'komercni';
export type PurposeType = 'prodej' | 'pronajem' | 'odhad';
export type ConditionType =
  | 'novostavba'
  | 'po_rekonstrukci'
  | 'dobry_stav'
  | 'puvodni_stav';

export interface LeadFormData {
  property_type: PropertyType;
  purpose: PurposeType;
  city: string;
  area_m2: number | null;
  disposition: string;
  condition: ConditionType | '';
  full_name: string;
  email: string;
  phone: string;
  note: string;
  consent: boolean;
}