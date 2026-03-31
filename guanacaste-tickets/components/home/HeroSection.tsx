import Image from 'next/image';
import Button from '@/components/ui/Button';

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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 max-w-3xl mx-auto">
        <h1 className="font-heading font-bold text-white text-4xl md:text-6xl leading-tight animate-fade-up delay-200">
          Explore Guanacaste
        </h1>
        <p className="text-white/90 text-lg md:text-xl animate-fade-up delay-300">
          Discover the best tours and adventures in Costa Rica&apos;s most beautiful province
        </p>
        <div className="animate-fade-up delay-400">
          <Button href="/tours" variant="primary" size="lg">
            Browse Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
