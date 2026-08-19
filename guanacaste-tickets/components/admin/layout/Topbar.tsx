'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';
import type { StaffProfile } from '@/lib/supabase/server';

type Props = {
  user: StaffProfile;
  pendingCount: number;
  onMenuClick: () => void;
};

export default function Topbar({ user, pendingCount, onMenuClick }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="lg:hidden text-gray-600 hover:text-gray-900"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1" />

      <Link
        href="/admin/bookings?status=pending"
        className="relative inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
        </svg>
        {pendingCount > 0 && (
          <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
            {pendingCount}
          </span>
        )}
      </Link>

      <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-900 leading-tight">{user.fullName ?? 'Sin nombre'}</p>
          <p className="text-xs text-gray-500 capitalize leading-tight">{user.role === 'admin' ? 'Administrador' : 'Colaborador'}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Salir
        </button>
      </div>
    </header>
  );
}
