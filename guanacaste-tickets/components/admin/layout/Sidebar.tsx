'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: HomeIcon },
  { href: '/admin/bookings', label: 'Reservas', icon: TicketIcon },
  { href: '/admin/calendar', label: 'Calendario', icon: CalendarIcon },
  { href: '/admin/tours', label: 'Tours', icon: MapIcon },
];

type Props = { mobileOpen: boolean; onClose: () => void };

export default function Sidebar({ mobileOpen, onClose }: Props) {
  const pathname = usePathname();

  const nav = (
    <>
      <Link href="/admin" className="flex items-center gap-2 px-6 py-5 font-heading font-bold text-lg border-b border-white/10">
        🌴 Guanacaste Tickets
      </Link>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === href : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>
      <Link href="/" className="px-6 py-4 text-sm text-white/60 hover:text-white transition-colors border-t border-white/10">
        ← Volver al sitio
      </Link>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-secondary text-white min-h-screen sticky top-0">
        {nav}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative flex flex-col w-64 bg-secondary text-white h-full shadow-xl">
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 001-1V10" />
    </svg>
  );
}

function TicketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H5a2 2 0 00-2 2v2a2 2 0 010 4v2a2 2 0 002 2h4M9 5h10a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H9M9 5v14" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function MapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}
