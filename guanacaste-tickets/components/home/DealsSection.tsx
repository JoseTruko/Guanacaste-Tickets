import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';
import BokunToursGrid from '@/components/tours/BokunToursGrid';

export default function DealsSection() {
  return (
    <section id="deals" className="py-16 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-2 text-center">
            Deals & Experiences
          </h2>
          <p className="text-center text-neutral mb-10">
            Featured tours in Guanacaste and Rincon de la Vieja.
          </p>
        </Reveal>

        <BokunToursGrid />

        <Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-hover transition-colors"
            >
              See all available tours
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
