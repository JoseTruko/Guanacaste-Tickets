'use client';

import { useEffect, useRef, useState } from 'react';

const HIDE_THRESHOLD = 80;

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < HIDE_THRESHOLD) {
          setHidden(false);
        } else if (y > lastY.current) {
          setHidden(true);
        } else if (y < lastY.current) {
          setHidden(false);
        }
        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return hidden;
}
