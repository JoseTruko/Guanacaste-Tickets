'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Tour } from '@/types/index';

type DurationOption = 'any' | 'lt3' | '3to6' | 'gt6';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'duration';

type TourFiltersProps = {
  tours: Tour[];
  onFilter: (filtered: Tour[]) => void;
};

export default function TourFilters({ tours, onFilter }: TourFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [duration, setDuration] = useState<DurationOption>('any');
  const [difficulty, setDifficulty] = useState('Any');
  const [sort, setSort] = useState<SortOption>('default');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(tours.map((t) => t.category)));
    return ['All', ...unique];
  }, [tours]);

  useEffect(() => {
    let result = [...tours];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'All') {
      result = result.filter((t) => t.category === category);
    }

    // Price range
    const min = minPrice !== '' ? Number(minPrice) : null;
    const max = maxPrice !== '' ? Number(maxPrice) : null;
    if (min !== null) result = result.filter((t) => t.price >= min);
    if (max !== null) result = result.filter((t) => t.price <= max);

    // Duration
    if (duration === 'lt3') result = result.filter((t) => t.duration < 3);
    else if (duration === '3to6') result = result.filter((t) => t.duration >= 3 && t.duration <= 6);
    else if (duration === 'gt6') result = result.filter((t) => t.duration > 6);

    // Difficulty
    if (difficulty !== 'Any') {
      result = result.filter((t) => t.difficulty === difficulty);
    }

    // Sort
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sort === 'duration') result.sort((a, b) => a.duration - b.duration);

    onFilter(result);
  }, [search, category, minPrice, maxPrice, duration, difficulty, sort, tours, onFilter]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
      {/* Search */}
      <div className="flex flex-col gap-1">
        <label htmlFor="tour-search" className="text-sm font-semibold text-gray-700">
          Search
        </label>
        <input
          id="tour-search"
          type="text"
          placeholder="Search tours…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-gray-700">Category</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-150 ${
                category === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range + Duration + Difficulty in a responsive row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Price min */}
        <div className="flex flex-col gap-1">
          <label htmlFor="price-min" className="text-sm font-semibold text-gray-700">
            Min Price (USD)
          </label>
          <input
            id="price-min"
            type="number"
            min={0}
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Price max */}
        <div className="flex flex-col gap-1">
          <label htmlFor="price-max" className="text-sm font-semibold text-gray-700">
            Max Price (USD)
          </label>
          <input
            id="price-max"
            type="number"
            min={0}
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1">
          <label htmlFor="duration-filter" className="text-sm font-semibold text-gray-700">
            Duration
          </label>
          <select
            id="duration-filter"
            value={duration}
            onChange={(e) => setDuration(e.target.value as DurationOption)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="any">Any</option>
            <option value="lt3">&lt; 3h</option>
            <option value="3to6">3–6h</option>
            <option value="gt6">&gt; 6h</option>
          </select>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-1">
          <label htmlFor="difficulty-filter" className="text-sm font-semibold text-gray-700">
            Difficulty
          </label>
          <select
            id="difficulty-filter"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="Any">Any</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <label htmlFor="sort-filter" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          Sort by
        </label>
        <select
          id="sort-filter"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="duration">Duration</option>
        </select>
      </div>
    </div>
  );
}
