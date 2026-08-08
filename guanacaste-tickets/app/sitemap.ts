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

  const now = new Date();

  return [
    { url: SITE_URL, priority: 1.0, changeFrequency: 'daily', lastModified: now },
    { url: `${SITE_URL}/tours`, priority: 0.9, changeFrequency: 'daily', lastModified: now },
    { url: `${SITE_URL}/faq`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2025-01-01') },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2025-01-01') },
    ...tourEntries,
  ];
}
