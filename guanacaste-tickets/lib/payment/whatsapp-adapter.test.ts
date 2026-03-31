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
  ...overrides,
});

describe('WhatsAppAdapter', () => {
  it('returns success with a whatsappUrl', async () => {
    const adapter = new WhatsAppAdapter('50688887777');
    const result = await adapter.processBooking(makeSummary());

    expect(result.success).toBe(true);
    expect(result.whatsappUrl).toBeDefined();
    expect(result.whatsappUrl).toMatch(/^https:\/\/wa\.me\/50688887777\?text=/);
  });

  it('encodes the phone number in the URL', async () => {
    const adapter = new WhatsAppAdapter('1234567890');
    const result = await adapter.processBooking(makeSummary());

    expect(result.whatsappUrl).toContain('wa.me/1234567890');
  });

  it('includes tour title in the message', async () => {
    const adapter = new WhatsAppAdapter('50688887777');
    const result = await adapter.processBooking(makeSummary());

    const decoded = decodeURIComponent(result.whatsappUrl!);
    expect(decoded).toContain('Rincon de la Vieja Hike');
  });

  it('includes grand total in the message', async () => {
    const adapter = new WhatsAppAdapter('50688887777');
    const result = await adapter.processBooking(makeSummary());

    const decoded = decodeURIComponent(result.whatsappUrl!);
    expect(decoded).toContain('200.00 USD');
  });

  it('includes adults and children counts', async () => {
    const adapter = new WhatsAppAdapter('50688887777');
    const result = await adapter.processBooking(makeSummary());

    const decoded = decodeURIComponent(result.whatsappUrl!);
    expect(decoded).toContain('Adults: 2');
    expect(decoded).toContain('Children: 1');
  });

  it('handles multiple items in the summary', async () => {
    const adapter = new WhatsAppAdapter('50688887777');
    const summary = makeSummary({
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
    });

    const result = await adapter.processBooking(summary);
    const decoded = decodeURIComponent(result.whatsappUrl!);

    expect(decoded).toContain('Tour A');
    expect(decoded).toContain('Tour B');
    expect(decoded).toContain('190.00 USD');
  });
});
