declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GCLID_KEY = 'gt_gclid';

// Google Ads appends ?gclid=... to the landing URL when a visitor comes from an ad.
// We stash it in sessionStorage so it survives navigation to the tour page and can
// be attached to the booking request, even before a full conversion API is wired up.
export function captureGclid() {
  if (typeof window === 'undefined') return;
  const gclid = new URLSearchParams(window.location.search).get('gclid');
  if (!gclid) return;
  try {
    sessionStorage.setItem(GCLID_KEY, gclid);
  } catch {
    // sessionStorage unavailable (privacy mode, etc.) — safe to ignore
  }
}

export function getStoredGclid(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    return sessionStorage.getItem(GCLID_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

export function trackConversion(value: number, currency = 'USD') {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'generate_lead', { value, currency });

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (adsId && label) {
    window.gtag('event', 'conversion', {
      send_to: `${adsId}/${label}`,
      value,
      currency,
    });
  }
}
