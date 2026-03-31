import { supabase } from '@/lib/supabase/client';
import type { Property } from '@/types/index';

export async function getAllPropertiesFromDB(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    price: p.price,
    currency: p.currency,
    image: p.image,
    contactUrl: p.contact_url,
  }));
}
