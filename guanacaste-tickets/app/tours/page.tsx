import AllToursSection from '@/components/home/AllToursSection';
import BokunWidget from '@/components/tours/BokunWidget';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tours | Guanacaste Tickets',
  description: 'Browse all tours and experiences available in Guanacaste, Costa Rica.',
};

export default function ToursPage() {
  return (
    <main>
      <AllToursSection />

      {/* Provider tours */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-2 text-center">
            More Experiences
          </h2>
          <p className="text-center text-neutral mb-10">
            Additional tours available through our trusted local provider
          </p>
          <BokunWidget />
        </div>
      </section>
    </main>
  );
}
