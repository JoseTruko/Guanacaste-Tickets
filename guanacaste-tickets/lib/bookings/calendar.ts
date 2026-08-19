import type { Booking, BookingItem } from '@/types/index';
import { effectiveStatus } from './status';

export type CalendarEntry = { booking: Booking; item: BookingItem };

export function scheduledItemsByDate(bookings: Booking[]): Map<string, CalendarEntry[]> {
  const map = new Map<string, CalendarEntry[]>();

  for (const booking of bookings) {
    const status = effectiveStatus(booking);
    if (status !== 'confirmed' && status !== 'completed') continue;

    for (const item of booking.items) {
      const list = map.get(item.date) ?? [];
      list.push({ booking, item });
      map.set(item.date, list);
    }
  }

  return map;
}
