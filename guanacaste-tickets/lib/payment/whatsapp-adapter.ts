import type { PaymentAdapter, BookingSummary, BookingResult } from './types';

export class WhatsAppAdapter implements PaymentAdapter {
  constructor(private readonly phoneNumber: string) {}

  async processBooking(summary: BookingSummary): Promise<BookingResult> {
    try {
      const lines: string[] = [
        '🌴 New Tour Booking Request — Guanacaste Tickets',
        '',
      ];

      for (const item of summary.items) {
        lines.push(`Tour: ${item.tourTitle}`);
        lines.push(`Date: ${item.date}`);
        lines.push(`Adults: ${item.adults}`);
        lines.push(`Children: ${item.children}`);
        lines.push(`Subtotal: $${item.subtotal.toFixed(2)} USD`);
        lines.push('');
      }

      lines.push(`Grand Total: $${summary.grandTotal.toFixed(2)} USD`);
      lines.push('');
      lines.push('Please confirm availability and payment details.');

      const message = lines.join('\n');
      const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(url, '_blank');
      return { success: true, message: 'Booking request sent via WhatsApp' };
    } catch (err) {
      const error = err as Error;
      return { success: false, message: error.message };
    }
  }
}
