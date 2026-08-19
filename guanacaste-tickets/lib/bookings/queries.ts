import { supabaseAdmin } from '@/lib/supabase/client';
import { dbToBooking } from './db';
import type { Booking } from '@/types/index';

export async function fetchAllBookings(): Promise<Booking[]> {
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(dbToBooking);
}

export async function fetchBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabaseAdmin.from('bookings').select('*').eq('id', id).single();
  if (error || !data) return null;
  return dbToBooking(data);
}
