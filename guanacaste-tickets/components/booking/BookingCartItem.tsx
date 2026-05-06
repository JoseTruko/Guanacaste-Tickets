import Link from 'next/link';
import type { BookingItem } from '@/types/index';
import { useCartStore } from '@/store/cart';

type BookingCartItemProps = {
  item: BookingItem;
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BookingCartItem({ item }: BookingCartItemProps) {
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-200 gap-4">
      <div className="flex-1 min-w-0 space-y-0.5">
        <Link
          href={`/tours/${item.tourSlug}`}
          className="text-sm font-semibold text-primary hover:underline truncate block"
        >
          {item.tourTitle}
        </Link>
        <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
        <p className="text-xs text-gray-600">
          {item.adults} adult{item.adults !== 1 ? 's' : ''}
          {item.children > 0 && ` + ${item.children} child${item.children !== 1 ? 'ren' : ''}`}
        </p>
        <p className="text-sm font-semibold text-gray-900">${item.subtotal.toFixed(2)} USD</p>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.tourId, item.date)}
        className="text-xs text-red-500 hover:text-red-700 font-medium shrink-0 mt-0.5 transition-colors"
        aria-label={`Remove ${item.tourTitle} from cart`}
      >
        Remove
      </button>
    </div>
  );
}
