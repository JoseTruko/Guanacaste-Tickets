import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/config';

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center text-center overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Background image */}
      <Image
        src="/images/lapa.webp"
        alt="Guanacaste, Costa Rica"
        fill
        priority
        sizes="100vw"
        className="object-cover animate-fade-in"
      />

      {/* Overlay — subtle */}
      <div className="absolute inset-0 bg-black/38" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-4 max-w-3xl mx-auto">

        {/* Headline */}
        <h1 className="font-heading font-bold text-white text-4xl md:text-6xl leading-tight animate-fade-up delay-200">
          Your Adventure in<br />Guanacaste Starts Here
        </h1>

        {/* Subheadline */}
        <p className="text-white/90 text-lg md:text-xl animate-fade-up delay-300">
          Handpicked tours with local experts.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-400">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center bg-[#0077B6] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f8e] transition-colors text-base shadow-lg"
          >
            Browse Tours
          </Link>
        
        </div>
      </div>
    </section>
  );
}
