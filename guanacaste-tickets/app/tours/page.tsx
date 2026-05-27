import AllToursSection from '@/components/home/AllToursSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tours in Guanacaste & Rincón de la Vieja | Guanacaste Tickets',
  description: 'Browse all tours and experiences available in Guanacaste & Rincón de la Vieja, Costa Rica.',
};

export default function ToursPage() {
  return (
    <main>
      <AllToursSection />
    </main>
  );
}
