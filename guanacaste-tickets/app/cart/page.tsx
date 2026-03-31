import type { Metadata } from 'next';
import BookingCart from '@/components/booking/BookingCart';

export const metadata: Metadata = {
  title: 'Your Cart',
};

export default function CartPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Booking Cart</h1>
      <BookingCart />
    </main>
  );
}
