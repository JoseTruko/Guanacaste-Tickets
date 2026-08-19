import { getAllToursFromDB } from '@/lib/data/tours-db';
import ManualBookingForm from '@/components/admin/bookings/ManualBookingForm';

export default async function NewBookingPage() {
  const tours = await getAllToursFromDB();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900">Nueva reserva</h1>
        <p className="text-sm text-gray-500 mt-1">Registra una reserva tomada por fuera del sitio (teléfono, WhatsApp, walk-in).</p>
      </div>
      <ManualBookingForm tours={tours} />
    </div>
  );
}
