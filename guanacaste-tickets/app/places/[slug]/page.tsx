import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllToursFromDB } from '@/lib/data/tours-db';
import { PLACES, getPlaceBySlug } from '@/lib/data/places';
import { SITE_URL } from '@/lib/config';
import PlacePageContent from '@/components/places/PlacePageContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export async function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};

  const placeUrl = `${SITE_URL}/places/${place.slug}`;

  return {
    title: `${place.name} Tours & Activities | Guanacaste Tickets`,
    description: place.description,
    alternates: { canonical: placeUrl },
    openGraph: {
      title: `${place.name} Tours & Activities`,
      description: place.description,
      images: [{ url: place.heroImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${place.name} Tours & Activities`,
      description: place.description,
      images: [place.heroImage],
    },
  };
}

export default async function PlacePage({ params }: PageProps) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const allTours = await getAllToursFromDB();
  const tours = allTours.filter((t) => t.location?.toLowerCase() === place.name.toLowerCase());

  return (
    <main>
      <PlacePageContent place={place} tours={tours} />
    </main>
  );
}
