import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllToursFromDB, getTourBySlugFromDB } from '@/lib/data/tours-db';
import { SITE_URL } from '@/lib/config';
import TourGallery from '@/components/tours/TourGallery';
import BookingForm from '@/components/booking/BookingForm';
import FAQAccordion from '@/components/faq/FAQAccordion';
import ShareButtons from '@/components/tours/ShareButtons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Allow new tours added after build to be served on-demand
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlugFromDB(slug);
  if (!tour) return {};

  const tourUrl = `${SITE_URL}/tours/${tour.slug}`;

  return {
    title: `${tour.title} | Guanacaste Tickets`,
    description: tour.shortDescription,
    alternates: { canonical: tourUrl },
    openGraph: {
      title: tour.title,
      description: tour.shortDescription,
      images: tour.images.length > 0 ? [{ url: tour.images[0] }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description: tour.shortDescription,
      images: tour.images.length > 0 ? [tour.images[0]] : [],
    },
  };
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlugFromDB(slug);
  if (!tour) notFound();

  const tourUrl = `${SITE_URL}/tours/${tour.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: tour.title,
    description: tour.description,
    image: tour.images,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: tour.currency,
    },
    url: tourUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <TourGallery images={tour.images} tourTitle={tour.title} />

            {/* Header info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {tour.category}
                </span>
                <span className="inline-block bg-surface text-neutral text-xs font-medium px-3 py-1 rounded-full">
                  {tour.difficulty}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{tour.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>⏱ {tour.duration}h</span>
                <span>🌐 {tour.languages.join(', ')}</span>
                <span>👥 Max {tour.maxGroupSize} people</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex gap-6">
              <div className="bg-primary/10 rounded-xl px-5 py-4 text-center">
                <p className="text-xs text-neutral mb-1">Adult</p>
                <p className="text-2xl font-bold text-primary">${tour.price}</p>
                <p className="text-xs text-neutral">USD / person</p>
              </div>
              <div className="bg-secondary/10 rounded-xl px-5 py-4 text-center">
                <p className="text-xs text-neutral mb-1">Child</p>
                <p className="text-2xl font-bold text-secondary">${tour.childPrice}</p>
                <p className="text-xs text-neutral">USD / person</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">About this tour</h2>
              <p className="text-gray-600 leading-relaxed">{tour.description}</p>
            </div>

            {/* Included / Not Included */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">What&apos;s Included</h2>
                <ul className="space-y-2">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Not Included</h2>
                <ul className="space-y-2">
                  {tour.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-500 font-bold mt-0.5">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meeting Point */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Meeting Point</h2>
              <p className="flex items-start gap-2 text-gray-600 text-sm">
                <span>📍</span>
                {tour.meetingPoint}
              </p>
            </div>

            {/* What to Bring */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What to Bring</h2>
              <ul className="space-y-1">
                {tour.whatToBring.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Cancellation Policy</h2>
              <p className="text-sm text-gray-700">{tour.cancellationPolicy.description}</p>
              {tour.cancellationPolicy.freeCancellation && (
                <p className="mt-2 text-xs font-medium text-green-700">
                  ✓ Free cancellation available
                  {tour.cancellationPolicy.deadlineHours
                    ? ` up to ${tour.cancellationPolicy.deadlineHours}h before`
                    : ''}
                </p>
              )}
            </div>

            {/* FAQs */}
            {tour.faqs && tour.faqs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <FAQAccordion items={tour.faqs} />
              </div>
            )}

            {/* Share */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Share this tour</h2>
              <ShareButtons tourTitle={tour.title} tourUrl={tourUrl} />
            </div>
          </div>

          {/* Right column — sticky booking form */}
          <div className="mt-10 lg:mt-0">
            <div className="lg:sticky lg:top-6 bg-white border border-gray-200 rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Book this tour</h2>
              <BookingForm tour={tour} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
