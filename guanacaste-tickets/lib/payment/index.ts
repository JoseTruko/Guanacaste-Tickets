import { EmailAdapter } from './email-adapter';
import type { PaymentAdapter } from './types';

export { EmailAdapter } from './email-adapter';
export type { PaymentAdapter, BookingSummary, BookingResult, BookingItem } from './types';

export const paymentGateway: PaymentAdapter = new EmailAdapter();
