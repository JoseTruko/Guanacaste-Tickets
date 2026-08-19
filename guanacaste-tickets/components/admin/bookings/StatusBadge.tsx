import Badge from '@/components/ui/Badge';
import type { BookingStatus } from '@/types/index';

const LABELS: Record<BookingStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
  completed: 'Completada',
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return <Badge variant={status}>{LABELS[status]}</Badge>;
}
