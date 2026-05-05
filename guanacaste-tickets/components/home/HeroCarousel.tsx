'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/config';

type Props = { images: string[] };

export default function HeroCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative flex items-center overflow-hidden" style={{ height: 'clamp(380px, 55vh, 620px)' }}>

      {/* Images — crossfade */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image src={src} alt="Guanacaste, Costa Rica" fill priority={i === 0} sizes="100vw" className="object-cover" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-10" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:pl-12 lg:pl-20">
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 md:max-w-lg">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest animate-fade-up delay-100">
            Guanacaste, Costa Rica
          </p>
          <h1 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight animate-fade-up delay-200">
            Beyond the beach.
          </h1>
          <p className="text-white/80 text-sm md:text-base animate-fade-up delay-300 max-w-sm md:max-w-none">
            Expert-led tours with people who actually live here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-400">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center bg-primary text-white font-semibold px-7 py-2.5 rounded-lg hover:bg-primary-hover transition-colors text-sm shadow-lg"
            >
              Explore Tours
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-2.5 rounded-lg hover:bg-white/25 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Ask a question
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? 'bg-white w-4 h-2' : 'bg-white/50 w-2 h-2'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
