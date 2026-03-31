import Link from 'next/link';
import TourCard from '@/components/tours/TourCard';
import Reveal from '@/components/ui/Reveal';
import { getFeaturedToursFromDB } from '@/lib/data/tours-db';

export default async function DealsSection() {
  const featuredTours = await getFeaturedToursFromDB();

  return (
    <section id="deals" className="py-16 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-8 text-center">
            Hot Deals
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTours.map((tour, i) => (
            <Reveal key={tour.id} delay={i * 100}>
              <TourCard tour={tour} variant="featured" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-base"
          >
            View All Tours →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
