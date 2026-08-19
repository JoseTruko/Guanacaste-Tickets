import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getStaffUser } from '@/lib/supabase/server';
import { getAllTours } from '@/lib/data/tours';

// One-time seed endpoint — call once then delete or disable
export async function POST() {
  if (!(await getStaffUser())) {
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
    max_group_size: t.minGroupSize,
    pricing_brackets: t.pricingBrackets,
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

  let { error: toursError } = await supabaseAdmin
    .from('tours')
    .upsert(tours, { onConflict: 'id' });

  if (toursError && typeof toursError.message === 'string' && toursError.message.includes('pricing_brackets')) {
    const toursWithoutBrackets = tours.map(({ pricing_brackets, ...rest }) => rest);
    ({ error: toursError } = await supabaseAdmin.from('tours').upsert(toursWithoutBrackets, { onConflict: 'id' }));
  }

  if (toursError) {
    return NextResponse.json({ toursError }, { status: 500 });
  }

  return NextResponse.json({ success: true, tours: tours.length });
}
