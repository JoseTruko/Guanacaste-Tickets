'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WHATSAPP_NUMBER } from '@/lib/config';
import { CATEGORIES } from '@/lib/data/categories';
import { PLACES } from '@/lib/data/places';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import NavDropdown from './NavDropdown';

const navLinks = [{ label: 'Home', href: '/' }];

const toursDropdownItems = [
  { label: 'All Tours', href: '/tours' },
  ...CATEGORIES.map((c) => ({ label: c, href: `/tours?category=${encodeURIComponent(c)}` })),
];

const placesDropdownItems = PLACES.map((p) => ({ label: p.name, href: `/places/${p.slug}` }));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobilePlacesOpen, setMobilePlacesOpen] = useState(false);
  const pathname = usePathname();
  const hidden = useScrollDirection();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  useEffect(() => {
    setMenuOpen(false);
    setMobileToursOpen(false);
    setMobilePlacesOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
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
                className={`font-medium text-lg pb-0.5 border-b-2 transition-colors ${
                  isActive(link.href)
                    ? 'text-primary border-primary'
                    : 'text-gray-700 border-transparent hover:text-primary hover:border-primary/40'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <NavDropdown label="Tours" items={toursDropdownItems} isActive={isActive('/tours')} />
            <NavDropdown label="Places" items={placesDropdownItems} isActive={isActive('/places')} />
            <Link
              href="/contact"
              className={`font-medium text-lg pb-0.5 border-b-2 transition-colors ${
                isActive('/contact')
                  ? 'text-primary border-primary'
                  : 'text-gray-700 border-transparent hover:text-primary hover:border-primary/40'
              }`}
            >
              Contact
            </Link>
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
          menuOpen ? 'max-h-[32rem] py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium py-2 pl-3 border-l-2 transition-colors ${
                isActive(link.href)
                  ? 'text-primary border-primary'
                  : 'text-gray-700 border-transparent hover:text-primary'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Tours accordion */}
          <div className="border-l-2 border-transparent">
            <button
              type="button"
              onClick={() => setMobileToursOpen((o) => !o)}
              aria-expanded={mobileToursOpen}
              className={`flex items-center justify-between w-full font-medium py-2 pl-3 pr-1 transition-colors ${
                isActive('/tours') ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Tours
              <svg className={`w-4 h-4 transition-transform ${mobileToursOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileToursOpen && (
              <div className="flex flex-col pl-6 pb-1">
                {toursDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1.5 text-sm text-gray-600 hover:text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Places accordion */}
          <div className="border-l-2 border-transparent">
            <button
              type="button"
              onClick={() => setMobilePlacesOpen((o) => !o)}
              aria-expanded={mobilePlacesOpen}
              className={`flex items-center justify-between w-full font-medium py-2 pl-3 pr-1 transition-colors ${
                isActive('/places') ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Places
              <svg className={`w-4 h-4 transition-transform ${mobilePlacesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobilePlacesOpen && (
              <div className="flex flex-col pl-6 pb-1">
                {placesDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1.5 text-sm text-gray-600 hover:text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={`font-medium py-2 pl-3 border-l-2 transition-colors ${
              isActive('/contact')
                ? 'text-primary border-primary'
                : 'text-gray-700 border-transparent hover:text-primary'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <Link
            href="/tours"
            className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md font-semibold text-sm w-fit mt-2 hover:bg-primary-hover transition-colors"
          >
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
}
