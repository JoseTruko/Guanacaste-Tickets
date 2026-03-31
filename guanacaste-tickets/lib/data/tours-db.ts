import { supabase } from '@/lib/supabase/client';
import { dbToTour } from '@/app/api/tours/route';
import type { Tour } from '@/types/index';

export async function getAllToursFromDB(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(dbToTour);
}

export async function getTourBySlugFromDB(slug: string): Promise<Tour | null> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return dbToTour(data);
}

export async function getFeaturedToursFromDB(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(dbToTour);
}
