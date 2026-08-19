import type { Booking, BookingStatus } from '@/types/index';
import { effectiveStatus } from './status';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function statusCounts(bookings: Booking[]): Record<BookingStatus, number> {
  const counts: Record<BookingStatus, number> = { pending: 0, confirmed: 0, cancelled: 0, completed: 0 };
  for (const b of bookings) counts[effectiveStatus(b)]++;
  return counts;
}

export function confirmedRevenueThisMonth(bookings: Booking[]): number {
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

  return bookings
    .filter((b) => {
      const status = effectiveStatus(b);
      return (status === 'confirmed' || status === 'completed') && b.confirmedAt && b.confirmedAt.slice(0, 10) >= monthStart;
    })
    .reduce((sum, b) => sum + b.grandTotal, 0);
}

export function confirmedCountThisMonth(bookings: Booking[]): number {
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

  return bookings.filter((b) => {
    const status = effectiveStatus(b);
    return (status === 'confirmed' || status === 'completed') && b.confirmedAt && b.confirmedAt.slice(0, 10) >= monthStart;
  }).length;
}

export function toursNext7Days(bookings: Booking[]): number {
  const today = todayISO();
  const in7 = daysAgoISO(-7);

  let count = 0;
  for (const b of bookings) {
    const status = effectiveStatus(b);
    if (status !== 'confirmed') continue;
    for (const item of b.items) {
      if (item.date >= today && item.date <= in7) count++;
    }
  }
  return count;
}

export function bookingsPerDay(bookings: Booking[], days = 30): { date: string; count: number }[] {
  const start = daysAgoISO(days - 1);
  const buckets = new Map<string, number>();
  for (let i = 0; i < days; i++) buckets.set(daysAgoISO(days - 1 - i), 0);

  for (const b of bookings) {
    const day = b.createdAt.slice(0, 10);
    if (day >= start && buckets.has(day)) buckets.set(day, (buckets.get(day) ?? 0) + 1);
  }

  return Array.from(buckets.entries()).map(([date, count]) => ({ date, count }));
}

export function revenueByTour(bookings: Booking[], limit = 5): { tour: string; revenue: number }[] {
  const totals = new Map<string, number>();

  for (const b of bookings) {
    const status = effectiveStatus(b);
    if (status !== 'confirmed' && status !== 'completed') continue;
    for (const item of b.items) {
      totals.set(item.tourTitle, (totals.get(item.tourTitle) ?? 0) + item.subtotal);
    }
  }

  return Array.from(totals.entries())
    .map(([tour, revenue]) => ({ tour, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}
