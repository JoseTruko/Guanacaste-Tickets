'use client';

import { useEffect } from 'react';
import { captureGclid } from '@/lib/analytics';

export default function GclidCapture() {
  useEffect(() => {
    captureGclid();
  }, []);

  return null;
}
