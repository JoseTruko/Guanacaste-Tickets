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

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  childPrice: number;
  pricingBrackets?: PriceBracket[];
  currency: 'USD';
  duration: number;
  category: TourCategory;
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

export interface Property {
  id: string;
  slug?: string;
  title: string;
  shortDescription?: string;
  description?: string;
  location: string;
  price: number;
  currency: 'USD';
  propertyType?: 'House' | 'Condo' | 'Lot' | 'Villa' | string;
  status?: 'For Sale' | 'For Rent' | 'Sold' | string;
  builtArea?: number;
  landArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  yearBuilt?: number;
  amenities?: string[];
  image: string;
  images?: string[];
  videoUrl?: string;
  floorPlanUrl?: string;
  contactUrl: string;
  externalUrl?: string;
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
  customerName: string;
  customerEmail: string;
}

export interface BookingResult {
  success: boolean;
  message: string;
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
