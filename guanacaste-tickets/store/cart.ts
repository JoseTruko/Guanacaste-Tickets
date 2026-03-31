import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartState, BookingItem } from '@/types/index';
import { calculateGrandTotal } from '@/lib/booking/pricing';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: BookingItem) =>
        set((state) => ({ items: [...state.items, item] })),

      removeItem: (tourId: string, date: string) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.tourId === tourId && i.date === date),
          ),
        })),

      clearCart: () => set({ items: [] }),

      grandTotal: () => calculateGrandTotal(get().items),
    }),
    {
      name: 'guanacaste-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
