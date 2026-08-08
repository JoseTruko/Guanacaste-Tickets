'use client';

import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { trackConversion } from '@/lib/analytics';

function BookingConfirmedContent() {
  const params = useSearchParams();
  const tour = params.get('tour');
  const value = Number(params.get('value') ?? 0);

  useEffect(() => {
    trackConversion(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-4">Booking request sent!</h1>
      <p className="text-gray-600 mb-8">
        {tour ? `Your request for "${tour}" has been received. ` : 'Your booking request has been received. '}
        Check your email — we&apos;ll confirm availability and payment details shortly.
      </p>
      <Link
        href="/tours"
        className="inline-flex items-center justify-center bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-primary-hover transition-colors"
      >
        Browse more tours
      </Link>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <BookingConfirmedContent />
    </Suspense>
  );
}
