export interface Place {
  slug: string;
  name: string;
  heroImage: string;
  heroImageAlt: string;
  description: string;
}

export const PLACES: Place[] = [
  {
    slug: 'tamarindo',
    name: 'Tamarindo',
    heroImage: '/images/watterfallstour.webp.webp',
    heroImageAlt: 'Tamarindo, Guanacaste',
    description: 'Book tours and activities in Tamarindo, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'liberia',
    name: 'Liberia',
    heroImage: '/images/dryforest.webp',
    heroImageAlt: 'Liberia, Guanacaste',
    description: 'Book tours and activities in Liberia, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'playas-del-coco',
    name: 'Playas del Coco',
    heroImage: '/images/safaritour.webp.webp',
    heroImageAlt: 'Playas del Coco, Guanacaste',
    description: 'Book tours and activities in Playas del Coco, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'flamingo',
    name: 'Flamingo',
    heroImage: '/images/buenavistatour.webp.webp',
    heroImageAlt: 'Flamingo, Guanacaste',
    description: 'Book tours and activities in Flamingo, Costa Rica — best prices, local guides, instant confirmation.',
  },
];

export function getPlaceBySlug(slug: string): Place | undefined {
  return PLACES.find((p) => p.slug === slug);
}
