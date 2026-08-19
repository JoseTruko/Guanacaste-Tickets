import Link from 'next/link';

export default function AdminMinimalHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14">
          <Link href="/" className="flex items-center select-none">
            <img src="/logo-header.svg" alt="Guanacaste Tickets" className="h-9 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  );
}
