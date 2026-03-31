import type { BookingItem } from '@/types/index';

/**
 * Calculates the subtotal for a booking line item.
 */
export function calculateSubtotal(
  adults: number,
  children: number,
  adultPrice: number,
  childPrice: number,
): number {
  return adults * adultPrice + children * childPrice;
}

/** Alias for calculateSubtotal */
export const calculateTotalPrice = calculateSubtotal;

/**
 * Sums the subtotals of all items in the cart.
 */
export function calculateGrandTotal(items: BookingItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}
