'use client';

import { useEffect } from 'react';

const BOKUN_SRC =
  'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=3b187e28-3474-44e2-99b1-b906a1fa827e';

function removeExistingBokunScripts() {
  document
    .querySelectorAll<HTMLScriptElement>('script[src*="BokunWidgetsLoader.js?bookingChannelUUID="]')
    .forEach((script) => script.remove());
}

export default function BokunWidget() {
  useEffect(() => {
    removeExistingBokunScripts();

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
        data-src="https://widgets.bokun.io/online-sales/3b187e28-3474-44e2-99b1-b906a1fa827e/product-list/109074"
      />
      <noscript>Please enable javascript in your browser to book</noscript>
    </div>
  );
}
