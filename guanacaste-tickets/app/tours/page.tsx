import AllToursSection from '@/components/home/AllToursSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tours | Guanacaste Tickets',
  description: 'Browse all tours and experiences available in Guanacaste, Costa Rica.',
};

export default function ToursPage() {
  return (
    <main>
      <AllToursSection />
    </main>
  );
}
