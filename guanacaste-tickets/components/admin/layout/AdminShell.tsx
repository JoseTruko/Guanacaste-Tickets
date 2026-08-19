'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { StaffProfile } from '@/lib/supabase/server';

type Props = {
  user: StaffProfile;
  pendingCount: number;
  children: React.ReactNode;
};

export default function AdminShell({ user, pendingCount, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={user} pendingCount={pendingCount} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
