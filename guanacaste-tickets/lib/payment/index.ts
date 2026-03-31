import { WHATSAPP_NUMBER } from '@/lib/config';
import { WhatsAppAdapter } from './whatsapp-adapter';
import type { PaymentAdapter } from './types';

export { WhatsAppAdapter } from './whatsapp-adapter';
export type { PaymentAdapter, BookingSummary, BookingResult, BookingItem } from './types';

export const paymentGateway: PaymentAdapter = new WhatsAppAdapter(WHATSAPP_NUMBER);
