import { SITE_URL } from '@/lib/config';
import type { BookingSummary } from '@/types/index';

function itemsRows(summary: BookingSummary, opts: { showChildren: boolean }): string {
  return summary.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.tourTitle}${item.transportZone ? `<br/><span style="color:#6b7280;font-size:12px">${opts.showChildren ? 'Transporte' : 'Transport'}: ${item.transportZone.name}</span>` : ''}</td>
          <td style="padding:8px;border:1px solid #e5e7eb">${item.date}</td>
          ${
            opts.showChildren
              ? `<td style="padding:8px;border:1px solid #e5e7eb">${item.adults}</td><td style="padding:8px;border:1px solid #e5e7eb">${item.children}</td>`
              : `<td style="padding:8px;border:1px solid #e5e7eb">${item.adults} adult${item.adults !== 1 ? 's' : ''}${item.children > 0 ? ` / ${item.children} child${item.children !== 1 ? 'ren' : ''}` : ''}</td>`
          }
          <td style="padding:8px;border:1px solid #e5e7eb">$${item.subtotal.toFixed(2)}</td>
        </tr>`
    )
    .join('');
}

function itemsTable(summary: BookingSummary, opts: { showChildren: boolean }): string {
  const headers = opts.showChildren
    ? ['Tour', 'Fecha', 'Adultos', 'Niños', 'Subtotal']
    : ['Tour', 'Date', 'Participants', 'Subtotal'];

  return `
    <table style="border-collapse:collapse;width:100%;margin-top:16px;font-size:14px">
      <thead>
        <tr style="background:#f3f4f6">
          ${headers.map((h) => `<th style="padding:8px;border:1px solid #e5e7eb;text-align:left">${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>${itemsRows(summary, opts)}</tbody>
    </table>
    <p style="margin-top:12px;font-size:16px"><strong>Total: $${summary.grandTotal.toFixed(2)} USD</strong></p>`;
}

export function buildAdminHtml(summary: BookingSummary, bookingId: string): string {
  return `
    <h2 style="color:#1B6B3A">Nueva reserva — Guanacaste Tickets</h2>
    <p><strong>Cliente:</strong> ${summary.customerName}</p>
    <p><strong>Email:</strong> <a href="mailto:${summary.customerEmail}">${summary.customerEmail}</a></p>
    ${summary.customerPhone ? `<p><strong>Teléfono:</strong> ${summary.customerPhone}</p>` : ''}
    ${summary.customerLanguage ? `<p><strong>Idioma:</strong> ${summary.customerLanguage}</p>` : ''}
    ${summary.gclid ? `<p><strong>Origen:</strong> Google Ads (gclid: ${summary.gclid})</p>` : ''}
    ${itemsTable(summary, { showChildren: true })}
    <p style="margin-top:16px"><a href="${SITE_URL}/admin/bookings?open=${bookingId}" style="color:#1B6B3A">Ver y confirmar esta reserva →</a></p>
    <p style="color:#6b7280;font-size:13px">Responde a este correo para contactar directamente al cliente.</p>
  `;
}

export function buildPendingCustomerHtml(summary: BookingSummary): string {
  return `
    <h2 style="color:#1B6B3A">Your booking is pending confirmation</h2>
    <p>Hi ${summary.customerName},</p>
    <p>We received your booking request. Our team will contact you shortly to confirm availability and payment details.</p>
    ${itemsTable(summary, { showChildren: false })}
    <p>If you have any questions, reply to this email or reach us on WhatsApp.</p>
    <p style="color:#6b7280;font-size:13px">— Guanacaste Tickets Team</p>
  `;
}

export function buildConfirmedHtml(summary: BookingSummary, opts: { paymentLink?: string; comment?: string }): string {
  return `
    <h2 style="color:#1B6B3A">Your booking is confirmed! 🎉</h2>
    <p>Hi ${summary.customerName},</p>
    <p>Great news — your booking has been confirmed.</p>
    ${itemsTable(summary, { showChildren: false })}
    ${opts.paymentLink ? `<p style="margin-top:16px"><a href="${opts.paymentLink}" style="background:#1B6B3A;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block">Complete your payment</a></p>` : ''}
    ${opts.comment ? `<p style="margin-top:16px;padding:12px;background:#F0F7F3;border-radius:8px">${opts.comment}</p>` : ''}
    <p style="margin-top:16px">If you have any questions, reply to this email or reach us on WhatsApp.</p>
    <p style="color:#6b7280;font-size:13px">— Guanacaste Tickets Team</p>
  `;
}

export function buildCancelledHtml(summary: BookingSummary, reason?: string): string {
  return `
    <h2 style="color:#1B6B3A">Your booking was cancelled</h2>
    <p>Hi ${summary.customerName},</p>
    <p>Unfortunately, your booking request could not be confirmed.</p>
    ${reason ? `<p style="margin-top:12px;padding:12px;background:#F0F7F3;border-radius:8px">${reason}</p>` : ''}
    <p style="margin-top:16px">If you have any questions, reply to this email or reach us on WhatsApp.</p>
    <p style="color:#6b7280;font-size:13px">— Guanacaste Tickets Team</p>
  `;
}
