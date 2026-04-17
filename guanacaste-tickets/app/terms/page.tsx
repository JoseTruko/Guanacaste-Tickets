import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Guanacaste Tickets',
  description: 'Terms of Service for Guanacaste Tickets.',
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-8">Terms of Service</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: January 1, 2025</p>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Guanacaste Tickets, you accept and agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">2. Booking Process</h2>
          <p>
            All bookings made through our website are requests and are subject to availability
            confirmation. A booking is only confirmed once you receive a confirmation message from
            us via WhatsApp. Prices are listed in USD and are subject to change without notice.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">3. Cancellation Policy</h2>
          <p>
            Cancellation policies vary by tour and are clearly stated on each tour&apos;s detail page.
            Please review the specific cancellation policy before booking. In general:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Free cancellations are available up to the stated deadline before the tour date</li>
            <li>Cancellations after the deadline may not be eligible for a refund</li>
            <li>No-shows are non-refundable</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">4. Participant Responsibilities</h2>
          <p>
            Participants are responsible for ensuring they meet any physical requirements for their
            chosen tour. Guanacaste Tickets and its tour operators reserve the right to refuse
            participation if a participant is deemed unfit or poses a safety risk.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">5. Liability</h2>
          <p>
            Guanacaste Tickets acts as an intermediary between customers and tour operators.
            We are not liable for any injury, loss, or damage that may occur during a tour.
            Participation in adventure activities carries inherent risks that participants accept
            by booking.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">6. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, and logos, is the property of
            Guanacaste Tickets and may not be reproduced without written permission.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the website
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">8. Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us through our{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
