'use server';

import { revalidatePath } from 'next/cache';
import { createClient, getStaffUser } from '@/lib/supabase/server';
import { getTransporter } from '@/lib/email/transporter';
import { buildConfirmedHtml, buildCancelledHtml } from '@/lib/email/templates';
import { dbToBooking, bookingToSummary } from '@/lib/bookings/db';

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
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
    to: booking.customerEmail,
    subject: 'Your booking is confirmed — Guanacaste Tickets',
    html: buildConfirmedHtml(bookingToSummary(booking), { paymentLink: input.paymentLink, comment: input.comment }),
  });

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
