import type { Metadata } from 'next';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { getGeneralFAQs } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about tours, bookings, cancellations, and activities in Guanacaste, Costa Rica.',
};

export default function FAQPage() {
  const faqs = getGeneralFAQs();

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-lg">
            Everything you need to know before booking your Guanacaste adventure.
          </p>
        </div>
        <FAQAccordion items={faqs} />
      </div>
    </main>
  );
}
