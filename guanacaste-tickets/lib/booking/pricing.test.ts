import { describe, it, expect } from 'vitest';
import { calculateSubtotal, calculateTotalPrice, calculateGrandTotal } from './pricing';
import type { BookingItem } from '@/types/index';

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
