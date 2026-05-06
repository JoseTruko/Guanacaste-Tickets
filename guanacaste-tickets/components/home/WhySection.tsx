import Reveal from '@/components/ui/Reveal';

const stops = [
  {
    title: 'Born & based in Guanacaste',
    description: 'Our team lives here year-round — no remote operators, no guesswork.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Direct pricing, no markups',
    description: 'We partner directly with top operators so you pay the fair rate every time.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function MapPin({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-primary/15">
        {icon}
      </div>
      <div
        className="w-0 h-0 mt-0.5"
        style={{
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: '9px solid #1B6B3A',
        }}
      />
    </div>
  );
}

function RouteConnector() {
  return (
    <>
      {/* Desktop: arched dashed path */}
      <div className="hidden md:flex items-end justify-center w-44 flex-shrink-0 pb-10">
        <svg viewBox="0 0 176 64" fill="none" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 8 52 Q 88 4 168 52"
            stroke="#1B6B3A"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            fill="none"
            opacity="0.4"
          />
          {/* Compass waypoint at arc peak */}
          <g transform="translate(88,17)">
            <circle r="8" fill="#F0F7F3" stroke="#1B6B3A" strokeWidth="1.5" opacity="0.9" />
            <path
              d="M0,-5 L1.4,-1.4 L5,0 L1.4,1.4 L0,5 L-1.4,1.4 L-5,0 L-1.4,-1.4 Z"
              fill="#1B6B3A"
              opacity="0.75"
            />
          </g>
        </svg>
      </div>

      {/* Mobile: vertical dashed line */}
      <div className="md:hidden flex justify-center py-3">
        <svg width="28" height="44" viewBox="0 0 28 44" fill="none">
          <line x1="14" y1="0" x2="14" y2="44" stroke="#1B6B3A" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.4" />
          <circle cx="14" cy="22" r="6" fill="#F0F7F3" stroke="#1B6B3A" strokeWidth="1.5" opacity="0.9" />
          <path
            d="M14,17 L15.2,20.8 L19,22 L15.2,23.2 L14,27 L12.8,23.2 L9,22 L12.8,20.8 Z"
            fill="#1B6B3A"
            opacity="0.75"
          />
        </svg>
      </div>
    </>
  );
}

export default function WhySection() {
  return (
    <section className="py-20 px-4 bg-surface overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-center">

          <Reveal className="flex-1 w-full">
            <div className="flex flex-col items-center text-center gap-4 px-6 md:px-12">
              <MapPin icon={stops[0].icon} />
              <div className="space-y-2 mt-1">
                <h3 className="font-heading font-bold text-gray-900 text-lg leading-snug">
                  {stops[0].title}
                </h3>
                <p className="text-neutral text-sm leading-relaxed max-w-xs mx-auto">
                  {stops[0].description}
                </p>
              </div>
            </div>
          </Reveal>

          <RouteConnector />

          <Reveal delay={220} className="flex-1 w-full">
            <div className="flex flex-col items-center text-center gap-4 px-6 md:px-12">
              <MapPin icon={stops[1].icon} />
              <div className="space-y-2 mt-1">
                <h3 className="font-heading font-bold text-gray-900 text-lg leading-snug">
                  {stops[1].title}
                </h3>
                <p className="text-neutral text-sm leading-relaxed max-w-xs mx-auto">
                  {stops[1].description}
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
