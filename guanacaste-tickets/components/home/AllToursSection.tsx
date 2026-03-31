'use client';

import { useState, useCallback, useEffect } from 'react';
import TourCard from '@/components/tours/TourCard';
import TourFilters from '@/components/tours/TourFilters';
import type { Tour } from '@/types/index';

export default function AllToursSection() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetch('/api/tours').then((r) => r.json()).then((data) => {
      setAllTours(data);
      setFilteredTours(data);
    });
  }, []);

  const handleFilter = useCallback((tours: Tour[]) => {
    setFilteredTours(tours);
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-8 text-center">
          All Tours
        </h2>

        <div className="mb-8">
          <TourFilters tours={allTours} onFilter={handleFilter} />
        </div>

        {filteredTours.length === 0 ? (
          <p className="text-center text-gray-500 py-16 text-lg">No tours found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
