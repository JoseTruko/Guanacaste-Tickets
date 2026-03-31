// Global TypeScript interfaces for Guanacaste Tickets Website

export type TourCategory = 'Adventure' | 'Beach' | 'Wildlife' | 'Cultural' | string;

export interface CancellationPolicy {
  description: string;
  freeCancellation: boolean;
  deadlineHours?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  childPrice: number;
  currency: 'USD';
  duration: number;
  category: TourCategory;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  languages: string[];
  maxGroupSize: number;
  images: string[];
  featured: boolean;
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
  whatToBring: string[];
  faqs: FAQItem[];
  cancellationPolicy: CancellationPolicy;
  agencyId?: string;
}

export interface Agency {
  id: string;
  name: string;
  contactEmail: string;
  toursOffered: string[];
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: 'USD';
  image: string;
  contactUrl: string;
}

export interface BookingItem {
  tourId: string;
  tourTitle: string;
  tourSlug: string;
  date: string;
  adults: number;
  children: number;
  adultPrice: number;
  childPrice: number;
  subtotal: number;
}

export interface BookingSummary {
  items: BookingItem[];
  grandTotal: number;
  currency: 'USD';
}

export interface BookingResult {
  success: boolean;
  message: string;
  whatsappUrl?: string;
}

export interface PaymentAdapter {
  processBooking(summary: BookingSummary): Promise<BookingResult>;
}

export interface CartState {
  items: BookingItem[];
  addItem: (item: BookingItem) => void;
  removeItem: (tourId: string, date: string) => void;
  clearCart: () => void;
  grandTotal: () => number;
}
