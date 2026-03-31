import type { FAQItem } from '@/types/index';

const generalFAQs: FAQItem[] = [
  {
    question: 'How do I book a tour?',
    answer:
      'Select your tour, choose your date and number of participants, then click "Book Now" to send your reservation directly via WhatsApp, or "Add to Cart" to bundle multiple tours and confirm them all at once.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We currently process bookings through WhatsApp, where our team will guide you through payment options including credit/debit cards (Visa, Mastercard), PayPal, and cash on arrival for select tours.',
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer:
      'Each tour has its own cancellation policy, clearly displayed on the tour page. Most tours offer free cancellation up to 24–48 hours before the start time. Rescheduling is generally allowed up to 12 hours before departure.',
  },
  {
    question: 'Are prices per person or per group?',
    answer:
      'All prices listed are per person. Adult and child prices are shown separately. Your total is calculated automatically based on the number of participants you select.',
  },
  {
    question: 'What is the minimum age for tours?',
    answer:
      'Minimum age varies by tour. Adventure tours like zip-lining typically require participants to be at least 5 years old. Wildlife and cultural tours are generally suitable for all ages. Check the individual tour page for specific age requirements.',
  },
  {
    question: 'What happens if a tour is cancelled due to weather?',
    answer:
      'Safety is our top priority. If we cancel a tour due to adverse weather or safety concerns, you will receive a full refund or the option to reschedule at no extra cost. We will notify you as early as possible.',
  },
  {
    question: 'Do I need travel insurance?',
    answer:
      'We strongly recommend purchasing travel insurance before your trip. While our tours include basic safety coverage, personal travel insurance protects you against trip cancellations, medical emergencies, and lost belongings.',
  },
  {
    question: 'How do I contact you for support?',
    answer:
      'The fastest way to reach us is via WhatsApp. You can also use the contact form on our Contact page. We typically respond within 1 hour during business hours (7am–8pm Costa Rica time).',
  },
];

export function getGeneralFAQs(): FAQItem[] {
  return generalFAQs;
}
