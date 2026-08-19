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

export interface PriceBracket {
  minPeople: number;
  maxPeople?: number;
  adultPrice: number;
  childPrice: number;
}

export interface TransportZone {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  childPricePerPerson?: number;
  included: string[];
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  childPrice: number;
  pricingBrackets?: PriceBracket[];
  transportZones?: TransportZone[];
  transportRequired?: boolean;
  currency: 'USD';
  duration: number;
  category: TourCategory;
  location?: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  languages: string[];
  minGroupSize: number;
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

export interface BookingItem {
  tourId: string;
  tourTitle: string;
  tourSlug: string;
  date: string;
  adults: number;
  children: number;
  adultPrice: number;
  childPrice: number;
  transportZone?: { id: string; name: string };
  subtotal: number;
}

export interface BookingSummary {
  items: BookingItem[];
  grandTotal: number;
  currency: 'USD';
  customerName: string;
  customerEmail: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerPhone?: string;
  customerLanguage?: string;
  gclid?: string;
}

export interface BookingResult {
  success: boolean;
  message: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking extends BookingSummary {
  id: string;
  status: BookingStatus;
  createdAt: string;
  paymentLink?: string;
  adminComment?: string;
  confirmedAt?: string;
  confirmedBy?: string;
  cancelledReason?: string;
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
