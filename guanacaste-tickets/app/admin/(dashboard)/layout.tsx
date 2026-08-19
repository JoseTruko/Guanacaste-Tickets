import { redirect } from 'next/navigation';
import { getStaffUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import AdminShell from '@/components/admin/layout/AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getStaffUser();
  if (!user) redirect('/admin/login');

  const { count } = await supabaseAdmin
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending');

  return (
    <AdminShell user={user} pendingCount={count ?? 0}>
      {children}
    </AdminShell>
  );
}
