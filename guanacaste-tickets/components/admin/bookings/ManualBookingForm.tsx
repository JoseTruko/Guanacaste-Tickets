'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Tour, BookingItem } from '@/types/index';
import { createManualBooking } from '@/app/admin/(dashboard)/bookings/actions';
import Button from '@/components/ui/Button';

type ManualItem = BookingItem;

function emptyItem(tours: Tour[]): ManualItem {
  const tour = tours[0];
  return {
    tourId: tour?.id ?? '',
    tourTitle: tour?.title ?? '',
    tourSlug: tour?.slug ?? '',
    date: '',
    adults: 1,
    children: 0,
    adultPrice: tour?.price ?? 0,
    childPrice: tour?.childPrice ?? 0,
    subtotal: tour?.price ?? 0,
  };
}

function recalc(item: ManualItem): ManualItem {
  return { ...item, subtotal: item.adults * item.adultPrice + item.children * item.childPrice };
}

export default function ManualBookingForm({ tours }: { tours: Tour[] }) {
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLanguage, setCustomerLanguage] = useState('');
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'completed'>('pending');
  const [items, setItems] = useState<ManualItem[]>([emptyItem(tours)]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const grandTotal = items.reduce((sum, i) => sum + i.subtotal, 0);

  const updateItem = (idx: number, patch: Partial<ManualItem>) => {
    setItems((prev) => prev.map((item, i) => (i === idx ? recalc({ ...item, ...patch }) : item)));
  };

  const setItemTour = (idx: number, tourId: string) => {
    const tour = tours.find((t) => t.id === tourId);
    if (!tour) return;
    updateItem(idx, { tourId: tour.id, tourTitle: tour.title, tourSlug: tour.slug, adultPrice: tour.price, childPrice: tour.childPrice });
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem(tours)]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!customerName || !customerEmail) return setError('Nombre y email del cliente son obligatorios.');
    if (items.some((i) => !i.tourId || !i.date)) return setError('Selecciona un tour y una fecha para cada línea.');

    setLoading(true);
    const result = await createManualBooking({
      customerName,
      customerEmail,
      customerPhone: customerPhone || undefined,
      customerLanguage: customerLanguage || undefined,
      status,
      items,
    });
    setLoading(false);

    if (!result.ok) return setError(result.error);
    router.push('/admin/bookings');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
        <h2 className="font-heading font-semibold text-gray-900">Datos del cliente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nombre completo *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Idioma</label>
            <input
              type="text"
              placeholder="Español, English…"
              value={customerLanguage}
              onChange={(e) => setCustomerLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-gray-900">Tours reservados</h2>
          <button type="button" onClick={addItem} className="text-sm text-primary font-medium hover:underline">
            + Agregar tour
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="border border-gray-100 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Tour {idx + 1}</span>
                {items.length > 1 && (
                  <button type="button" onClick={() => removeItem(idx)} className="text-xs text-red-600 hover:underline">
                    Quitar
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tour</label>
                  <select
                    value={item.tourId}
                    onChange={(e) => setItemTour(idx, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {tours.map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => updateItem(idx, { date: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Adultos</label>
                  <input
                    type="number"
                    min={0}
                    value={item.adults}
                    onChange={(e) => updateItem(idx, { adults: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Niños</label>
                  <input
                    type="number"
                    min={0}
                    value={item.children}
                    onChange={(e) => updateItem(idx, { children: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Subtotal (USD)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.subtotal}
                    onChange={(e) => updateItem(idx, { subtotal: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-right font-semibold text-gray-900">Total: ${grandTotal.toFixed(2)}</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
        <h2 className="font-heading font-semibold text-gray-900">Estado</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="status" checked={status === 'pending'} onChange={() => setStatus('pending')} />
            Pendiente <span className="text-gray-400">(se envía correo de confirmación pendiente al cliente)</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="status" checked={status === 'confirmed'} onChange={() => setStatus('confirmed')} />
            Confirmada <span className="text-gray-400">(tour futuro ya acordado con el cliente, sin enviar correo; cuenta en ingresos)</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="status" checked={status === 'completed'} onChange={() => setStatus('completed')} />
            Completada <span className="text-gray-400">(tour ya realizado, solo se registra; cuenta en ingresos)</span>
          </label>
        </div>
      </section>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando…' : 'Crear reserva'}
        </Button>
        <button
          type="button"
          onClick={() => router.push('/admin/bookings')}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
