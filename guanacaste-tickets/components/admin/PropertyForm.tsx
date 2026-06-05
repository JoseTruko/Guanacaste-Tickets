'use client';

import { useEffect, useState } from 'react';
import type { Property } from '@/types/index';
import ImageUploader from './ImageUploader';

type Props = { initial?: Property; onSave: (p: Property) => void; password: string };

const AMENITIES = [
  'Pool', 'Ocean View', 'Beach Access', 'Garden', '24h Security',
  'Air Conditioning', 'Furnished', 'Garage', 'Gym', 'Gated Community',
];

const empty: Property = {
  id: '', title: '', shortDescription: '', description: '',
  location: '', price: 0, currency: 'USD',
  propertyType: 'House', status: 'For Sale',
  builtArea: undefined, landArea: undefined,
  bedrooms: undefined, bathrooms: undefined, parking: undefined, yearBuilt: undefined,
  amenities: [], image: '', images: [], videoUrl: '', floorPlanUrl: '',
  contactUrl: '', externalUrl: '',
};

export default function PropertyForm({ initial, onSave, password }: Props) {
  const [p, setP] = useState<Property>(initial ?? empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setP(initial ?? empty);
  }, [initial]);

  const set = (field: keyof Property, value: unknown) => setP((prev) => ({ ...prev, [field]: value }));

  const toggleAmenity = (a: string) => {
    const current = p.amenities ?? [];
    set('amenities', current.includes(a) ? current.filter((x) => x !== a) : [...current, a]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Use first uploaded image as main image if not set
    const images = p.images ?? [];
    await onSave({ ...p, image: p.image || images[0] || '' });
    setSaving(false);
  };

  const inputCls = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 className="font-heading font-bold text-xl text-gray-900">{initial ? 'Edit Property' : 'New Property'}</h2>

      {/* Basic info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" value={p.title} onChange={(e) => set('title', e.target.value)} required className={inputCls} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <input type="text" value={p.shortDescription ?? ''} onChange={(e) => set('shortDescription', e.target.value)} className={inputCls} placeholder="One-line summary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <textarea rows={4} value={p.description ?? ''} onChange={(e) => set('description', e.target.value)} className={`${inputCls} resize-y`} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input type="text" value={p.location} onChange={(e) => set('location', e.target.value)} required className={inputCls} placeholder="e.g. Playa Flamingo, Guanacaste" />
        </div>
      </div>

      {/* Price, type, status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
          <input type="number" value={p.price} onChange={(e) => set('price', Number(e.target.value))} required className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select value={p.propertyType ?? 'House'} onChange={(e) => set('propertyType', e.target.value)} className={inputCls}>
            {['House', 'Condo', 'Villa', 'Lot'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={p.status ?? 'For Sale'} onChange={(e) => set('status', e.target.value)} className={inputCls}>
            {['For Sale', 'For Rent', 'Sold'].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Physical details */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {([
          ['Built Area (m²)', 'builtArea'],
          ['Land Area (m²)', 'landArea'],
          ['Bedrooms', 'bedrooms'],
          ['Bathrooms', 'bathrooms'],
          ['Parking', 'parking'],
        ] as [string, keyof Property][]).map(([label, key]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="number" value={(p[key] as number) ?? ''} onChange={(e) => set(key, e.target.value === '' ? undefined : Number(e.target.value))} className={inputCls} />
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAmenity(a)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                (p.amenities ?? []).includes(a)
                  ? 'bg-[#0077B6] text-white border-[#0077B6]'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-[#0077B6]'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* URLs */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">External Link <span className="text-gray-400 font-normal">(enlace al sitio de bienes raíces)</span></label>
          <input type="url" value={p.externalUrl ?? ''} onChange={(e) => set('externalUrl', e.target.value)} placeholder="https://..." className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Contact URL</label>
          <input type="text" value={p.contactUrl} onChange={(e) => set('contactUrl', e.target.value)} placeholder="https://wa.me/506..." className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video Tour URL <span className="text-gray-400 font-normal">(YouTube/Vimeo, optional)</span></label>
          <input type="text" value={p.videoUrl ?? ''} onChange={(e) => set('videoUrl', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Floor Plan URL <span className="text-gray-400 font-normal">(image URL, optional)</span></label>
          <input type="text" value={p.floorPlanUrl ?? ''} onChange={(e) => set('floorPlanUrl', e.target.value)} className={inputCls} />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        <ImageUploader
          images={p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])}
          onChange={(imgs) => { set('images', imgs); set('image', imgs[0] ?? ''); }}
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
