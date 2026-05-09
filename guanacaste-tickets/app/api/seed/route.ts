import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getAllTours } from '@/lib/data/tours';
import { getAllProperties } from '@/lib/data/properties';

// One-time seed endpoint — call once then delete or disable
export async function POST(req: Request) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tours = getAllTours().map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    description: t.description,
    short_description: t.shortDescription,
    price: t.price,
    child_price: t.childPrice,
    currency: t.currency,
    duration: t.duration,
    category: t.category,
    difficulty: t.difficulty,
    languages: t.languages,
    min_group_size: t.minGroupSize,
    images: t.images,
    featured: t.featured,
    included: t.included,
    not_included: t.notIncluded,
    meeting_point: t.meetingPoint,
    what_to_bring: t.whatToBring,
    faqs: t.faqs,
    cancellation_policy: t.cancellationPolicy,
    agency_id: t.agencyId,
  }));

  const { error: toursError } = await supabaseAdmin
    .from('tours')
    .upsert(tours, { onConflict: 'id' });

  const properties = getAllProperties().map((p) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    price: p.price,
    currency: p.currency,
    image: p.image,
    contact_url: p.contactUrl,
  }));

  const { error: propsError } = await supabaseAdmin
    .from('properties')
    .upsert(properties, { onConflict: 'id' });

  if (toursError || propsError) {
    return NextResponse.json({ toursError, propsError }, { status: 500 });
  }

  return NextResponse.json({ success: true, tours: tours.length, properties: properties.length });
}
