'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/store/cart';
import { paymentGateway } from '@/lib/payment';
import { getStoredGclid } from '@/lib/analytics';
import BookingCartItem from './BookingCartItem';

const PHONE_PREFIXES = [
  { value: '+506', label: 'CR +506' },
  { value: '+1', label: 'US +1' },
  { value: '+52', label: 'MX +52' },
  { value: '+507', label: 'PA +507' },
  { value: '+505', label: 'NI +505' },
  { value: '+502', label: 'GT +502' },
  { value: '+504', label: 'HN +504' },
  { value: '+503', label: 'SV +503' },
  { value: '+57', label: 'CO +57' },
  { value: '+34', label: 'ES +34' },
  { value: '+44', label: 'UK +44' },
  { value: '+49', label: 'DE +49' },
  { value: '+33', label: 'FR +33' },
  { value: 'other', label: 'Other…' },
];
const LANGUAGES = ['English', 'Spanish', 'French', 'German'];

const checkoutSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phonePrefix: z.string().min(1, 'Country code is required'),
    customPrefix: z.string().optional(),
    phone: z.string().min(1, 'Phone number is required'),
    language: z.string().min(1, 'Language is required'),
  })
  .refine((data) => data.phonePrefix !== 'other' || !!data.customPrefix?.trim(), {
    message: 'Enter your country code',
    path: ['customPrefix'],
  });

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function BookingCart() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const grandTotal = useCartStore((s) => s.grandTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phonePrefix: '+506',
      customPrefix: '',
      phone: '',
      language: '',
    },
  });

  const phonePrefix = watch('phonePrefix');

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

  const onSubmit = async (values: CheckoutValues) => {
    setLoading(true);
    setMessage('');
    setIsError(false);

    const total = grandTotal();
    let prefix = values.phonePrefix === 'other' ? values.customPrefix!.trim() : values.phonePrefix;
    if (!prefix.startsWith('+')) prefix = `+${prefix}`;

    const result = await paymentGateway.processBooking({
      items,
      grandTotal: total,
      currency: 'USD',
      customerName: `${values.firstName} ${values.lastName}`.trim(),
      customerEmail: values.email,
      customerFirstName: values.firstName,
      customerLastName: values.lastName,
      customerPhone: `${prefix} ${values.phone}`,
      customerLanguage: values.language,
      gclid: getStoredGclid(),
    });

    if (result.success) {
      clearCart();
      router.push(`/booking-confirmed?value=${total}`);
      return;
    }

    setLoading(false);
    setMessage(result.message || 'Something went wrong. Please try again.');
    setIsError(true);
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
      <form onSubmit={handleSubmit(onSubmit)} className="border-t border-gray-100 pt-4 space-y-3">
        <p className="text-sm font-medium text-gray-700">Main traveller&apos;s contact details</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="First name"
              {...register('firstName')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              {...register('lastName')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email address"
            {...register('email')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="flex">
            <select
              {...register('phonePrefix')}
              className="shrink-0 w-24 border border-r-0 border-gray-300 rounded-l-md px-2 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {PHONE_PREFIXES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="Phone number"
              {...register('phone')}
              className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
          {phonePrefix === 'other' && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Country code (e.g. +81)"
                {...register('customPrefix')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.customPrefix && (
                <p className="mt-1 text-xs text-red-600">{errors.customPrefix.message}</p>
              )}
            </div>
          )}
        </div>
        <div>
          <select
            {...register('language')}
            defaultValue=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
              Language
            </option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="mt-1 text-xs text-red-600">{errors.language.message}</p>
          )}
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
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing…' : 'Complete Booking'}
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
      </form>
    </div>
  );
}
