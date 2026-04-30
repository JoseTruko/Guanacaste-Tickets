'use client';

import { useState, useCallback, useEffect } from 'react';
import TourCard from '@/components/tours/TourCard';
import TourFilters from '@/components/tours/TourFilters';
import BokunWidget from '@/components/tours/BokunWidget';
import type { Tour } from '@/types/index';

type Source = 'all' | 'rainforest' | 'guanacaste';

const sourceFilters: { label: string; value: Source }[] = [
  { label: 'All Tours', value: 'all' },
  { label: 'Rainforest', value: 'rainforest' },
  { label: 'Guanacaste', value: 'guanacaste' },
];

export default function AllToursSection() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [source, setSource] = useState<Source>('all');

  useEffect(() => {
    fetch('/api/tours').then((r) => r.json()).then((data) => {
      setAllTours(data);
      setFilteredTours(data);
    });
  }, []);

  const handleFilter = useCallback((tours: Tour[]) => {
    setFilteredTours(tours);
  }, []);

  const showOwnTours = source === 'all' || source === 'rainforest';
  const showBokunTours = source === 'all' || source === 'guanacaste';

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4 text-center">
          All Tours
        </h2>

        {/* Source filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {sourceFilters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSource(value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-150 ${
                source === value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-neutral border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Bokun tours — Guanacaste first */}
        {showBokunTours && (
          <div className="mb-12">
            {source === 'all' && (
              <h3 className="font-heading font-semibold text-xl text-gray-900 mb-6">
                🌵 Guanacaste Tours
              </h3>
            )}
            <BokunWidget />
          </div>
        )}

        {/* Divider when showing both */}
        {source === 'all' && (
          <hr className="border-gray-200 mb-12" />
        )}

        {/* Own tours — Rainforest */}
        {showOwnTours && (
          <div>
            {source === 'all' && (
              <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                🌿 Rainforest Tours
              </h3>
            )}
            <div className="mb-6">
              <TourFilters tours={allTours} onFilter={handleFilter} />
            </div>
            {filteredTours.length === 0 ? (
              <p className="text-center text-neutral py-10">No tours found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
