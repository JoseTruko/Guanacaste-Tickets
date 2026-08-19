'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Booking, BookingStatus } from '@/types/index';
import { effectiveStatus } from '@/lib/bookings/status';
import StatusBadge from './StatusBadge';
import BookingDetailDrawer from './BookingDetailDrawer';

const TABS: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'pending', label: 'Pendientes' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'cancelled', label: 'Canceladas' },
  { value: 'completed', label: 'Completadas' },
  { value: 'all', label: 'Todas' },
];

export default function BookingsView({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = (searchParams.get('status') as BookingStatus | null) ?? 'pending';
  const [tab, setTab] = useState<BookingStatus | 'all'>(initialTab);
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(searchParams.get('open'));

  const withStatus = useMemo(
    () => bookings.map((b) => ({ booking: b, status: effectiveStatus(b) })),
    [bookings]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return withStatus.filter(({ booking, status }) => {
      if (tab !== 'all' && status !== tab) return false;
      if (!q) return true;
      return (
        booking.customerName.toLowerCase().includes(q) ||
        booking.customerEmail.toLowerCase().includes(q) ||
        booking.items.some((i) => i.tourTitle.toLowerCase().includes(q))
      );
    });
  }, [withStatus, tab, search]);

  const selected = openId ? bookings.find((b) => b.id === openId) ?? null : null;

  const openBooking = (id: string) => {
    setOpenId(id);
    router.replace(`/admin/bookings?open=${id}`, { scroll: false });
  };

  const closeDrawer = () => {
    setOpenId(null);
    router.replace('/admin/bookings', { scroll: false });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900">Reservas</h1>
        <p className="text-sm text-gray-500 mt-1">{bookings.length} reservas en total.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-1 overflow-x-auto -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`shrink-0 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t.value ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Buscar por cliente, email o tour…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:ml-auto w-full sm:w-72 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Tour(s)</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Personas</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Creada</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ booking, status }) => {
                const people = booking.items.reduce((sum, i) => sum + i.adults + i.children, 0);
                const dates = Array.from(new Set(booking.items.map((i) => i.date))).join(', ');
                return (
                  <tr
                    key={booking.id}
                    onClick={() => openBooking(booking.id)}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{booking.customerName}</p>
                      <p className="text-xs text-gray-500">{booking.customerEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-[220px] truncate">
                      {booking.items.map((i) => i.tourTitle).join(', ')}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{dates}</td>
                    <td className="px-4 py-3 text-gray-700">{people}</td>
                    <td className="px-4 py-3 text-gray-700">${booking.grandTotal.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={status} />
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    No hay reservas en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <BookingDetailDrawer booking={selected} onClose={closeDrawer} />}
    </div>
  );
}
