import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getPropertyByIdFromDB, getAllPropertiesFromDB } from '@/lib/data/properties-db';
import { WHATSAPP_NUMBER } from '@/lib/config';
import PropertyGallery from '@/components/real-estate/PropertyGallery';

export const dynamicParams = true;
export const revalidate = 0;

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const properties = await getAllPropertiesFromDB();
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyByIdFromDB(id);
  if (!property) return {};
  return {
    title: `${property.title} | Guanacaste Tickets`,
    description: property.shortDescription ?? `${property.propertyType} in ${property.location}`,
  };
}

const amenityIcons: Record<string, string> = {
  'Pool': '🏊', 'Ocean View': '🌊', 'Beach Access': '🏖️', 'Garden': '🌿',
  '24h Security': '🔒', 'Air Conditioning': '❄️', 'Furnished': '🛋️',
  'Garage': '🚗', 'Gym': '💪', 'Gated Community': '🏘️',
};

export default async function PropertyDetailPage({ params }: Params) {
  const { id } = await params;
  const property = await getPropertyByIdFromDB(id);
  if (!property) notFound();

  const allImages = property.images && property.images.length > 0
    ? property.images
    : property.image ? [property.image] : [];

  const whatsappUrl = property.contactUrl || `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`I'm interested in: ${property.title}`)}`;

  const statusColor: Record<string, string> = {
    'For Sale': 'bg-primary/10 text-primary',
    'For Rent': 'bg-secondary/10 text-secondary',
    'Sold': 'bg-surface text-neutral',
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          {property.status && (
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${statusColor[property.status] ?? 'bg-gray-100 text-gray-600'}`}>
              {property.status}
            </span>
          )}
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">{property.title}</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1"><span>📍</span>{property.location}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">${property.price.toLocaleString('en-US')}</p>
          <p className="text-sm text-neutral">USD</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left — gallery + details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <PropertyGallery images={allImages} title={property.title} />

          {/* Stats */}
          {(property.bedrooms || property.bathrooms || property.builtArea || property.landArea || property.parking || property.yearBuilt) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Bedrooms', value: property.bedrooms, icon: '🛏️' },
                { label: 'Bathrooms', value: property.bathrooms, icon: '🚿' },
                { label: 'Built Area', value: property.builtArea ? `${property.builtArea} m²` : null, icon: '📐' },
                { label: 'Land Area', value: property.landArea ? `${property.landArea} m²` : null, icon: '🌳' },
                { label: 'Parking', value: property.parking, icon: '🚗' },
                { label: 'Year Built', value: property.yearBuilt, icon: '🏗️' },
              ].filter((s) => s.value).map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-1">{stat.icon}</p>
                  <p className="font-bold text-gray-900 text-lg">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {property.description && (
            <div>
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-3">About this property</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {property.amenities.map((a) => (
                  <span key={a} className="flex items-center gap-2 bg-secondary/10 text-secondary text-sm font-medium px-4 py-2 rounded-full">
                    <span>{amenityIcons[a] ?? '✓'}</span>{a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Floor plan */}
          {property.floorPlanUrl && (
            <div>
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-3">Floor Plan</h2>
              <div className="relative w-full rounded-xl overflow-hidden border border-gray-200">
                <Image src={property.floorPlanUrl} alt="Floor plan" width={800} height={600} className="w-full object-contain" />
              </div>
            </div>
          )}

          {/* Video */}
          {property.videoUrl && (
            <div>
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-3">Video Tour</h2>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={property.videoUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allowFullScreen
                  title="Property video tour"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right — sticky CTA */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6 bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
            <div>
              <p className="text-2xl font-bold text-primary">${property.price.toLocaleString('en-US')} <span className="text-sm font-normal text-neutral">USD</span></p>
              {property.propertyType && <p className="text-sm text-gray-500 mt-1">{property.propertyType} · {property.location}</p>}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-whatsapp text-white font-semibold py-3 rounded-lg hover:bg-whatsapp-hover transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Inquire on WhatsApp
            </a>

            <p className="text-xs text-gray-400 text-center">We typically reply within 1 hour</p>
          </div>
        </div>
      </div>
    </main>
  );
}
