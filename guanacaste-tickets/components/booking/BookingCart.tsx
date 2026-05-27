'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { paymentGateway } from '@/lib/payment';
import BookingCartItem from './BookingCartItem';

type CustomerInfo = { name: string; email: string };

export default function BookingCart() {
  const items = useCartStore((s) => s.items);
  const grandTotal = useCartStore((s) => s.grandTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [customer, setCustomer] = useState<CustomerInfo>({ name: '', email: '' });
  const [customerErrors, setCustomerErrors] = useState<Partial<CustomerInfo>>({});

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
    const errors: Partial<CustomerInfo> = {};
    if (!customer.name.trim()) errors.name = 'Name is required';
    if (!customer.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errors.email = 'Valid email is required';
    }
    if (Object.keys(errors).length) {
      setCustomerErrors(errors);
      return;
    }
    setCustomerErrors({});
    setLoading(true);
    setMessage('');
    setIsError(false);

    const result = await paymentGateway.processBooking({
      items,
      grandTotal: grandTotal(),
      currency: 'USD',
      customerName: customer.name,
      customerEmail: customer.email,
    });

    setLoading(false);
    setMessage(result.message || 'Something went wrong. Please try again.');
    setIsError(!result.success);
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

      {/* Customer info */}
      <div className="border-t border-gray-100 pt-4 space-y-3">
        <p className="text-sm font-medium text-gray-700">Your details</p>
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={customer.name}
            onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {customerErrors.name && (
            <p className="mt-1 text-xs text-red-600">{customerErrors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email address"
            value={customer.email}
            onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {customerErrors.email && (
            <p className="mt-1 text-xs text-red-600">{customerErrors.email}</p>
          )}
        </div>
      </div>

      {/* Feedback */}
      {message && (
        <div className={`text-sm rounded-md px-3 py-2 ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
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
