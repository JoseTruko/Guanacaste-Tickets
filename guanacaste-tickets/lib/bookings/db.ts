import type { Booking, BookingSummary } from '@/types/index';

export function bookingToDb(summary: BookingSummary) {
  return {
    status: 'pending',
    customer_name: summary.customerName,
    customer_first_name: summary.customerFirstName,
    customer_last_name: summary.customerLastName,
    customer_email: summary.customerEmail,
    customer_phone: summary.customerPhone,
    customer_language: summary.customerLanguage,
    items: summary.items,
    grand_total: summary.grandTotal,
    currency: summary.currency,
    gclid: summary.gclid,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbToBooking(r: any): Booking {
  return {
    id: r.id,
    status: r.status,
    createdAt: r.created_at,
    items: r.items,
    grandTotal: r.grand_total,
    currency: r.currency,
    customerName: r.customer_name,
    customerFirstName: r.customer_first_name,
    customerLastName: r.customer_last_name,
    customerEmail: r.customer_email,
    customerPhone: r.customer_phone,
    customerLanguage: r.customer_language,
    gclid: r.gclid,
    paymentLink: r.payment_link,
    adminComment: r.admin_comment,
    confirmedAt: r.confirmed_at,
    confirmedBy: r.confirmed_by,
    cancelledReason: r.cancelled_reason,
  };
}

export function bookingToSummary(b: Booking): BookingSummary {
  return {
    items: b.items,
    grandTotal: b.grandTotal,
    currency: b.currency,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerFirstName: b.customerFirstName,
    customerLastName: b.customerLastName,
    customerPhone: b.customerPhone,
    customerLanguage: b.customerLanguage,
    gclid: b.gclid,
  };
}
