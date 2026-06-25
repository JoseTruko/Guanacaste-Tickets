'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Tour } from '@/types/index';
import { calculateBookingTotal, getTourPricing } from '@/lib/booking/pricing';
import { paymentGateway } from '@/lib/payment';
import ParticipantSelector from './ParticipantSelector';

const todayStr = () => new Date().toISOString().split('T')[0];

const schema = z.object({
  adults: z.number().min(1, 'At least 1 adult required'),
  children: z.number().min(0),
  date: z
    .string()
    .min(1, 'Date is required')
    .refine((d) => d >= todayStr(), { message: 'Date cannot be in the past' }),
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type FormValues = z.infer<typeof schema>;

type BookingFormProps = {
  tour: Tour;
};

export default function BookingForm({ tour }: BookingFormProps) {
  const [bookLoading, setBookLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { adults: 1, children: 0, date: '', name: '', email: '' },
  });

  const adults = watch('adults');
  const children = watch('children');
  const totalParticipants = adults + children;
  const pricing = getTourPricing(tour, totalParticipants);
  const total = calculateBookingTotal(tour, adults, children);
  const minGroupNotReached = totalParticipants < tour.minGroupSize;

  const onBookNow = async (values: FormValues) => {
    setBookLoading(true);
    setErrorMsg('');
    const totalParticipants = values.adults + values.children;
    if (totalParticipants < tour.minGroupSize) {
      setErrorMsg(`Minimum ${tour.minGroupSize} people required to book this tour.`);
      setBookLoading(false);
      return;
    }

    const bracketPricing = getTourPricing(tour, totalParticipants);
    const subtotal = calculateBookingTotal(tour, values.adults, values.children);
    const result = await paymentGateway.processBooking({
      items: [{
        tourId: tour.id,
        tourTitle: tour.title,
        tourSlug: tour.slug,
        date: values.date,
        adults: values.adults,
        children: values.children,
        adultPrice: bracketPricing.adultPrice,
        childPrice: bracketPricing.childPrice,
        subtotal,
      }],
      grandTotal: subtotal,
      currency: 'USD',
      customerName: values.name,
      customerEmail: values.email,
    });
    setBookLoading(false);
    if (result.success) {
      setBooked(true);
    } else {
      setErrorMsg(result.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form className="space-y-5">
      {/* Participants */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
        <ParticipantSelector
          adults={adults}
          children={children}
          onAdultsChange={(n) => setValue('adults', n, { shouldValidate: true })}
          onChildrenChange={(n) => setValue('children', n, { shouldValidate: true })}
          minAdults={tour.minGroupSize > 1 ? 1 : 1}
        />
        <p className="mt-2 text-xs text-gray-500">Minimum group size: {tour.minGroupSize} people.</p>
        {errors.adults && (
          <p className="mt-1 text-xs text-red-600">{errors.adults.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          id="date"
          type="date"
          min={todayStr()}
          {...register('date')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.date && (
          <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jane Doe"
          {...register('name')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="jane@example.com"
          {...register('email')}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Price summary */}
      <div className="bg-gray-50 rounded-md p-3 text-sm space-y-1">
        <div className="flex justify-between text-gray-600">
          <span>{adults} adult{adults !== 1 ? 's' : ''} × ${pricing.adultPrice.toFixed(2)}</span>
          <span>${(adults * pricing.adultPrice).toFixed(2)}</span>
        </div>
        {children > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>{children} child{children !== 1 ? 'ren' : ''} × ${pricing.childPrice.toFixed(2)}</span>
            <span>${(children * pricing.childPrice).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-1 mt-1">
          <span>Total</span>
          <span>${total.toFixed(2)} USD</span>
        </div>
      </div>

      {minGroupNotReached && (
        <p className="text-sm text-center font-medium text-orange-600">
          Add {tour.minGroupSize - totalParticipants} more participant{tour.minGroupSize - totalParticipants !== 1 ? 's' : ''} to meet the minimum group size.
        </p>
      )}
      {booked ? (
        <div className="rounded-md bg-green-50 border border-green-200 px-4 py-4 text-center">
          <p className="text-green-800 font-semibold text-sm">Booking request sent!</p>
          <p className="text-green-700 text-xs mt-1">Check your email. We'll confirm availability shortly.</p>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={handleSubmit(onBookNow)}
            disabled={bookLoading || minGroupNotReached}
            className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {bookLoading ? 'Processing…' : 'Book Now'}
          </button>
          {errorMsg && (
            <p className="text-sm text-center font-medium text-red-600">{errorMsg}</p>
          )}
        </>
      )}
    </form>
  );
}
