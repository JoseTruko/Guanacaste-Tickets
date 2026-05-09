import type { Metadata } from 'next';
import Image from 'next/image';
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
            <div
              key={property.id}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
                {property.image ? (
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Sin imagen</div>
                )}
                {property.status && (
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
                    property.status === 'For Sale' ? 'bg-blue-600/90 text-white' :
                    property.status === 'For Rent' ? 'bg-green-600/90 text-white' :
                    'bg-gray-700/90 text-white'
                  }`}>
                    {property.status}
                  </span>
                )}
                {property.propertyType && (
                  <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 text-white backdrop-blur-sm">
                    {property.propertyType}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h2 className="font-heading font-semibold text-gray-900 text-base leading-snug">{property.title}</h2>
                  <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.location}
                  </p>
                </div>

                {(property.bedrooms || property.bathrooms || property.builtArea || property.landArea) && (
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
                    {property.bedrooms && <span className="flex items-center gap-1">🛏️ {property.bedrooms} hab.</span>}
                    {property.bathrooms && <span className="flex items-center gap-1">🚿 {property.bathrooms} baños</span>}
                    {property.builtArea && <span className="flex items-center gap-1">📐 {property.builtArea} m²</span>}
                    {property.landArea && <span className="flex items-center gap-1">🌿 {property.landArea} m² terreno</span>}
                  </div>
                )}

                {property.shortDescription && (
                  <p className="text-gray-500 text-sm line-clamp-2">{property.shortDescription}</p>
                )}

                <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                  <p className="text-gray-900 font-bold text-xl">
                    ${property.price.toLocaleString('en-US')}
                    <span className="text-xs font-normal text-gray-500 ml-1">USD</span>
                  </p>
                  {property.externalUrl ? (
                    <a
                      href={property.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#0077B6] hover:bg-[#005f92] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Más información
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Sin enlace</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
