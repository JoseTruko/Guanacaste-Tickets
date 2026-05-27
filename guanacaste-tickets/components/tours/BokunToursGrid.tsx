'use client';

import { useState, useEffect } from 'react';

const CHANNEL_UUID = 'e75ced95-7cfd-4bdf-acfe-c97be1faa9bf';

type BokunTour = {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  location: string;
};

const difficultyStyles: Record<BokunTour['difficulty'], string> = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Challenging: 'bg-red-100 text-red-700',
};

const TOURS: BokunTour[] = [
  {
    id: 1034880,
    title: 'Río Celeste & Finca Verde Nature Farm',
    description: 'This adventure combines the magical Río Celeste waterfall hike with an ecological visit to Finca Verde and a hike through the lush rainforest.',
    category: 'Nature',
    duration: '12h',
    difficulty: 'Moderate',
    location: 'Bijagua, Alajuela',
    image: 'images/rio-celeste.webp',
  },
  {
    id: 164786,
    title: 'Sensoria — Rainforest & Natural Hot Springs',
    description: 'Sensoria, Land of the Senses, is a pristine natural sanctuary in Costa Rica that blends scenic beauty, relaxation, and sensory exploration.',
    category: 'Wellness',
    duration: '10',
    difficulty: 'Moderate',
    location: 'Rincón de la Vieja',
    image: 'images/sensoriatour.webp',
  },
  {
    id: 164721,
    title: 'Palo Verde Boat Tour & Lunch – Cipancí',
    description: 'Discover the best of Palo Verde in one day. Cruise the Tempisque River to spot wildlife, enjoy a traditional Guanacaste lunch, and visit Guaitil to experience authentic Chorotega pottery in the Nicoya Blue Zone.',
    category: 'Wildlife',
    duration: '4h',
    difficulty: 'Easy',
    location: 'Palo Verde, Guanacaste',
    image: 'images/paloverdetour.webp',
  },
  {
    id: 509306,
    title: 'Rincón de La Vieja & Liberia City Tour',
    description: 'Volcanos, Rainforest and Historic Cities. All in one awesome adventure!',
    category: 'Adventure',
    duration: '8h',
    difficulty: 'Easy',
    location: 'Liberia, Guanacaste',
    image: 'images/rincontoour.webp',
  },
  {
    id: 544000,
    title: 'Dry Forest Canopy Tour – Guanacaste',
    description: 'Explore the Dry Forest, gliding on the tree tops, hanging like a monkey, or flying like a bird.',
    category: 'Adventure',
    duration: '3h',
    difficulty: 'Easy',
    location: 'Guanacaste',
    image: 'images/dryforest.webp',
  },
  {
    id: 238021,
    title: 'Tenorio River White Water Rafting',
    description: 'When sailing the river course, the raft riders encounter turbulent waters, exciting waterfalls, quiet pools, high rock walls, and wildlife, while being splashed and thrilled.',
    category: 'Nature',
    duration: '8h',
    difficulty: 'Challenging',
    location: 'Parque Nac. Tenorio',
    image: 'images/tenoriotour.webp',
  },
];

type Props = {
  searchQuery?: string;
};

export default function BokunToursGrid({ searchQuery = '' }: Props) {
  const [activeTourId, setActiveTourId] = useState<number | null>(null);

  const visibleTours = searchQuery.trim()
    ? TOURS.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TOURS;

  useEffect(() => {
    if (activeTourId === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTourId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeTourId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTours.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10">No tours match your search.</p>
        )}
        {visibleTours.map((tour) => (
          <button
            key={tour.id}
            onClick={() => setActiveTourId(tour.id)}
            className="group text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {tour.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-secondary/90 transition-transform duration-500 group-hover:scale-105" />
              )}
              {/* Category badge over image */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                {tour.category}
              </span>
            </div>

            {/* Card body */}
            <div className="px-4 py-4 flex flex-col gap-2">
              <h3 className="font-heading font-bold text-gray-900 text-xl leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {tour.description}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {/* Duration */}
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                  {tour.duration}
                </span>

                {/* Difficulty */}
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${difficultyStyles[tour.difficulty]}`}>
                  {tour.difficulty}
                </span>

                {/* Location */}
                <span className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-7-7.5-7-11a7 7 0 1114 0c0 3.5-3 7-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {tour.location}
                </span>
              </div>

              {/* Book Now */}
              <span className="mt-1 self-end bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg group-hover:bg-primary-hover transition-colors whitespace-nowrap">
                Book Now
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal overlay */}
      {activeTourId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActiveTourId(null)}
        >
          <div
            className="relative bg-white rounded-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveTourId(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white shadow-md text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe
              key={activeTourId}
              src={`https://widgets.bokun.io/online-sales/${CHANNEL_UUID}/experience/${activeTourId}`}
              className="w-full rounded-xl"
              style={{ border: 'none', minHeight: '85vh' }}
              title="Booking"
            />
          </div>
        </div>
      )}
    </>
  );
}
