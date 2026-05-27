import { describe, it, expect } from 'vitest';
import { WhatsAppAdapter } from './whatsapp-adapter';
import type { BookingSummary } from './types';

const makeSummary = (overrides?: Partial<BookingSummary>): BookingSummary => ({
  items: [
    {
      tourId: 'tour-1',
      tourTitle: 'Rincon de la Vieja Hike',
      tourSlug: 'rincon-hike',
      date: '2025-08-15',
      adults: 2,
      children: 1,
      adultPrice: 80,
      childPrice: 40,
      subtotal: 200,
    },
  ],
  grandTotal: 200,
  currency: 'USD',
  customerName: 'Jane Doe',
  customerEmail: 'jane@example.com',
  ...overrides,
});

describe('WhatsAppAdapter', () => {
  it('returns success', async () => {
    const adapter = new WhatsAppAdapter('50688887777');
    const result = await adapter.processBooking(makeSummary());
    expect(result.success).toBe(true);
  });

  it('handles multiple items', async () => {
    const adapter = new WhatsAppAdapter('50688887777');
    const result = await adapter.processBooking(
      makeSummary({
        items: [
          {
            tourId: 'tour-1',
            tourTitle: 'Tour A',
            tourSlug: 'tour-a',
            date: '2025-08-15',
            adults: 2,
            children: 0,
            adultPrice: 50,
            childPrice: 25,
            subtotal: 100,
          },
          {
            tourId: 'tour-2',
            tourTitle: 'Tour B',
            tourSlug: 'tour-b',
            date: '2025-08-16',
            adults: 1,
            children: 1,
            adultPrice: 60,
            childPrice: 30,
            subtotal: 90,
          },
        ],
        grandTotal: 190,
      })
    );
    expect(result.success).toBe(true);
  });
});
