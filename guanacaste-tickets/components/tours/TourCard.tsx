import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/types/index';

type TourCardProps = {
  tour: Tour;
  variant?: 'featured' | 'standard';
};

const difficultyStyles: Record<Tour['difficulty'], string> = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Challenging: 'bg-red-100 text-red-700',
};

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {tour.images[0] ? (
          <Image
            src={tour.images[0]}
            alt={`${tour.title} tour`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-secondary/90" />
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
          {tour.shortDescription}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          {/* Duration */}
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            {tour.duration}h
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
            {tour.meetingPoint}
          </span>
        </div>

        {/* Book Now */}
        <span className="mt-1 self-end bg-primary text-white text-xs font-semibold px-3 py-1.5 border border-primary rounded-sm group-hover:bg-primary-hover transition-colors whitespace-nowrap">
          Book Now
        </span>
      </div>
    </Link>
  );
}
