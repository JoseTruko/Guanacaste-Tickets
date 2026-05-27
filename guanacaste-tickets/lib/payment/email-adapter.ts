import type { PaymentAdapter, BookingSummary, BookingResult } from './types';

export class EmailAdapter implements PaymentAdapter {
  async processBooking(summary: BookingSummary): Promise<BookingResult> {
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(summary),
      });
      if (!res.ok) throw new Error('Server error');
      return { success: true, message: 'Booking request sent! Check your email for confirmation.' };
    } catch (err) {
      const error = err as Error;
      return { success: false, message: error.message };
    }
  }
}
