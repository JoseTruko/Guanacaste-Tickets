'use client';

import { useEffect, useState } from 'react';
import AdminAuth from '@/components/admin/AdminAuth';
import PropertyForm from '@/components/admin/PropertyForm';
import type { Property } from '@/types/index';

export default function AdminPropertiesPage() {
  return (
    <AdminAuth>
      {(password) => <PropertiesManager password={password} />}
    </AdminAuth>
  );
}

function PropertiesManager({ password }: { password: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/properties');
    const data = await res.json();
    // map snake_case from DB
    setProperties(data.map((p: Record<string, unknown>) => ({
      id: p.id, title: p.title, location: p.location,
      price: p.price, currency: p.currency,
      image: p.image, contactUrl: p.contact_url,
    })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this property?')) return;
    await fetch(`/api/properties/${id}`, { method: 'DELETE', headers: { 'x-admin-password': password } });
    load();
  };

  const handleSave = async (prop: Property) => {
    const isNew = !prop.id;
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? '/api/properties' : `/api/properties/${prop.id}`;
    await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'x-admin-password': password }, body: JSON.stringify(prop) });
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
        <PropertyForm initial={editing ?? undefined} onSave={handleSave} password={password} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-900">Properties</h1>
        <button onClick={() => setCreating(true)} className="bg-[#2D5A27] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#234820] transition-colors text-sm">
          + New Property
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="space-y-3">
          {properties.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{p.title}</p>
                <p className="text-sm text-gray-500">{p.location} · ${p.price.toLocaleString()} USD</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(p)} className="text-sm text-[#0077B6] hover:underline font-medium">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-sm text-red-500 hover:underline font-medium">Delete</button>
              </div>
            </div>
          ))}
          {properties.length === 0 && <p className="text-gray-500 text-center py-8">No properties yet.</p>}
        </div>
      )}
    </div>
  );
}
