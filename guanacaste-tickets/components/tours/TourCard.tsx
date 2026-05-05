import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/types/index';
import Badge from '@/components/ui/Badge';

type TourCardProps = {
  tour: Tour;
  variant?: 'featured' | 'standard';
};

const difficultyColor: Record<Tour['difficulty'], string> = {
  Easy: 'text-green-600',
  Moderate: 'text-amber-600',
  Challenging: 'text-red-600',
};

export default function TourCard({ tour, variant = 'standard' }: TourCardProps) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Square image */}
      <div className="relative aspect-square overflow-hidden">
        {tour.images[0] ? (
          <Image
            src={tour.images[0]}
            alt={`${tour.title} tour`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {variant === 'featured' && <Badge variant="featured">Featured</Badge>}
          {tour.cancellationPolicy.freeCancellation && (
            <Badge variant="free-cancellation">Free Cancellation</Badge>
          )}
        </div>
      </div>

      {/* Compact footer */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-heading font-semibold text-gray-900 text-sm leading-snug truncate">
            {tour.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
            <span>{tour.duration}h</span>
            <span>·</span>
            <span className={difficultyColor[tour.difficulty]}>{tour.difficulty}</span>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <div className="text-right">
            <span className="text-gray-900 font-bold text-sm">${tour.price}</span>
            <span className="text-xs text-gray-400"> USD</span>
          </div>
          <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-md mt-1 group-hover:bg-primary-hover transition-colors whitespace-nowrap">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  );
}
