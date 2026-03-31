export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#2D5A27] text-white px-6 py-4 flex items-center justify-between">
        <span className="font-heading font-bold text-lg">🌴 Admin — Guanacaste Tickets</span>
        <div className="flex gap-4 text-sm font-medium">
          <a href="/admin/tours" className="hover:text-green-200 transition-colors">Tours</a>
          <a href="/admin/properties" className="hover:text-green-200 transition-colors">Properties</a>
          <a href="/" className="hover:text-green-200 transition-colors">← Site</a>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
