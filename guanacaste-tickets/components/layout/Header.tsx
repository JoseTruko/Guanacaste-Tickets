'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WHATSAPP_NUMBER } from '@/lib/config';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Real Estate', href: '/real-estate' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <img
              src="/logo-header.svg"
              alt="Guanacaste Tickets"
              className="h-20 w-auto md:h-24"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-base pb-0.5 border-b-2 transition-colors ${
                  isActive(link.href)
                    ? 'text-primary border-primary'
                    : 'text-gray-700 border-transparent hover:text-primary hover:border-primary/40'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center bg-primary text-white px-5 py-2 border border-primary rounded-sm font-semibold text-sm hover:bg-primary-hover transition-colors"
            >
              Book
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center bg-primary text-white px-4 py-2 border border-primary rounded-sm font-semibold text-sm hover:bg-primary-hover transition-colors"
            >
              Book
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 text-gray-700 hover:text-primary transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        className={`md:hidden border-t border-gray-100 bg-white px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium py-1 pl-3 border-l-2 transition-colors ${
                isActive(link.href)
                  ? 'text-primary border-primary'
                  : 'text-gray-700 border-transparent hover:text-primary'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tours"
            className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md font-semibold text-sm w-fit hover:bg-primary-hover transition-colors"
          >
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
}
