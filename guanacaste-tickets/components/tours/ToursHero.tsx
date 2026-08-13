'use client';

import Image from 'next/image';

const DEFAULT_IMAGE = { src: '/images/santarosatour.webp.webp', alt: 'Wildlife and trails at Santa Rosa National Park' };
const DEFAULT_TITLE = 'Tours in Guanacaste';
const DEFAULT_SUBTITLE = 'Adventure, wildlife, and nature experiences — led by local guides, booked direct at the best price.';

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  title?: string;
  subtitle?: string;
  image?: { src: string; alt: string };
  showSearch?: boolean;
};

export default function ToursHero({
  searchQuery,
  onSearchChange,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  image = DEFAULT_IMAGE,
  showSearch = true,
}: Props) {
  return (
    <section className="relative flex items-center overflow-hidden" style={{ height: 'clamp(320px, 42vh, 440px)' }}>

      {/* Image */}
      <div className="absolute inset-0">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Overlay — dark wash so text and the search bar stay readable on any photo */}
      <div className="absolute inset-0 bg-black/45 z-10" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-4">
        <h1 className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight">
          {title}
        </h1>
        <p className="text-white/85 text-sm md:text-base max-w-xl">
          {subtitle}
        </p>

        {/* Search bar */}
        {showSearch && (
          <div className="w-full max-w-xl">
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
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 md:pl-11 pr-4 py-2.5 md:py-3.5 rounded-2xl border-2 border-transparent bg-white text-sm text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:border-primary transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
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
        )}
      </div>
    </section>
  );
}
