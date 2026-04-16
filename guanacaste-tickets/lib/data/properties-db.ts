import { supabase } from '@/lib/supabase/client';
import type { Property } from '@/types/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToProperty(p: any): Property {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    shortDescription: p.short_description,
    description: p.description,
    location: p.location,
    price: p.price,
    currency: p.currency,
    propertyType: p.property_type,
    status: p.status,
    builtArea: p.built_area,
    landArea: p.land_area,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.parking,
    yearBuilt: p.year_built,
    amenities: p.amenities ?? [],
    image: p.image,
    images: p.images ?? [],
    videoUrl: p.video_url,
    floorPlanUrl: p.floor_plan_url,
    contactUrl: p.contact_url,
  };
}

export async function getAllPropertiesFromDB(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(dbToProperty);
}

export async function getPropertyByIdFromDB(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return dbToProperty(data);
}

export { dbToProperty };
