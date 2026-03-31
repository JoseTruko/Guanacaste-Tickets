import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <h1 className="font-heading font-bold text-3xl text-gray-900">Dashboard</h1>
      <div className="flex gap-4">
        <Link
          href="/admin/tours"
          className="bg-[#0077B6] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#005f8e] transition-colors text-center"
        >
          🗺 Manage Tours
        </Link>
        <Link
          href="/admin/properties"
          className="bg-[#2D5A27] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#234820] transition-colors text-center"
        >
          🏡 Manage Properties
        </Link>
      </div>
    </div>
  );
}
