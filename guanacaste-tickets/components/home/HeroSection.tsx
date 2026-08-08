import HeroCarousel from './HeroCarousel';

// Curated selection — keep this short (~5) so the crossfade cycles fast enough
// to feel alive without repeating the same shot for too long.
const HERO_IMAGES = [
  { src: '/images/rio-celeste.webp', alt: 'Travelers admiring the turquoise Río Celeste waterfall' },
  { src: '/images/volcano.jpg', alt: 'Arenal Volcano rising above the Costa Rican rainforest' },
  { src: '/images/sensoriatour.webp', alt: 'A traveler relaxing beside a clear blue jungle river' },
  { src: '/images/watterfallstour2.webp.webp', alt: 'Hiker crossing a hanging bridge toward a rainforest waterfall' },
  { src: '/images/buenavistatour.webp.webp', alt: 'Travelers soaking in a natural hot spring pool in the forest' },
];

export default function HeroSection() {
  return <HeroCarousel images={HERO_IMAGES} />;
}
