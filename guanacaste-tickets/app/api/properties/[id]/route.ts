import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import type { Property } from '@/types/index';

type Params = { params: Promise<{ id: string }> };

function isAdmin(req: Request) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function PUT(req: Request, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body: Property = await req.json();

  const { data, error } = await supabaseAdmin
    .from('properties')
    .update({ title: body.title, location: body.location, price: body.price, image: body.image, contact_url: body.contactUrl })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from('properties').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
