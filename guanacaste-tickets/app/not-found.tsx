import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F0F9FF] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-8xl" aria-hidden="true">🌴</span>
        <h1 className="font-heading font-bold text-4xl text-gray-900 mt-6 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Looks like this page got lost in the jungle. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center bg-[#0077B6] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#005f8e] transition-colors duration-150"
          >
            Browse Tours
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-[#0077B6] text-[#0077B6] font-semibold px-6 py-3 rounded-md hover:bg-[#0077B6]/10 transition-colors duration-150"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
