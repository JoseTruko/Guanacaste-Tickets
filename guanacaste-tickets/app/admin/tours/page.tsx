'use client';

import { useEffect, useState } from 'react';
import AdminAuth from '@/components/admin/AdminAuth';
import TourForm from '@/components/admin/TourForm';
import type { Tour } from '@/types/index';

export default function AdminToursPage() {
  return (
    <AdminAuth>
      {(password) => <ToursManager password={password} />}
    </AdminAuth>
  );
}

function ToursManager({ password }: { password: string }) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [editing, setEditing] = useState<Tour | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/tours');
    setTours(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tour?')) return;
    await fetch(`/api/tours/${id}`, { method: 'DELETE', headers: { 'x-admin-password': password } });
    load();
  };

  const handleSave = async (tour: Tour) => {
    const isNew = !tour.id || tour.id === '';
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/tours' : `/api/tours/${tour.id}`;
    await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'x-admin-password': password }, body: JSON.stringify(tour) });
    setEditing(null);
    setCreating(false);
    load();
  };

  if (editing || creating) {
    return (
      <div>
        <button onClick={() => { setEditing(null); setCreating(false); }} className="text-sm text-gray-500 hover:text-gray-800 mb-4 inline-flex items-center gap-1">
          ← Back to list
        </button>
        <TourForm initial={editing ?? undefined} onSave={handleSave} password={password} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-900">Tours</h1>
        <button onClick={() => setCreating(true)} className="bg-[#0077B6] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#005f8e] transition-colors text-sm">
          + New Tour
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="space-y-3">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{tour.title}</p>
                <p className="text-sm text-gray-500">{tour.category} · {tour.duration}h · ${tour.price} USD</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(tour)} className="text-sm text-[#0077B6] hover:underline font-medium">Edit</button>
                <button onClick={() => handleDelete(tour.id)} className="text-sm text-red-500 hover:underline font-medium">Delete</button>
              </div>
            </div>
          ))}
          {tours.length === 0 && <p className="text-gray-500 text-center py-8">No tours yet.</p>}
        </div>
      )}
    </div>
  );
}
