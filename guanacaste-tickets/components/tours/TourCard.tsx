import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/types/index';
import Badge from '@/components/ui/Badge';

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
    <Link
      href={`/tours/${tour.slug}`}
      className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 aspect-[4/5]"
    >
      {/* Image */}
      {tour.images[0] ? (
        <Image
          src={tour.images[0]}
          alt={`${tour.title} tour`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300" />
      )}

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {variant === 'featured' && <Badge variant="featured">⭐ Featured Deal</Badge>}
        {tour.cancellationPolicy.freeCancellation && <Badge variant="free-cancellation">✓ Free Cancellation</Badge>}
      </div>

      {/* ── MOBILE: gradient + text always visible ── */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-10 p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)', paddingTop: '4rem' }}>
        <h3 className="font-heading font-bold text-white text-lg leading-snug drop-shadow">{tour.title}</h3>
        <div className="flex items-center gap-3 text-white/80 text-xs mt-1 mb-2">
          <span>⏱ {tour.duration}h</span>
          <span>{difficultyIcon[tour.difficulty]} {tour.difficulty}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white font-bold text-sm">From ${tour.price} USD</p>
          <span className="bg-[#0077B6] text-white text-xs font-semibold px-3 py-1 rounded-lg">Book Now →</span>
        </div>
      </div>

      {/* ── DESKTOP: minimal bottom bar, full info on hover ── */}
      {/* Default state */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
      <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 z-10 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="font-heading font-bold text-white text-lg leading-snug drop-shadow">{tour.title}</h3>
        <p className="text-white/90 text-sm font-semibold mt-1">From ${tour.price} USD / adult</p>
      </div>
      {/* Hover state */}
      <div className="hidden md:flex absolute inset-0 bg-black/70 flex-col justify-end p-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-heading font-bold text-white text-xl leading-snug mb-2">{tour.title}</h3>
        <p className="text-white/85 text-sm leading-relaxed mb-3">{truncated}</p>
        <div className="flex items-center gap-3 text-white/75 text-xs mb-4">
          <span>⏱ {tour.duration}h</span>
          <span>{difficultyIcon[tour.difficulty]} {tour.difficulty}</span>
          <span>👥 Max {tour.maxGroupSize}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white font-bold text-base">From ${tour.price} USD</p>
          <span className="bg-[#0077B6] text-white text-sm font-semibold px-4 py-1.5 rounded-lg">Book Now →</span>
        </div>
      </div>
    </Link>
  );
}
