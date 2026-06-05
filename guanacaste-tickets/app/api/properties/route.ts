import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase/client';
import type { Property } from '@/types/index';

export async function GET() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body: Property = await req.json();
  const slug = body.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  const { data, error } = await supabaseAdmin
    .from('properties')
    .insert(propertyToDb({ ...body, slug }))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

function isAdmin(req: Request) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export function propertyToDb(p: Property) {
  const payload: Record<string, unknown> = {
    id: p.id || `prop-${Date.now()}`,
    slug: p.slug,
    title: p.title,
    short_description: p.shortDescription,
    description: p.description,
    location: p.location,
    price: p.price,
    currency: p.currency,
    property_type: p.propertyType,
    status: p.status,
    built_area: p.builtArea,
    land_area: p.landArea,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.parking,
    year_built: p.yearBuilt,
    amenities: p.amenities,
    image: p.image,
    images: p.images,
    video_url: p.videoUrl,
    floor_plan_url: p.floorPlanUrl,
    contact_url: p.contactUrl,
    external_url: p.externalUrl,
  };
  if (p.id) payload.id = p.id;
  return payload;
}
