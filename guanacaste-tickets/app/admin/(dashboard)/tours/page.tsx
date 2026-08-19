'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import TourForm from '@/components/admin/TourForm';
import Button from '@/components/ui/Button';
import type { Tour } from '@/types/index';

export default function AdminToursPage() {
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
    await fetch(`/api/tours/${id}`, { method: 'DELETE' });
    load();
  };

  const handleSave = async (tour: Tour) => {
    const isNew = !tour.id || tour.id === '';
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/tours' : `/api/tours/${tour.id}`;
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tour) });
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
        <TourForm initial={editing ?? undefined} onSave={handleSave} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-900">Tours</h1>
        <Button onClick={() => setCreating(true)} size="sm">+ New Tour</Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => (
            <div key={tour.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-[16/9] bg-gray-100">
                {tour.images?.[0] ? (
                  <Image
                    src={tour.images[0]}
                    alt={tour.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-gray-400 text-sm">
                    No image
                  </div>
                )}
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-primary text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                  {tour.category}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <p className="font-semibold text-gray-900 truncate" title={tour.title}>{tour.title}</p>
                <p className="text-sm text-gray-500">{tour.duration}h · ${tour.price} USD</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditing(tour)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-md py-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md py-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
          {tours.length === 0 && <p className="text-gray-500 text-center py-8 col-span-full">No tours yet.</p>}
        </div>
      )}
    </div>
  );
}
