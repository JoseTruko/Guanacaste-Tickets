'use client';

import { useState } from 'react';
import type { Tour } from '@/types/index';
import ImageUploader from './ImageUploader';

type Props = { initial?: Tour; onSave: (t: Tour) => void; password: string };

const empty: Tour = {
  id: '', slug: '', title: '', description: '', shortDescription: '',
  price: 0, childPrice: 0, currency: 'USD', duration: 0,
  category: 'Adventure', difficulty: 'Easy', languages: ['English', 'Spanish'],
  maxGroupSize: 10, images: [], featured: false,
  included: [], notIncluded: [], meetingPoint: '', whatToBring: [],
  faqs: [], cancellationPolicy: { description: '', freeCancellation: true, deadlineHours: 24 },
};

export default function TourForm({ initial, onSave, password }: Props) {
  const [t, setT] = useState<Tour>(initial ?? empty);
  const [saving, setSaving] = useState(false);

  const set = (field: keyof Tour, value: unknown) => setT((prev) => ({ ...prev, [field]: value }));
  const setArr = (field: keyof Tour, value: string) =>
    set(field, value.split('\n').map((s) => s.trimEnd()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const cleaned = {
      ...t,
      included: t.included.filter(Boolean),
      notIncluded: t.notIncluded.filter(Boolean),
      whatToBring: t.whatToBring.filter(Boolean),
      languages: t.languages.filter(Boolean),
      slug: t.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim(),
    };
    await onSave(cleaned);
    setSaving(false);
  };

  const field = (label: string, key: keyof Tour, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={t[key] as string | number}
        onChange={(e) => set(key, type === 'number' ? Number(e.target.value) : e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
      />
    </div>
  );

  const textarea = (label: string, key: keyof Tour, rows = 3) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        rows={rows}
        value={t[key] as string}
        onChange={(e) => set(key, e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] resize-y"
      />
    </div>
  );

  const arrayField = (label: string, key: keyof Tour, hint = 'One per line') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-gray-400 font-normal">({hint})</span></label>
      <textarea
        rows={3}
        value={(t[key] as string[]).join('\n')}
        onChange={(e) => setArr(key, e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6] resize-y"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
      <h2 className="font-heading font-bold text-xl text-gray-900">{initial ? 'Edit Tour' : 'New Tour'}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field('Title', 'title')}
      </div>

      {textarea('Short Description', 'shortDescription', 2)}
      {textarea('Full Description', 'description', 5)}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {field('Adult Price (USD)', 'price', 'number')}
        {field('Child Price (USD)', 'childPrice', 'number')}
        {field('Duration (hours)', 'duration', 'number')}
        {field('Max Group Size', 'maxGroupSize', 'number')}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select value={t.category} onChange={(e) => set('category', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]">
            {['Adventure', 'Beach', 'Wildlife', 'Cultural'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select value={t.difficulty} onChange={(e) => set('difficulty', e.target.value as Tour['difficulty'])}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]">
            {['Easy', 'Moderate', 'Challenging'].map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="featured" checked={t.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Deal</label>
        </div>
      </div>

      {arrayField('Languages', 'languages')}
      {field('Meeting Point', 'meetingPoint')}
      {arrayField('What\'s Included', 'included')}
      {arrayField('Not Included', 'notIncluded')}
      {arrayField('What to Bring', 'whatToBring')}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Description"
            value={t.cancellationPolicy.description}
            onChange={(e) => set('cancellationPolicy', { ...t.cancellationPolicy, description: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={t.cancellationPolicy.freeCancellation}
                onChange={(e) => set('cancellationPolicy', { ...t.cancellationPolicy, freeCancellation: e.target.checked })} />
              Free Cancellation
            </label>
            <input
              type="number"
              placeholder="Deadline hours"
              value={t.cancellationPolicy.deadlineHours ?? ''}
              onChange={(e) => set('cancellationPolicy', { ...t.cancellationPolicy, deadlineHours: Number(e.target.value) })}
              className="w-32 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        <ImageUploader images={t.images} onChange={(imgs) => set('images', imgs)} password={password} />
      </div>

      <button type="submit" disabled={saving}
        className="w-full bg-[#0077B6] text-white font-semibold py-2.5 rounded-md hover:bg-[#005f8e] transition-colors disabled:opacity-50">
        {saving ? 'Saving…' : 'Save Tour'}
      </button>
    </form>
  );
}
