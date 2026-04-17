'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Tour } from '@/types/index';

type TourFiltersProps = {
  tours: Tour[];
  onFilter: (filtered: Tour[]) => void;
};

export default function TourFilters({ tours, onFilter }: TourFiltersProps) {
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(tours.map((t) => t.category)));
    return ['All', ...unique];
  }, [tours]);

  useEffect(() => {
    const result = category === 'All' ? tours : tours.filter((t) => t.category === category);
    onFilter(result);
  }, [category, tours, onFilter]);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
            category === cat
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
