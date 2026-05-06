'use client';

import { useState, useCallback, useEffect } from 'react';
import TourCard from '@/components/tours/TourCard';
import TourFilters from '@/components/tours/TourFilters';
import BokunWidget from '@/components/tours/BokunWidget';
import type { Tour } from '@/types/index';

export default function AllToursSection() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetch('/api/tours')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllTours(data);
          setFilteredTours(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleFilter = useCallback((tours: Tour[]) => {
    setFilteredTours(tours);
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-10 text-center">
          All Tours
        </h2>

        {/* Bokun tours — always first */}
        <div className="mb-14">
          <BokunWidget />
        </div>

        {/* Own tours — only shown if Supabase has data */}
        {allTours.length > 0 && (
          <div>
            <div className="mb-6">
              <TourFilters tours={allTours} onFilter={handleFilter} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
