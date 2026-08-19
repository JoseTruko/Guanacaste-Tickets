import { fetchAllBookings } from '@/lib/bookings/queries';
import BookingsCalendar from '@/components/admin/calendar/BookingsCalendar';

export default async function AdminCalendarPage() {
  const bookings = await fetchAllBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900">Calendario</h1>
        <p className="text-sm text-gray-500 mt-1">Tours confirmados por fecha.</p>
      </div>
      <BookingsCalendar bookings={bookings} />
    </div>
  );
}
