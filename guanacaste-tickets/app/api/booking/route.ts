import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { BookingSummary } from '@/types/index';

function buildAdminHtml(summary: BookingSummary): string {
  const rows = summary.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.tourTitle}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.date}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.adults}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.children}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">$${item.subtotal.toFixed(2)}</td>
        </tr>`
    )
    .join('');

  return `
    <h2 style="color:#0077B6">Nueva reserva — Guanacaste Tickets</h2>
    <p><strong>Cliente:</strong> ${summary.customerName}</p>
    <p><strong>Email:</strong> <a href="mailto:${summary.customerEmail}">${summary.customerEmail}</a></p>
    <table style="border-collapse:collapse;width:100%;margin-top:16px;font-size:14px">
      <thead>
        <tr style="background:#f3f4f6">
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Tour</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Fecha</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Adultos</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Niños</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:12px;font-size:16px"><strong>Total: $${summary.grandTotal.toFixed(2)} USD</strong></p>
    <p style="color:#6b7280;font-size:13px">Responde a este correo para contactar directamente al cliente.</p>
  `;
}

function buildCustomerHtml(summary: BookingSummary): string {
  const rows = summary.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.tourTitle}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.date}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.adults} adult${item.adults !== 1 ? 's' : ''}${item.children > 0 ? ` / ${item.children} child${item.children !== 1 ? 'ren' : ''}` : ''}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">$${item.subtotal.toFixed(2)}</td>
        </tr>`
    )
    .join('');

  return `
    <h2 style="color:#0077B6">Your booking is pending confirmation</h2>
    <p>Hi ${summary.customerName},</p>
    <p>We received your booking request. Our team will contact you shortly to confirm availability and payment details.</p>
    <table style="border-collapse:collapse;width:100%;margin-top:16px;font-size:14px">
      <thead>
        <tr style="background:#f3f4f6">
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Tour</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Date</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Participants</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:12px;font-size:16px"><strong>Total: $${summary.grandTotal.toFixed(2)} USD</strong></p>
    <p>If you have any questions, reply to this email or reach us on WhatsApp.</p>
    <p style="color:#6b7280;font-size:13px">— Guanacaste Tickets Team</p>
  `;
}

export async function POST(request: Request) {
  try {
    const summary: BookingSummary = await request.json();

    if (!summary.customerName || !summary.customerEmail || !summary.items?.length) {
      return NextResponse.json({ error: 'Missing booking data' }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing SMTP_USER or SMTP_PASS environment variables');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const tourNames = summary.items.map((i) => i.tourTitle).join(', ');

    await Promise.all([
      transporter.sendMail({
        from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: summary.customerEmail,
        subject: `Nueva reserva: ${tourNames}`,
        html: buildAdminHtml(summary),
      }),
      transporter.sendMail({
        from: `"Guanacaste Tickets" <${process.env.SMTP_USER}>`,
        to: summary.customerEmail,
        subject: 'Your booking request — Guanacaste Tickets',
        html: buildCustomerHtml(summary),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Booking email error:', err);
    return NextResponse.json({ error: 'Failed to send booking email' }, { status: 500 });
  }
}
