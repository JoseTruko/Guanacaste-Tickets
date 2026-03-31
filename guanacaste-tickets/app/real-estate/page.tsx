import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllPropertiesFromDB } from '@/lib/data/properties-db';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Properties in Guanacaste',
  description:
    'Browse real estate listings in Guanacaste, Costa Rica. Oceanview villas, beachfront condos, jungle retreats, and more.',
};

export default async function RealEstatePage() {
  const properties = await getAllPropertiesFromDB();

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl text-gray-900 mb-3">
            Properties in Guanacaste
          </h1>
          <p className="text-gray-500 text-lg">
            Explore real estate opportunities in Costa Rica&apos;s most sought-after region.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <article
              key={property.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52">
                {property.image ? (
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">No image</div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h2 className="font-heading font-semibold text-gray-900 text-base leading-snug">
                  {property.title}
                </h2>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <span aria-hidden="true">📍</span> {property.location}
                </p>
                <p className="text-gray-900 font-bold text-xl mt-auto">
                  ${property.price.toLocaleString('en-US')}{' '}
                  <span className="text-sm font-normal text-gray-500">USD</span>
                </p>
                <a
                  href={property.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md border border-[#2D5A27] text-[#2D5A27] font-semibold text-sm hover:bg-[#2D5A27] hover:text-white transition-colors duration-150"
                >
                  Inquire Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
