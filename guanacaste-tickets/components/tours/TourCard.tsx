import Image from 'next/image';
import type { Tour } from '@/types/index';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

type TourCardProps = {
  tour: Tour;
  variant?: 'featured' | 'standard';
};

const difficultyIcon: Record<Tour['difficulty'], string> = {
  Easy: '🟢',
  Moderate: '🟡',
  Challenging: '🔴',
};

export default function TourCard({ tour, variant = 'standard' }: TourCardProps) {
  const truncated =
    tour.shortDescription.length > 120
      ? tour.shortDescription.slice(0, 120) + '…'
      : tour.shortDescription;

  return (
    <article className="group flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={tour.images[0]}
          alt={`${tour.title} tour`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {variant === 'featured' && (
            <Badge variant="featured">⭐ Featured Deal</Badge>
          )}
          {tour.cancellationPolicy.freeCancellation && (
            <Badge variant="free-cancellation">✓ Free Cancellation</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-heading font-bold text-lg text-gray-900 leading-snug">
          {tour.title}
        </h3>

        <p className="text-sm text-gray-600 flex-1">{truncated}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>⏱ {tour.duration} hours</span>
          <span>
            {difficultyIcon[tour.difficulty]} {tour.difficulty}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <p className="text-base font-semibold text-primary">
            From ${tour.price} USD / adult
          </p>
          <Button href={`/tours/${tour.slug}`} size="sm">
            Book Now
          </Button>
        </div>
      </div>
    </article>
  );
}
