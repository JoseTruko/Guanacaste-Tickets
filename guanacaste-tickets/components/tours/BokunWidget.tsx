'use client';

import Script from 'next/script';

export default function BokunWidget() {
  return (
    <div className="bokun-wrapper">
      <div
        className="bokunWidget"
        data-src="https://widgets.bokun.io/online-sales/e75ced95-7cfd-4bdf-acfe-c97be1faa9bf/product-list/106270"
      />
      <noscript>Please enable javascript in your browser to book</noscript>
      <Script
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=e75ced95-7cfd-4bdf-acfe-c97be1faa9bf"
        strategy="lazyOnload"
      />
    </div>
  );
}
