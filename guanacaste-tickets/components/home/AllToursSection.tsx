'use client';

import { useState, useEffect, useMemo } from 'react';
import TourCard from '@/components/tours/TourCard';
import type { Tour } from '@/types/index';

export default function AllToursSection() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/tours')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setAllTours(data); })
      .catch(() => {});
  }, []);

  const filteredOwnTours = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allTours;
    return allTours.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.shortDescription?.toLowerCase().includes(q)
    );
  }, [allTours, searchQuery]);

  return (
    <section className="py-8 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="font-heading font-bold text-2xl md:text-4xl text-gray-900 mb-1.5 md:mb-3 text-center">
          Tours in Guanacaste &amp; Rincón de la Vieja
        </h1>
        <p className="text-center text-gray-500 text-sm md:text-base mb-4 md:mb-8">
          Curated experiences across Guanacaste and the Rincón de la Vieja region.
        </p>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-3 md:mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search tours…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 md:pl-11 pr-4 py-2.5 md:py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:border-primary focus:shadow-md transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tours grid */}
        {filteredOwnTours.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No tours match your search.</p>
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
