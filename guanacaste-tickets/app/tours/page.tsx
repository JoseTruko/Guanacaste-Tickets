import ToursPageContent from '@/components/tours/ToursPageContent';
import { getAllToursFromDB } from '@/lib/data/tours-db';
import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Tours in Guanacaste & Rincón de la Vieja | Guanacaste Tickets',
  description: 'Browse all tours and experiences available in Guanacaste & Rincón de la Vieja, Costa Rica.',
};

export default async function ToursPage() {
  const tours = await getAllToursFromDB();

  return (
    <main>
      <ToursPageContent tours={tours} />
    </main>
  );
}
