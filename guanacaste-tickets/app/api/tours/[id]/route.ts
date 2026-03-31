import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { dbToTour } from '../route';
import type { Tour } from '@/types/index';

type Params = { params: Promise<{ id: string }> };

function isAdmin(req: Request) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function PUT(req: Request, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body: Tour = await req.json();

  const { data, error } = await supabaseAdmin
    .from('tours')
    .update({
      slug: body.slug,
      title: body.title,
      description: body.description,
      short_description: body.shortDescription,
      price: body.price,
      child_price: body.childPrice,
      duration: body.duration,
      category: body.category,
      difficulty: body.difficulty,
      languages: body.languages,
      max_group_size: body.maxGroupSize,
      images: body.images,
      featured: body.featured,
      included: body.included,
      not_included: body.notIncluded,
      meeting_point: body.meetingPoint,
      what_to_bring: body.whatToBring,
      faqs: body.faqs,
      cancellation_policy: body.cancellationPolicy,
      agency_id: body.agencyId,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(dbToTour(data));
}

export async function DELETE(req: Request, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from('tours').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
