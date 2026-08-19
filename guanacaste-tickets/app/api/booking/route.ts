import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getTransporter } from '@/lib/email/transporter';
import { buildAdminHtml, buildPendingCustomerHtml } from '@/lib/email/templates';
import { bookingToDb } from '@/lib/bookings/db';
import type { BookingSummary } from '@/types/index';

export async function POST(request: Request) {
  try {
    const summary: BookingSummary = await request.json();

    if (!summary.customerName || !summary.customerEmail || !summary.items?.length) {
      return NextResponse.json({ error: 'Missing booking data' }, { status: 400 });
    }

    const { data: booking, error: insertError } = await supabaseAdmin
      .from('bookings')
      .insert(bookingToDb(summary))
      .select('id')
      .single();

    if (insertError) {
      console.error('Booking insert error:', insertError);
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
    }

    const transporter = getTransporter();
    const tourNames = summary.items.map((i) => i.tourTitle).join(', ');

    await Promise.all([
      transporter.sendMail({
        from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: summary.customerEmail,
        subject: `Nueva reserva: ${tourNames}`,
        html: buildAdminHtml(summary, booking.id),
      }),
      transporter.sendMail({
        from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
        to: summary.customerEmail,
        subject: 'Your booking request — Guanacaste Tickets',
        html: buildPendingCustomerHtml(summary),
      }),
    ]);

    return NextResponse.json({ ok: true, id: booking.id });
  } catch (err) {
    console.error('Booking email error:', err);
    return NextResponse.json({ error: 'Failed to send booking email' }, { status: 500 });
  }
}
