'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Tour } from '@/types/index';
import { calculateBookingTotal, getTourPricing } from '@/lib/booking/pricing';
import { useCartStore } from '@/store/cart';
import ParticipantSelector from './ParticipantSelector';
import TransportZoneSelector from './TransportZoneSelector';

const todayStr = () => new Date().toISOString().split('T')[0];

const schema = z.object({
  adults: z.number().min(1, 'At least 1 adult required'),
  children: z.number().min(0),
  date: z
    .string()
    .min(1, 'Date is required')
    .refine((d) => d >= todayStr(), { message: 'Date cannot be in the past' }),
});

type FormValues = z.infer<typeof schema>;

type BookingFormProps = {
  tour: Tour;
};

export default function BookingForm({ tour }: BookingFormProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [bookLoading, setBookLoading] = useState(false);
  const [transportZoneId, setTransportZoneId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { adults: 1, children: 0, date: '' },
  });

  const adults = watch('adults');
  const children = watch('children');
  const totalParticipants = adults + children;
  const selectedZone = tour.transportZones?.find((z) => z.id === transportZoneId);
  const pricing = getTourPricing(tour, totalParticipants, selectedZone);
  const total = calculateBookingTotal(tour, adults, children, selectedZone);
  const minGroupNotReached = totalParticipants < tour.minGroupSize;

  const onAddToCart = (values: FormValues) => {
    setBookLoading(true);
    const totalParticipants = values.adults + values.children;

    const zone = tour.transportZones?.find((z) => z.id === transportZoneId);
    const bracketPricing = getTourPricing(tour, totalParticipants, zone);
    const subtotal = calculateBookingTotal(tour, values.adults, values.children, zone);

    addItem({
      tourId: tour.id,
      tourTitle: tour.title,
      tourSlug: tour.slug,
      date: values.date,
      adults: values.adults,
      children: values.children,
      adultPrice: bracketPricing.adultPrice,
      childPrice: bracketPricing.childPrice,
      ...(zone ? { transportZone: { id: zone.id, name: zone.name } } : {}),
      subtotal,
    });

    router.push('/checkout');
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

      {minGroupNotReached ? (
        <p className="text-sm text-center font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-md p-3">
          You need to select at least {tour.minGroupSize} participant{tour.minGroupSize !== 1 ? 's' : ''}.
        </p>
      ) : (
        <>
          {/* Transport zones */}
          {tour.transportZones && tour.transportZones.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transportation</label>
              <TransportZoneSelector
                zones={tour.transportZones}
                participants={totalParticipants}
                selectedId={transportZoneId}
                onChange={setTransportZoneId}
              />
            </div>
          )}

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
        </>
      )}

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

      <button
        type="button"
        onClick={handleSubmit(onAddToCart)}
        disabled={bookLoading || minGroupNotReached}
        className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
      >
        Add to Cart
      </button>
    </form>
  );
}
