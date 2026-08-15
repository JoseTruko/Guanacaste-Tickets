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
    slug: 'peninsula-papagayo',
    name: 'Península Papagayo',
    heroImage: '/images/safaritour.webp.webp',
    heroImageAlt: 'Península Papagayo, Guanacaste',
    description: 'Book tours and activities in Península Papagayo, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'santa-cruz',
    name: 'Santa Cruz',
    heroImage: '/images/buenavistatour.webp.webp',
    heroImageAlt: 'Santa Cruz, Guanacaste',
    description: 'Book tours and activities in Santa Cruz, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'tenorio',
    name: 'Tenorio',
    heroImage: '/images/dryforest.webp',
    heroImageAlt: 'Tenorio, Guanacaste',
    description: 'Book tours and activities in Tenorio, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'bijagua-rio-celeste',
    name: 'Bijagua - Río Celeste',
    heroImage: '/images/watterfallstour.webp.webp',
    heroImageAlt: 'Bijagua - Río Celeste, Guanacaste',
    description: 'Book tours and activities in Bijagua - Río Celeste, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'rincon-de-la-vieja',
    name: 'Rincón de la Vieja',
    heroImage: '/images/safaritour.webp.webp',
    heroImageAlt: 'Rincón de la Vieja, Guanacaste',
    description: 'Book tours and activities in Rincón de la Vieja, Costa Rica — best prices, local guides, instant confirmation.',
  },
  {
    slug: 'dos-rios-rainforest',
    name: 'Dos Rios - Rainforest',
    heroImage: '/images/dryforest.webp',
    heroImageAlt: 'Dos Rios - Rainforest, Guanacaste',
    description: 'Book tours and activities in Dos Rios - Rainforest, Costa Rica — best prices, local guides, instant confirmation.',
  },
];

export function getPlaceBySlug(slug: string): Place | undefined {
  return PLACES.find((p) => p.slug === slug);
}
