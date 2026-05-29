'use client';

import { useState, useEffect } from 'react';

const CHANNEL_UUID = 'e75ced95-7cfd-4bdf-acfe-c97be1faa9bf';
const BOKUN_SRC = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${CHANNEL_UUID}`;

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
  {
    id: 614423,
    title: 'Rincón de La Vieja National Park & Hot Springs',
    description: 'This National Park is considered one of the best places in the country for hiking, due to the quality of its trails and its great weather.',
    category: 'Adventure',
    duration: '5h',
    difficulty: 'Moderate',
    location: 'Rincón de la Vieja',
    image: 'images/rinconhotspringtour.webp.webp',
  },
  {
    id: 831915,
    title: 'Buena Vista Combo: Day Pass Including Lunch',
    description: 'Start by gliding through the forest on a thrilling canopy tour, followed by a thrilling descent on a 1,200-foot (400-meter) water slide. Learn about the local cultural richness by exploring a traditional pottery shop and tasting the region.',
    category: 'Adventure',
    duration: '10h',
    difficulty: 'Challenging',
    location: 'Guanacaste',
    image: 'images/buenavistatour.webp.webp',
  },
  {
    id: 164739,
    title: 'Guachipelín Adventure Combo Incl. Lunch & Hot Springs',
    description: '6 adventures, nature and volcanic landscapes at the same experience. One of the best outdoor adventures in Guanacaste',
    category: 'Adventure',
    duration: '12h',
    difficulty: 'Moderate',
    location: 'Guachipelín, Guanacaste',
    image: 'images/guachipilintour.webp.webp',
  },
  {
    id: 613673,
    title: 'Safari Float on Corobicí & Llanos de Cortéz Waterfalls',
    description: 'Enjoy a tranquil floating safari on the Corobicí River, spotting wildlife with a naturalist guide, followed by time to relax and swim at the beautiful Llanos de Cortés Waterfall.',
    category: 'Wildlife',
    duration: '4h',
    difficulty: 'Easy',
    location: 'Río Corobicí',
    image: 'images/safaritour.webp.webp',
  },
  {
    id: 614228,
    title: 'ATV Mountain and Beach',
    description: 'Enjoy amazing ocean views and mountain landscapes riding on this 4 wheels experience.',
    category: 'Adventure',
    duration: '3h',
    difficulty: 'Easy',
    location: 'Guanacaste',
    image: 'images/atvmountaintour.webp.webp',
  },
  {
    id: 164724,
    title: 'Santa Rosa National Park & Liberia City Tour',
    description: 'An experience full of Costa Rican history, nature and culture.',
    category: 'Cultural',
    duration: '5h',
    difficulty: 'Moderate',
    location: 'Santa Rosa, Guanacaste',
    image: 'images/santarosatour.webp.webp',
  },
  
  // {
  //   id: 164763,
  //   title: 'FALTA - Arenal Místico One Day Tour from Guanacaste',
  //   description: 'Visit the iconic Arenal Volcano region: explore the jungle, enjoy hot springs, and take in breathtaking views of the volcano.',
  //   category: 'Nature',
  //   duration: '10h',
  //   difficulty: 'Easy',
  //   location: 'Arenal, Alajuela',
  // },
  {
    id: 164761,
    title: 'Arenal Volcano One Day + Hot Springs from Guanacaste',
    description: 'Round trip to Arenal Volcano area, blend magic hot springs with lush hanging bridges or a rich landscape volcano hike',
    category: 'Adventure',
    duration: '12h',
    difficulty: 'Moderate',
    location: 'Arenal, Alajuela',
    image: 'images/arenalonedaytour.webp.webp',
  },
  {
    id: 164720,
    title: 'Early Bird Watching Tour',
    description: 'Champions get up early ! This bird watching tour is a very popular activity for those that like getting up early in morning to try and spot the famous tropical birds in the peaceful, beautiful and scenic tropical dry forest of the area.',
    category: 'Wildlife',
    duration: '3h',
    difficulty: 'Easy',
    location: 'Guanacaste',
    image: 'images/earlybirdtour.webp.webp',
  },
  {
    id: 164785,
    title: 'Río Celeste & Tenorio Volcano Hike',
    description: 'Rio Celeste Rainforest Hike is one of the most beautiful and scenic rivers in Costa Rica, located in the lush rainforests of Tenorio Volcano National Park',
    category: 'Nature',
    duration: '9h',
    difficulty: 'Moderate',
    location: 'Tenorio, Alajuela',
    image: 'images/rioytenoriotour.webp.webp',
  },
  {
    id: 359436,
    title: 'Rincón Waterfalls Experience',
    description: 'These aquatic gems, located in the heart of Rincón de la Vieja, offer a postcard-worthy view, transporting you to a world of pure serenity.',
    category: 'Nature',
    duration: '6h',
    difficulty: 'Challenging',
    location: 'Rincón de la Vieja',
    image: 'images/watterfallstour.webp.webp',
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

  useEffect(() => {
    if (activeTourId === null) return;
    const existing = document.querySelector(`script[src="${BOKUN_SRC}"]`);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.src = BOKUN_SRC;
    script.async = true;
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, [activeTourId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {visibleTours.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10">No tours match your search.</p>
        )}
        {visibleTours.map((tour) => (
          <button
            key={tour.id}
            onClick={() => setActiveTourId(tour.id)}
            className="group text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
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
            <div className="px-4 py-4 flex flex-col gap-2 flex-1">
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
              <span className="mt-1 self-end bg-primary text-white text-xs font-semibold px-3 py-1.5 border border-primary rounded-sm group-hover:bg-primary-hover transition-colors whitespace-nowrap">
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

            <div className="bokun-wrapper p-4" style={{ minHeight: '85vh' }}>
              <div
                className="bokunWidget"
                data-src={`https://widgets.bokun.io/online-sales/${CHANNEL_UUID}/experience/${activeTourId}?lang=en`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
