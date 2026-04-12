import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { WHATSAPP_NUMBER } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Guanacaste Tickets team. We\'re here to help you plan your perfect Costa Rica adventure.',
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-500 text-lg">
            Have a question or need help planning your trip? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                Reach us directly
              </h2>
              <p className="text-gray-500 mb-6">
                The fastest way to get a response is via WhatsApp. We typically reply within 1 hour
                during business hours (7am–8pm Costa Rica time).
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1ebe5d] transition-colors duration-150 text-base"
              >
                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.428a.75.75 0 0 0 .916.916l5.638-1.47A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.953-1.355l-.355-.212-3.683.96.979-3.595-.232-.37A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:info@guanacastetickets.com" className="text-[#0077B6] hover:underline text-sm">
                info@guanacastetickets.com
              </a>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-500 text-sm">Monday – Sunday: 7:00 am – 8:00 pm (CST)</p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Based in</h3>
              <p className="text-gray-500 text-sm">Guanacaste, Costa Rica 🇨🇷</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
