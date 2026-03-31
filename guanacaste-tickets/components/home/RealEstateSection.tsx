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
              <article className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="font-heading font-semibold text-gray-900 text-base leading-snug">
                    {property.title}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <span aria-hidden="true">📍</span> {property.location}
                  </p>
                  <p className="text-gray-900 font-bold text-lg mt-auto">
                    ${property.price.toLocaleString('en-US')} USD
                  </p>
                  <a
                    href={property.contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md border border-secondary text-secondary font-semibold text-sm hover:bg-secondary hover:text-white transition-colors duration-150"
                  >
                    Inquire Now
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
