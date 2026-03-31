'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TourGalleryProps {
  images: string[];
  tourTitle: string;
}

export default function TourGallery({ images, tourTitle }: TourGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-xl text-gray-500 text-lg">
        No images available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={images[activeIndex]}
          alt={`${tourTitle} - photo ${activeIndex + 1}`}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                activeIndex === index ? 'border-blue-500' : 'border-transparent'
              }`}
              aria-label={`${tourTitle} - photo ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${tourTitle} - photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
