import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPropertiesFromDB } from '@/lib/data/properties-db';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Properties in Guanacaste',
  description: 'Browse real estate listings in Guanacaste, Costa Rica. Oceanview villas, beachfront condos, jungle retreats, and more.',
};

export default async function RealEstatePage() {
  const properties = await getAllPropertiesFromDB();

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-3">Properties in Guanacaste</h1>
          <p className="text-gray-500 text-lg">Explore real estate opportunities in Costa Rica&apos;s most sought-after region.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/real-estate/${property.id}`}
              className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-full h-52 overflow-hidden">
                {property.image ? (
                  <Image src={property.image} alt={property.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">No image</div>
                )}
                {property.status && (
                  <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${property.status === 'For Sale' ? 'bg-primary/10 text-primary' : property.status === 'For Rent' ? 'bg-secondary/10 text-secondary' : 'bg-surface text-neutral'}`}>
                    {property.status}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h2 className="font-heading font-semibold text-gray-900 text-base leading-snug">{property.title}</h2>
                <p className="text-gray-500 text-sm flex items-center gap-1"><span aria-hidden="true">📍</span>{property.location}</p>
                {(property.bedrooms || property.bathrooms || property.builtArea) && (
                  <div className="flex gap-3 text-xs text-gray-500">
                    {property.bedrooms && <span>🛏️ {property.bedrooms} bed</span>}
                    {property.bathrooms && <span>🚿 {property.bathrooms} bath</span>}
                    {property.builtArea && <span>📐 {property.builtArea} m²</span>}
                  </div>
                )}
                <p className="text-gray-900 font-bold text-xl mt-auto">${property.price.toLocaleString('en-US')} <span className="text-sm font-normal text-gray-500">USD</span></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
