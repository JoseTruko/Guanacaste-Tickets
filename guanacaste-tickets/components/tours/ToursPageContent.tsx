'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ToursHero from './ToursHero';
import AllToursSection from '@/components/home/AllToursSection';
import type { Tour } from '@/types/index';

export default function ToursPageContent({ tours }: { tours: Tour[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') ?? 'All';

  return (
    <>
      <ToursHero searchQuery={searchQuery} onSearchChange={setSearchQuery} showSearch={false} />
      <AllToursSection
        initialTours={tours}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        initialCategory={initialCategory}
      />
    </>
  );
}
