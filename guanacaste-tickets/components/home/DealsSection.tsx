import Reveal from '@/components/ui/Reveal';
import Script from 'next/script';

export default function DealsSection() {
  return (
    <section id="deals" className="py-16 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-2 text-center">
            Hot Deals
          </h2>
          <p className="text-center text-neutral mb-10">
            Top experiences curated by our trusted local provider
          </p>
        </Reveal>

        {/* Bokun widget */}
        <div className="bokun-wrapper">
          <div
            className="bokunWidget"
            data-src="https://widgets.bokun.io/online-sales/e75ced95-7cfd-4bdf-acfe-c97be1faa9bf/product-list/106270"
          />
          <noscript>Please enable javascript in your browser to book</noscript>
        </div>

        <Script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=e75ced95-7cfd-4bdf-acfe-c97be1faa9bf"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}
