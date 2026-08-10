'use client';

import { useState, useMemo } from 'react';
import TourCard from '@/components/tours/TourCard';
import type { Tour } from '@/types/index';

type Props = { initialTours: Tour[]; searchQuery: string };

export default function AllToursSection({ initialTours, searchQuery }: Props) {
  const [allTours] = useState<Tour[]>(initialTours);
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(allTours.map((t) => t.category)))];
  }, [allTours]);

  const filteredOwnTours = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allTours.filter(
      (t) =>
        (category === 'All' || t.category === category) &&
        (!q || t.title.toLowerCase().includes(q) || t.shortDescription?.toLowerCase().includes(q))
    );
  }, [allTours, searchQuery, category]);

  return (
    <section className="py-8 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Category filter */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-colors duration-150 ${
                  category === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Tours grid */}
        {filteredOwnTours.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No tours match your search or filter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOwnTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
