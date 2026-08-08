import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';
import TourCard from '@/components/tours/TourCard';
import { getAllToursFromDB } from '@/lib/data/tours-db';
import type { Tour } from '@/types/index';

const CATEGORIES_TO_SHOW = 3;
const TOURS_PER_CATEGORY = 3;

export default async function DealsSection() {
  const allTours = await getAllToursFromDB();

  const byCategory = new Map<string, Tour[]>();
  for (const tour of allTours) {
    const list = byCategory.get(tour.category) ?? [];
    list.push(tour);
    byCategory.set(tour.category, list);
  }

  const categories = [...byCategory.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, CATEGORIES_TO_SHOW);

  return (
    <section id="deals" className="py-16 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-2 text-center">
            Deals & Experiences
          </h2>
          <p className="text-center text-neutral mb-10">
            Featured tours in Guanacaste and Rincon de la Vi.
          </p>
        </Reveal>

        {categories.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No tours available yet.</p>
        ) : (
          <div className="space-y-12">
            {categories.map(([category, tours]) => (
              <div key={category}>
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.slice(0, TOURS_PER_CATEGORY).map((tour) => (
                    <TourCard key={tour.id} tour={tour} variant="featured" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-hover transition-colors"
            >
              See all available tours
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
