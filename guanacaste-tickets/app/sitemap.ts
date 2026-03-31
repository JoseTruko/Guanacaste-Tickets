import type { MetadataRoute } from 'next';
import { getAllToursFromDB } from '@/lib/data/tours-db';
import { SITE_URL } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getAllToursFromDB();

  const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly',
  }));

  return [
    { url: SITE_URL, priority: 1.0 },
    { url: `${SITE_URL}/tours`, priority: 0.9 },
    { url: `${SITE_URL}/faq`, priority: 0.7 },
    { url: `${SITE_URL}/contact`, priority: 0.7 },
    { url: `${SITE_URL}/real-estate`, priority: 0.6 },
    ...tourEntries,
  ];
}
