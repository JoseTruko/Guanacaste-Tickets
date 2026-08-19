import { fetchAllBookings } from '@/lib/bookings/queries';
import { getStaffUser } from '@/lib/supabase/server';
import BookingsView from '@/components/admin/bookings/BookingsView';

export default async function AdminBookingsPage() {
  const [bookings, staff] = await Promise.all([fetchAllBookings(), getStaffUser()]);
  return <BookingsView bookings={bookings} isAdmin={staff?.role === 'admin'} />;
}
