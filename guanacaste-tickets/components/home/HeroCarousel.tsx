'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/config';

type Props = { images: string[] };

export default function HeroCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % images.length;
      });
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative flex items-center justify-center text-center overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>

      {/* Images — crossfade */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image src={src} alt="Guanacaste, Costa Rica" fill priority={i === 0} sizes="100vw" className="object-cover" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/38 z-10" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-5 px-4 max-w-3xl mx-auto">
        <h1 className="font-heading font-bold text-white text-4xl md:text-6xl leading-tight animate-fade-up delay-200">
          Your Adventure in<br />Guanacaste Starts Here
        </h1>
        <p className="text-white/90 text-lg md:text-xl animate-fade-up delay-300">
          Handpicked tours with local experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-400">
          <Link href="/tours" className="inline-flex items-center justify-center bg-[#0077B6] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#005f8e] transition-colors text-base shadow-lg">
            Browse Tours
          </Link>
         
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrev(current); setCurrent(i); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? 'bg-white w-4 h-2' : 'bg-white/50 w-2 h-2'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
