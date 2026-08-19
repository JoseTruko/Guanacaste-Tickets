'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Booking } from '@/types/index';
import { effectiveStatus } from '@/lib/bookings/status';
import { confirmBooking, cancelBooking, deleteBooking } from '@/app/admin/(dashboard)/bookings/actions';
import Button from '@/components/ui/Button';
import StatusBadge from './StatusBadge';

export default function BookingDetailDrawer({
  booking,
  isAdmin,
  onClose,
}: {
  booking: Booking;
  isAdmin: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const status = effectiveStatus(booking);

  const [paymentLink, setPaymentLink] = useState(booking.paymentLink ?? '');
  const [comment, setComment] = useState(booking.adminComment ?? '');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState<'confirm' | 'cancel' | 'delete' | null>(null);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setLoading('confirm');
    setError('');
    const result = await confirmBooking(booking.id, { paymentLink, comment });
    setLoading(null);
    if (!result.ok) return setError(result.error);
    router.refresh();
    onClose();
  };

  const handleCancel = async () => {
    if (!confirm('¿Cancelar esta reserva? Se le notificará al cliente por correo.')) return;
    setLoading('cancel');
    setError('');
    const result = await cancelBooking(booking.id, { reason });
    setLoading(null);
    if (!result.ok) return setError(result.error);
    router.refresh();
    onClose();
  };

  const handleDelete = async () => {
    if (!confirm('¿Eliminar esta reserva permanentemente? Esta acción no se puede deshacer y no se notifica al cliente.')) return;
    setLoading('delete');
    setError('');
    const result = await deleteBooking(booking.id);
    setLoading(null);
    if (!result.ok) return setError(result.error);
    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-heading font-bold text-lg text-gray-900">{booking.customerName}</h2>
            <StatusBadge status={status} />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="p-5 space-y-5">
          <section className="space-y-1 text-sm">
            <p><span className="text-gray-500">Email:</span> <a href={`mailto:${booking.customerEmail}`} className="text-primary hover:underline">{booking.customerEmail}</a></p>
            {booking.customerPhone && <p><span className="text-gray-500">Teléfono:</span> {booking.customerPhone}</p>}
            {booking.customerLanguage && <p><span className="text-gray-500">Idioma:</span> {booking.customerLanguage}</p>}
            <p><span className="text-gray-500">Creada:</span> {new Date(booking.createdAt).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'short' })}</p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Tours reservados</h3>
            <div className="space-y-2">
              {booking.items.map((item, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-3 text-sm">
                  <p className="font-medium text-gray-900">{item.tourTitle}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {item.date} · {item.adults} adulto{item.adults !== 1 ? 's' : ''}
                    {item.children > 0 ? ` · ${item.children} niño${item.children !== 1 ? 's' : ''}` : ''}
                  </p>
                  {item.transportZone && <p className="text-gray-500 text-xs">Transporte: {item.transportZone.name}</p>}
                  <p className="text-gray-900 text-sm mt-1 font-medium">${item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <p className="text-right font-semibold text-gray-900 mt-2">Total: ${booking.grandTotal.toFixed(2)} {booking.currency}</p>
          </section>

          {status === 'pending' && (
            <section className="space-y-3 border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-900">Confirmar reserva</h3>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Link de pago (opcional)</label>
                <input
                  type="url"
                  placeholder="https://…"
                  value={paymentLink}
                  onChange={(e) => setPaymentLink(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Comentario para el cliente (opcional)</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button onClick={handleConfirm} disabled={loading !== null} className="w-full">
                {loading === 'confirm' ? 'Confirmando…' : 'Confirmar reserva'}
              </Button>
            </section>
          )}

          {status === 'confirmed' && booking.paymentLink && (
            <section className="border-t border-gray-100 pt-4 text-sm">
              <p className="text-gray-500">Link de pago enviado:</p>
              <a href={booking.paymentLink} target="_blank" rel="noreferrer" className="text-primary hover:underline break-all">
                {booking.paymentLink}
              </a>
            </section>
          )}

          {(status === 'pending' || status === 'confirmed') && (
            <section className="space-y-3 border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-900">Cancelar reserva</h3>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Motivo (se incluye en el correo al cliente)</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {status === 'confirmed' && error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                onClick={handleCancel}
                disabled={loading !== null}
                className="w-full text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-md transition-colors disabled:opacity-50"
              >
                {loading === 'cancel' ? 'Cancelando…' : 'Cancelar reserva'}
              </button>
            </section>
          )}

          {booking.cancelledReason && (
            <section className="border-t border-gray-100 pt-4 text-sm">
              <p className="text-gray-500">Motivo de cancelación:</p>
              <p className="text-gray-900">{booking.cancelledReason}</p>
            </section>
          )}

          {isAdmin && (
            <section className="border-t border-gray-100 pt-4">
              <button
                onClick={handleDelete}
                disabled={loading !== null}
                className="text-xs text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                {loading === 'delete' ? 'Eliminando…' : 'Eliminar reserva'}
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
