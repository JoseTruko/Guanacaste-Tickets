'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  password: string;
};

export default function ImageUploader({ images, onChange, password }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', headers: { 'x-admin-password': password }, body: fd });
    const json = await res.json();
    if (json.url) onChange([...images, json.url]);
    setUploading(false);
    e.target.value = '';
  };

  const remove = (url: string) => onChange(images.filter((i) => i !== url));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {images.map((url) => (
          <div key={url} className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200">
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition-colors">
        {uploading ? 'Uploading…' : '+ Add Image'}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
    </div>
  );
}
