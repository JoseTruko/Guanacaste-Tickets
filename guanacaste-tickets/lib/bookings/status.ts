import type { Booking, BookingStatus } from '@/types/index';

// Bookings are only ever persisted as pending/confirmed/cancelled — "completed"
// is derived at read time from whether the latest item date has passed, so we
// don't need a cron job to flip the status in the database.
export function effectiveStatus(booking: Booking): BookingStatus {
  if (booking.status !== 'confirmed') return booking.status;

  const latestDate = booking.items.reduce(
    (latest, item) => (item.date > latest ? item.date : latest),
    booking.items[0]?.date ?? ''
  );
  const today = new Date().toISOString().slice(0, 10);

  return latestDate && latestDate < today ? 'completed' : 'confirmed';
}
