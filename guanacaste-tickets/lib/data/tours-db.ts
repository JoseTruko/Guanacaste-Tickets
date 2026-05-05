import { supabase } from '@/lib/supabase/client';
import { dbToTour } from '@/app/api/tours/route';
import { getAllTours, getTourBySlug, getFeaturedTours } from '@/lib/data/tours';
import type { Tour } from '@/types/index';

export async function getAllToursFromDB(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data || data.length === 0) return getAllTours();
  return data.map(dbToTour);
}

export async function getTourBySlugFromDB(slug: string): Promise<Tour | null> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return getTourBySlug(slug) ?? null;
  return dbToTour(data);
}

export async function getFeaturedToursFromDB(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });
  if (error || !data || data.length === 0) return getFeaturedTours();
  return data.map(dbToTour);
}
