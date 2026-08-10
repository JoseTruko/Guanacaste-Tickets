'use client';

import { useState } from 'react';
import ToursHero from './ToursHero';
import AllToursSection from '@/components/home/AllToursSection';
import type { Tour } from '@/types/index';

export default function ToursPageContent({ tours }: { tours: Tour[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <ToursHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <AllToursSection initialTours={tours} searchQuery={searchQuery} />
    </>
  );
}
