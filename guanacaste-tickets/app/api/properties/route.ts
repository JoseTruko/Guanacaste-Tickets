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
  const { data, error } = await supabaseAdmin
    .from('properties')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

function isAdmin(req: Request) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}
