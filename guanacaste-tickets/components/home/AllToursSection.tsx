'use client';

import { useState, useMemo, useEffect } from 'react';
import TourCard from '@/components/tours/TourCard';
import FilterDropdown from '@/components/tours/FilterDropdown';
import { PLACES } from '@/lib/data/places';
import type { Tour } from '@/types/index';

type Props = {
  initialTours: Tour[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  initialCategory?: string;
  emptyMessage?: string;
};

export default function AllToursSection({
  initialTours,
  searchQuery,
  onSearchChange,
  initialCategory = 'All',
  emptyMessage = 'No tours match your search or filter.',
}: Props) {
  const [allTours] = useState<Tour[]>(initialTours);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const categories = useMemo(() => {
    return Array.from(new Set(allTours.map((t) => t.category)));
  }, [allTours]);

  const locations = useMemo(() => PLACES.map((p) => p.name), []);

  const difficulties = useMemo(() => {
    return Array.from(new Set(allTours.map((t) => t.difficulty)));
  }, [allTours]);

  const hasActiveFilters = category !== 'All' || location !== 'All' || difficulty !== 'All' || searchQuery.trim() !== '';
  const clearFilters = () => {
    setCategory('All');
    setLocation('All');
    setDifficulty('All');
    onSearchChange('');
  };

  // Tours matching every filter except category — used to show per-category counts
  const toursExceptCategory = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allTours.filter(
      (t) =>
        (location === 'All' || t.location === location) &&
        (difficulty === 'All' || t.difficulty === difficulty) &&
        (!q || t.title.toLowerCase().includes(q) || t.shortDescription?.toLowerCase().includes(q))
    );
  }, [allTours, searchQuery, location, difficulty]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of toursExceptCategory) counts[t.category] = (counts[t.category] ?? 0) + 1;
    return counts;
  }, [toursExceptCategory]);

  const filteredOwnTours = useMemo(() => {
    return toursExceptCategory.filter((t) => category === 'All' || t.category === category);
  }, [toursExceptCategory, category]);

  return (
    <section className="py-8 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Toolbar: search + Level + Place + Clear */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 mb-3 sm:mb-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search tours…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex gap-2 sm:contents">
            {difficulties.length > 1 && (
              <FilterDropdown
                label="Level"
                allLabel="All levels"
                options={difficulties}
                value={difficulty}
                onChange={setDifficulty}
              />
            )}

            {locations.length > 0 && (
              <FilterDropdown
                label="Place"
                allLabel="All places"
                options={locations}
                value={location}
                onChange={setLocation}
              />
            )}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                aria-label="Clear filters"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-0 text-sm text-gray-500 hover:text-primary transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7h12z" />
                </svg>
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Category pills with counts */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 md:mb-8">
            <button
              onClick={() => setCategory('All')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors duration-150 ${
                category === 'All'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              All Tours ({toursExceptCategory.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors duration-150 ${
                  category === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {cat} ({categoryCounts[cat] ?? 0})
              </button>
            ))}
          </div>
        )}

        {/* Tours grid */}
        {filteredOwnTours.length === 0 ? (
          <p className="text-center text-gray-400 py-10">{emptyMessage}</p>
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
