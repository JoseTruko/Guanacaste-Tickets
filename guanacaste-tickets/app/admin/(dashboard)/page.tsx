import Link from 'next/link';
import { fetchAllBookings } from '@/lib/bookings/queries';
import {
  statusCounts,
  confirmedRevenueThisMonth,
  confirmedCountThisMonth,
  toursNext7Days,
  bookingsPerDay,
  revenueByTour,
} from '@/lib/bookings/stats';
import StatCard from '@/components/admin/dashboard/StatCard';
import { BookingsPerDayChart, RevenueByTourChart, StatusDistributionChart } from '@/components/admin/dashboard/DashboardCharts';
import StatusBadge from '@/components/admin/bookings/StatusBadge';

export default async function AdminDashboardPage() {
  const bookings = await fetchAllBookings();
  const counts = statusCounts(bookings);
  const revenue = confirmedRevenueThisMonth(bookings);
  const confirmedCount = confirmedCountThisMonth(bookings);
  const upcoming = toursNext7Days(bookings);
  const perDay = bookingsPerDay(bookings, 30);
  const byTour = revenueByTour(bookings, 5);

  const recentPending = bookings.filter((b) => b.status === 'pending').slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Resumen general de reservas y actividad.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pendientes de confirmar"
          value={String(counts.pending)}
          hint={counts.pending > 0 ? 'Requieren acción' : undefined}
          accent="amber"
        />
        <StatCard label="Confirmadas este mes" value={String(confirmedCount)} accent="primary" />
        <StatCard label="Ingresos del mes" value={`$${revenue.toFixed(0)}`} accent="primary" />
        <StatCard label="Tours próximos 7 días" value={String(upcoming)} accent="neutral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BookingsPerDayChart data={perDay} />
        </div>
        <StatusDistributionChart counts={counts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RevenueByTourChart data={byTour} />

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-gray-900">Reservas pendientes</h3>
            <Link href="/admin/bookings?status=pending" className="text-sm text-primary hover:underline">
              Ver todas
            </Link>
          </div>

          {recentPending.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">No hay reservas pendientes 🎉</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentPending.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/admin/bookings?open=${b.id}`}
                    className="flex items-center justify-between gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-md transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{b.customerName}</p>
                      <p className="text-xs text-gray-500 truncate">{b.items.map((i) => i.tourTitle).join(', ')}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm text-gray-500">${b.grandTotal.toFixed(0)}</span>
                      <StatusBadge status="pending" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
