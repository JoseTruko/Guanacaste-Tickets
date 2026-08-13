'use client';

import { useState } from 'react';
import Link from 'next/link';
import ToursHero from '@/components/tours/ToursHero';
import AllToursSection from '@/components/home/AllToursSection';
import type { Tour } from '@/types/index';
import type { Place } from '@/lib/data/places';

export default function PlacePageContent({ place, tours }: { place: Place; tours: Tour[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <ToursHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        title={place.name}
        subtitle={place.description}
        image={{ src: place.heroImage, alt: place.heroImageAlt }}
        showSearch={false}
      />
      {tours.length === 0 ? (
        <div className="py-16 px-4 text-center">
          <p className="text-gray-400 mb-4">More {place.name} tours coming soon.</p>
          <Link href="/tours" className="text-primary font-medium hover:underline">
            See all tours
          </Link>
        </div>
      ) : (
        <AllToursSection
          initialTours={tours}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          emptyMessage={`No ${place.name} tours match your search.`}
        />
      )}
    </>
  );
}
