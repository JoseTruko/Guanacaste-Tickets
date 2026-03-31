import Reveal from '@/components/ui/Reveal';

const testimonials = [
  {
    name: 'Sarah M.',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    text: 'The zip-line tour was absolutely incredible! The guides were professional and made us feel safe the whole time. Best experience of our Costa Rica trip!',
  },
  {
    name: 'Thomas B.',
    country: 'Germany',
    flag: '🇩🇪',
    rating: 5,
    text: 'Snorkeling at the Catalina Islands was breathtaking. We saw manta rays and reef sharks up close. Booking via WhatsApp was super fast and easy.',
  },
  {
    name: 'Camille D.',
    country: 'France',
    flag: '🇫🇷',
    rating: 4,
    text: 'The cultural heritage tour gave us a real taste of Guanacaste. The food was delicious and our guide was incredibly knowledgeable. Highly recommend!',
  },
  {
    name: 'James O.',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rating: 5,
    text: 'Sunset sailing in Tamarindo was magical. Dolphins showed up right on cue, the cocktails were great, and the sunset was out of this world.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill={i < rating ? '#FFB347' : '#D1D5DB'}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-8 text-center">
            What Travelers Say
          </h2>
        </Reveal>

        {/* Mobile: horizontal scroll with snap; Desktop: grid */}
        <div
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="flex-shrink-0 w-72 md:w-auto">
              <article
                className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col gap-3 h-full"
                style={{ scrollSnapAlign: 'start' }}
              >
                <StarRating rating={t.rating} />
                <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="pt-2 border-t border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">
                    {t.flag} {t.country}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
