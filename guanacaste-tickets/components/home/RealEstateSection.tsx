import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { getAllPropertiesFromDB } from '@/lib/data/properties-db';

export default async function RealEstateSection() {
  const properties = await getAllPropertiesFromDB();

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              Properties in Guanacaste
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              Explore real estate opportunities in Costa Rica&apos;s most sought-after region
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, i) => (
            <Reveal key={property.id} delay={i * 100}>
              <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
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
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 text-base leading-snug">{property.title}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {property.location}
                    </p>
                  </div>

                  {(property.bedrooms || property.bathrooms || property.builtArea) && (
                    <div className="flex gap-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
                      {property.bedrooms && <span className="flex items-center gap-1">🛏️ {property.bedrooms} hab.</span>}
                      {property.bathrooms && <span className="flex items-center gap-1">🚿 {property.bathrooms} baños</span>}
                      {property.builtArea && <span className="flex items-center gap-1">📐 {property.builtArea} m²</span>}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <p className="text-gray-900 font-bold text-xl">
                      ${property.price.toLocaleString('en-US')}
                      <span className="text-xs font-normal text-gray-500 ml-1">USD</span>
                    </p>
                    {property.externalUrl && (
                      <a
                        href={property.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#0077B6] hover:bg-[#005f92] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Más info
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
