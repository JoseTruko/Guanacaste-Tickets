import type { BookingItem, Tour, TransportZone } from '@/types/index';

/**
 * Price values used for a booking line item.
 */
export interface UnitPrices {
  adultPrice: number;
  childPrice: number;
}

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

export function getTourPricing(tour: Tour, totalParticipants: number, zone?: TransportZone): UnitPrices {
  if (zone) {
    return { adultPrice: zone.pricePerPerson, childPrice: zone.pricePerPerson };
  }

  if (!tour.pricingBrackets?.length) {
    return { adultPrice: tour.price, childPrice: tour.childPrice };
  }

  const bracket = tour.pricingBrackets.find((priceBracket) => {
    const minMatch = totalParticipants >= priceBracket.minPeople;
    const maxMatch = priceBracket.maxPeople == null || totalParticipants <= priceBracket.maxPeople;
    return minMatch && maxMatch;
  });

  if (!bracket) {
    return { adultPrice: tour.price, childPrice: tour.childPrice };
  }

  return { adultPrice: bracket.adultPrice, childPrice: bracket.childPrice };
}

/**
 * Cheapest adult price across the base price and all pricing brackets.
 */
export function getFromPrice(tour: Tour): number {
  const prices = [tour.price, ...(tour.pricingBrackets?.map((bracket) => bracket.adultPrice) ?? [])];
  return Math.min(...prices);
}

export function calculateBookingTotal(tour: Tour, adults: number, children: number, zone?: TransportZone): number {
  const participants = adults + children;
  const pricing = getTourPricing(tour, participants, zone);
  return calculateSubtotal(adults, children, pricing.adultPrice, pricing.childPrice);
}

/**
 * Sums the subtotals of all items in the cart.
 */
export function calculateGrandTotal(items: BookingItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}
