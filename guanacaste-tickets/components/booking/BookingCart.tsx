'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { paymentGateway } from '@/lib/payment';
import BookingCartItem from './BookingCartItem';

export default function BookingCart() {
  const items = useCartStore((s) => s.items);
  const grandTotal = useCartStore((s) => s.grandTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');
  const [isError, setIsError] = useState(false);

  if (items.length === 0) {
    return (
      <div className="text-center py-12 space-y-3">
        <p className="text-gray-500 text-base">Your cart is empty.</p>
        <Link href="/tours" className="text-primary hover:underline text-sm font-medium">
          Browse tours
        </Link>
      </div>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    setMessage('');
    setFallbackUrl('');
    setIsError(false);

    const result = await paymentGateway.processBooking({
      items,
      grandTotal: grandTotal(),
      currency: 'USD',
    });

    setLoading(false);

    if (result.success && result.whatsappUrl) {
      const opened = window.open(result.whatsappUrl, '_blank');
      if (!opened) {
        setFallbackUrl(result.whatsappUrl);
      }
      setMessage("Booking request sent! We'll confirm via WhatsApp shortly.");
      setIsError(false);
    } else {
      setMessage(result.message || 'Something went wrong. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="space-y-2">
      <div>
        {items.map((item) => (
          <BookingCartItem key={`${item.tourId}-${item.date}`} item={item} />
        ))}
      </div>

      {/* Grand total */}
      <div className="flex justify-between items-center pt-3 font-semibold text-gray-900 text-base">
        <span>Grand Total</span>
        <span>${grandTotal().toFixed(2)} USD</span>
      </div>

      {/* Feedback */}
      {message && (
        <div className={`text-sm rounded-md px-3 py-2 ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
          {fallbackUrl && (
            <div className="mt-1">
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                Open WhatsApp link
              </a>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Confirm All Bookings'}
        </button>
        <button
          type="button"
          onClick={clearCart}
          disabled={loading}
          className="w-full border border-gray-300 text-gray-600 font-medium py-2 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
