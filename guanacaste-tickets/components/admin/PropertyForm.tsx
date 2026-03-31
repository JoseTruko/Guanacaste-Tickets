'use client';

import { useState } from 'react';
import type { Property } from '@/types/index';
import ImageUploader from './ImageUploader';

type Props = { initial?: Property; onSave: (p: Property) => void; password: string };

const empty: Property = { id: '', title: '', location: '', price: 0, currency: 'USD', image: '', contactUrl: '' };

export default function PropertyForm({ initial, onSave, password }: Props) {
  const [p, setP] = useState<Property>(initial ?? empty);
  const [saving, setSaving] = useState(false);

  const set = (field: keyof Property, value: unknown) => setP((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(p);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
      <h2 className="font-heading font-bold text-xl text-gray-900">{initial ? 'Edit Property' : 'New Property'}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" value={p.title} onChange={(e) => set('title', e.target.value)} required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input type="text" value={p.location} onChange={(e) => set('location', e.target.value)} required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
        <input type="number" value={p.price} onChange={(e) => set('price', Number(e.target.value))} required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Contact URL</label>
        <input type="text" value={p.contactUrl} onChange={(e) => set('contactUrl', e.target.value)}
          placeholder="https://wa.me/506..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
        <ImageUploader
          images={p.image ? [p.image] : []}
          onChange={(imgs) => set('image', imgs[imgs.length - 1] ?? '')}
          password={password}
        />
      </div>

      <button type="submit" disabled={saving}
        className="w-full bg-[#2D5A27] text-white font-semibold py-2.5 rounded-md hover:bg-[#234820] transition-colors disabled:opacity-50">
        {saving ? 'Saving…' : 'Save Property'}
      </button>
    </form>
  );
}
