'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Tour } from '@/types/index';
import { calculateTotalPrice } from '@/lib/booking/pricing';
import { useCartStore } from '@/store/cart';
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
  const addItem = useCartStore((s) => s.addItem);
  const [cartMsg, setCartMsg] = useState('');
  const [bookLoading, setBookLoading] = useState(false);
  const [bookMsg, setBookMsg] = useState('');
  const [bookUrl, setBookUrl] = useState('');

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
  const total = calculateTotalPrice(adults, children, tour.price, tour.childPrice);

  const buildItem = (values: FormValues) => ({
    tourId: tour.id,
    tourTitle: tour.title,
    tourSlug: tour.slug,
    date: values.date,
    adults: values.adults,
    children: values.children,
    adultPrice: tour.price,
    childPrice: tour.childPrice,
    subtotal: calculateTotalPrice(values.adults, values.children, tour.price, tour.childPrice),
  });

  const onAddToCart = (values: FormValues) => {
    addItem(buildItem(values));
    setCartMsg('Added to cart!');
    setTimeout(() => setCartMsg(''), 3000);
  };

  const onBookNow = async (values: FormValues) => {
    setBookLoading(true);
    setBookMsg('');
    setBookUrl('');
    const item = buildItem(values);
    const result = await paymentGateway.processBooking({
      items: [item],
      grandTotal: item.subtotal,
      currency: 'USD',
    });
    setBookLoading(false);
    if (result.success && result.whatsappUrl) {
      window.open(result.whatsappUrl, '_blank');
      setBookMsg('Booking request sent! We\'ll confirm via WhatsApp shortly.');
      setBookUrl(result.whatsappUrl);
    } else {
      setBookMsg(result.message || 'Something went wrong. Please try again.');
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
        />
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
          <span>{adults} adult{adults !== 1 ? 's' : ''} × ${tour.price.toFixed(2)}</span>
          <span>${(adults * tour.price).toFixed(2)}</span>
        </div>
        {children > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>{children} child{children !== 1 ? 'ren' : ''} × ${tour.childPrice.toFixed(2)}</span>
            <span>${(children * tour.childPrice).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-1 mt-1">
          <span>Total</span>
          <span>${total.toFixed(2)} USD</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleSubmit(onAddToCart)}
          className="w-full bg-secondary text-white font-semibold py-2.5 rounded-md hover:bg-secondary-hover transition-colors"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={handleSubmit(onBookNow)}
          disabled={bookLoading}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {bookLoading ? 'Processing…' : 'Book Now'}
        </button>
      </div>

      {cartMsg && (
        <p className="text-sm text-green-700 font-medium text-center">{cartMsg}</p>
      )}
      {bookMsg && (
        <div className="text-sm text-center">
          <p className={bookMsg.includes('sent') ? 'text-green-700 font-medium' : 'text-red-600'}>
            {bookMsg}
          </p>
          {bookUrl && (
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline text-xs mt-1 inline-block"
            >
              Open WhatsApp link
            </a>
          )}
        </div>
      )}
    </form>
  );
}
