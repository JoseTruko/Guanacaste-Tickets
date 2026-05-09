import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase/client';
import { getAllTours } from '@/lib/data/tours';
import type { Tour } from '@/types/index';

export async function GET() {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return NextResponse.json(getAllTours());
  }
  return NextResponse.json(data.map(dbToTour));
}

export async function POST(req: Request) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from('tours')
    .insert(tourToDb(body))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(dbToTour(data), { status: 201 });
}

// ── helpers ──────────────────────────────────────────────────────────────────

function isAdmin(req: Request) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

function tourToDb(t: Tour) {
  return {
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
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbToTour(r: any): Tour {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    shortDescription: r.short_description,
    price: r.price,
    childPrice: r.child_price,
    currency: r.currency,
    duration: r.duration,
    category: r.category,
    difficulty: r.difficulty,
    languages: r.languages,
    minGroupSize: r.min_group_size,
    images: r.images,
    featured: r.featured,
    included: r.included,
    notIncluded: r.not_included,
    meetingPoint: r.meeting_point,
    whatToBring: r.what_to_bring,
    faqs: r.faqs,
    cancellationPolicy: r.cancellation_policy,
    agencyId: r.agency_id,
  };
}
