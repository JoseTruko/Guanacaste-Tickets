import type { Property } from '@/types/index';

const properties: Property[] = [
  {
    id: 'prop-001',
    title: 'Oceanview Villa — Playa Flamingo',
    location: 'Playa Flamingo, Guanacaste, Costa Rica',
    price: 485000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    contactUrl: 'https://wa.me/50688888888?text=I%20am%20interested%20in%20the%20Oceanview%20Villa%20at%20Playa%20Flamingo',
  },
  {
    id: 'prop-002',
    title: 'Beachfront Condo — Tamarindo',
    location: 'Tamarindo, Guanacaste, Costa Rica',
    price: 320000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    contactUrl: 'https://wa.me/50688888888?text=I%20am%20interested%20in%20the%20Beachfront%20Condo%20in%20Tamarindo',
  },
  {
    id: 'prop-003',
    title: 'Jungle Retreat — Nosara',
    location: 'Nosara, Guanacaste, Costa Rica',
    price: 275000,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    contactUrl: 'https://wa.me/50688888888?text=I%20am%20interested%20in%20the%20Jungle%20Retreat%20in%20Nosara',
  },
];

export function getAllProperties(): Property[] {
  return properties;
}
