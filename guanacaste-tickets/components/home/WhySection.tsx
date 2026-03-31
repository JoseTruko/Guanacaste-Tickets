import Reveal from '@/components/ui/Reveal';

const valueProps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Local Experts',
    description: 'Born and raised in Guanacaste, we know every hidden gem.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Best Price Guarantee',
    description: 'We match any price. Book with confidence.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Free Cancellation',
    description: 'Most tours offer free cancellation up to 24h before.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Instant Confirmation',
    description: 'Get your booking confirmed via WhatsApp in minutes.',
  },
];

export default function WhySection() {
  return (
    <section className="py-16 px-4 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-10 text-center">
            Why Guanacaste Tickets?
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((vp, i) => (
            <Reveal key={vp.title} delay={i * 100}>
              <div className="flex flex-col items-center text-center gap-3 bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="text-secondary">{vp.icon}</div>
                <h3 className="font-heading font-bold text-gray-900 text-base leading-snug">
                  {vp.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{vp.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
