import { describe, it, expect } from 'vitest';
import { calculateSubtotal, calculateTotalPrice, calculateGrandTotal, getTourPricing, calculateBookingTotal, getFromPrice } from './pricing';
import type { BookingItem, Tour, TransportZone } from '@/types/index';

const makeItem = (adults: number, children: number, adultPrice: number, childPrice: number): BookingItem => ({
  tourId: 'tour-1',
  tourTitle: 'Test Tour',
  tourSlug: 'test-tour',
  date: '2025-01-01',
  adults,
  children,
  adultPrice,
  childPrice,
  subtotal: calculateSubtotal(adults, children, adultPrice, childPrice),
});

describe('calculateSubtotal', () => {
  it('calculates adults only', () => {
    expect(calculateSubtotal(2, 0, 50, 25)).toBe(100);
  });

  it('calculates children only', () => {
    expect(calculateSubtotal(0, 3, 50, 25)).toBe(75);
  });

  it('calculates mixed adults and children', () => {
    expect(calculateSubtotal(2, 2, 50, 25)).toBe(150);
  });

  it('returns 0 for zero quantities', () => {
    expect(calculateSubtotal(0, 0, 50, 25)).toBe(0);
  });

  it('calculateTotalPrice is an alias for calculateSubtotal', () => {
    expect(calculateTotalPrice(2, 2, 50, 25)).toBe(calculateSubtotal(2, 2, 50, 25));
  });
});

describe('calculateGrandTotal', () => {
  it('returns 0 for empty cart', () => {
    expect(calculateGrandTotal([])).toBe(0);
  });

  it('sums subtotals of all items', () => {
    const items: BookingItem[] = [
      makeItem(2, 0, 50, 25),  // subtotal = 100
      makeItem(1, 2, 60, 30),  // subtotal = 120
    ];
    expect(calculateGrandTotal(items)).toBe(220);
  });

  it('handles single item', () => {
    const items: BookingItem[] = [makeItem(3, 1, 40, 20)];
    expect(calculateGrandTotal(items)).toBe(140);
  });
});

describe('transport zone pricing', () => {
  const tour: Tour = {
    id: 'tour-1', slug: 'test-tour', title: 'Test Tour', description: '', shortDescription: '',
    price: 100, childPrice: 60, currency: 'USD', duration: 4, category: 'Adventure', difficulty: 'Easy',
    languages: [], minGroupSize: 1, images: [], featured: false, included: [], notIncluded: [],
    meetingPoint: '', whatToBring: [], faqs: [], cancellationPolicy: { description: '', freeCancellation: true },
  };
  const zone: TransportZone = {
    id: 'zone-1',
    name: 'Zone 1',
    description: 'Playas Hermosa, El Coco',
    pricePerPerson: 160,
    included: ['Round trip pickup'],
  };

  it('getTourPricing uses the base tour price when no zone is selected', () => {
    expect(getTourPricing(tour, 2)).toEqual({ adultPrice: 100, childPrice: 60 });
  });

  it('getTourPricing replaces the tour price with the zone price (not additive)', () => {
    expect(getTourPricing(tour, 2, zone)).toEqual({ adultPrice: 160, childPrice: 160 });
  });

  it('calculateBookingTotal uses the zone price for all participants, not tour price + zone price', () => {
    expect(calculateBookingTotal(tour, 2, 1, zone)).toBe(3 * 160);
  });

  it('getTourPricing uses a distinct child price when the zone defines one', () => {
    const zoneWithChildPrice: TransportZone = { ...zone, childPricePerPerson: 90 };
    expect(getTourPricing(tour, 3, zoneWithChildPrice)).toEqual({ adultPrice: 160, childPrice: 90 });
  });

  it('calculateBookingTotal applies the zone child price only to children', () => {
    const zoneWithChildPrice: TransportZone = { ...zone, childPricePerPerson: 90 };
    expect(calculateBookingTotal(tour, 2, 1, zoneWithChildPrice)).toBe(2 * 160 + 1 * 90);
  });

  it('getFromPrice ignores zones when transport is optional', () => {
    expect(getFromPrice({ ...tour, transportZones: [zone] })).toBe(100);
  });

  it('getFromPrice uses the cheapest zone when transport is required', () => {
    const cheaperZone: TransportZone = { ...zone, id: 'zone-2', pricePerPerson: 120 };
    expect(getFromPrice({ ...tour, transportRequired: true, transportZones: [zone, cheaperZone] })).toBe(120);
  });

  it('getFromPrice falls back to base price when transport is required but no zones exist', () => {
    expect(getFromPrice({ ...tour, transportRequired: true, transportZones: [] })).toBe(100);
  });
});
