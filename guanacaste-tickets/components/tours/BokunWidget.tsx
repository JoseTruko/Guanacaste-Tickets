'use client';

import { useEffect } from 'react';

const BOKUN_SRC =
  'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=e75ced95-7cfd-4bdf-acfe-c97be1faa9bf';

export default function BokunWidget() {
  useEffect(() => {
    const existing = document.querySelector(`script[src="${BOKUN_SRC}"]`);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = BOKUN_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="bokun-wrapper">
      <div
        className="bokunWidget"
        data-src="https://widgets.bokun.io/online-sales/e75ced95-7cfd-4bdf-acfe-c97be1faa9bf/product-list/106270"
      />
      <noscript>Please enable javascript in your browser to book</noscript>
    </div>
  );
}
