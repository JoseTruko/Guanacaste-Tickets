import { fetchAllBookings } from '@/lib/bookings/queries';
import BookingsView from '@/components/admin/bookings/BookingsView';

export default async function AdminBookingsPage() {
  const bookings = await fetchAllBookings();
  return <BookingsView bookings={bookings} />;
}
