import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Guanacaste Tickets',
  description: 'Privacy Policy for Guanacaste Tickets.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-heading font-bold text-3xl text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">Last updated: January 1, 2025</p>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">1. Information We Collect</h2>
          <p>
            When you make a booking or contact us, we collect personal information such as your name,
            email address, and the details of your booking (tour, date, number of participants).
            This information is used solely to process your booking and communicate with you.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Process and confirm your tour bookings</li>
            <li>Communicate with you about your booking via WhatsApp or email</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Improve our services and website experience</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties.
            Your booking details may be shared with the tour operator responsible for your selected
            activity in order to fulfill your reservation.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">4. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes
            outlined in this policy or as required by law.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">5. Cookies</h2>
          <p>
            Our website uses browser storage (localStorage) to save your cart between sessions.
            No tracking cookies or third-party analytics are used.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">6. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal
            information. To exercise these rights, please contact us via WhatsApp or the contact form.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2">7. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please reach out through our{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
