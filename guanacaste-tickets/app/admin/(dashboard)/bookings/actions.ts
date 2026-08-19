'use server';

import { revalidatePath } from 'next/cache';
import { createClient, getStaffUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getTransporter } from '@/lib/email/transporter';
import {
  buildConfirmedHtml,
  buildConfirmedAdminHtml,
  buildCancelledHtml,
  buildPendingCustomerHtml,
} from '@/lib/email/templates';
import { dbToBooking, bookingToSummary } from '@/lib/bookings/db';
import type { BookingItem } from '@/types/index';

type ActionResult = { ok: true } | { ok: false; error: string };

export async function confirmBooking(
  id: string,
  input: { paymentLink?: string; comment?: string }
): Promise<ActionResult> {
  const staff = await getStaffUser();
  if (!staff) return { ok: false, error: 'Unauthorized' };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
      payment_link: input.paymentLink || null,
      admin_comment: input.comment || null,
      confirmed_at: new Date().toISOString(),
      confirmed_by: staff.id,
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error || !data) return { ok: false, error: error?.message ?? 'Booking not found' };

  const booking = dbToBooking(data);
  const summary = bookingToSummary(booking);
  const transporter = getTransporter();
  await Promise.all([
    transporter.sendMail({
      from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
      to: booking.customerEmail,
      subject: 'Your booking is confirmed — Guanacaste Tickets',
      html: buildConfirmedHtml(summary, { paymentLink: input.paymentLink, comment: input.comment }),
    }),
    transporter.sendMail({
      from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Reserva confirmada: ${booking.customerName}`,
      html: buildConfirmedAdminHtml(summary, booking.id, { paymentLink: input.paymentLink, comment: input.comment }),
    }),
  ]);

  revalidatePath('/admin');
  revalidatePath('/admin/bookings');
  revalidatePath('/admin/calendar');
  return { ok: true };
}

export async function cancelBooking(id: string, input: { reason?: string }): Promise<ActionResult> {
  const staff = await getStaffUser();
  if (!staff) return { ok: false, error: 'Unauthorized' };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled', cancelled_reason: input.reason || null })
    .eq('id', id)
    .select('*')
    .single();

  if (error || !data) return { ok: false, error: error?.message ?? 'Booking not found' };

  const booking = dbToBooking(data);
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
    to: booking.customerEmail,
    subject: 'Your booking was cancelled — Guanacaste Tickets',
    html: buildCancelledHtml(bookingToSummary(booking), input.reason),
  });

  revalidatePath('/admin');
  revalidatePath('/admin/bookings');
  revalidatePath('/admin/calendar');
  return { ok: true };
}

export async function deleteBooking(id: string): Promise<ActionResult> {
  const staff = await getStaffUser();
  if (!staff || staff.role !== 'admin') return { ok: false, error: 'Unauthorized' };

  const { error } = await supabaseAdmin.from('bookings').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };

  revalidatePath('/admin');
  revalidatePath('/admin/bookings');
  revalidatePath('/admin/calendar');
  return { ok: true };
}

type ManualBookingInput = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerLanguage?: string;
  status: 'pending' | 'confirmed' | 'completed';
  items: BookingItem[];
};

export async function createManualBooking(input: ManualBookingInput): Promise<ActionResult> {
  const staff = await getStaffUser();
  if (!staff) return { ok: false, error: 'Unauthorized' };

  if (!input.customerName || !input.customerEmail || input.items.length === 0) {
    return { ok: false, error: 'Faltan datos del cliente o de los tours.' };
  }

  const grandTotal = input.items.reduce((sum, item) => sum + item.subtotal, 0);
  const isSettled = input.status === 'confirmed' || input.status === 'completed';

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      status: input.status,
      customer_name: input.customerName,
      customer_email: input.customerEmail,
      customer_phone: input.customerPhone || null,
      customer_language: input.customerLanguage || null,
      items: input.items,
      grand_total: grandTotal,
      currency: 'USD',
      confirmed_at: isSettled ? new Date().toISOString() : null,
      confirmed_by: isSettled ? staff.id : null,
    })
    .select('*')
    .single();

  if (error || !data) return { ok: false, error: error?.message ?? 'No se pudo crear la reserva' };

  if (input.status === 'pending') {
    const booking = dbToBooking(data);
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
      to: booking.customerEmail,
      subject: 'Your booking request — Guanacaste Tickets',
      html: buildPendingCustomerHtml(bookingToSummary(booking)),
    });
  }

  revalidatePath('/admin');
  revalidatePath('/admin/bookings');
  revalidatePath('/admin/calendar');
  return { ok: true };
}
