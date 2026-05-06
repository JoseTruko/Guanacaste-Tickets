import type { Tour } from '@/types/index';

const tours: Tour[] = [];

export function getAllTours(): Tour[] {
  return tours;
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}
