import fs from 'fs';
import path from 'path';
import HeroCarousel from './HeroCarousel';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

export default function HeroSection() {
  // Read images from public/images at build/request time — auto-picks up new files
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const files = fs.readdirSync(imagesDir);
  const images = files
    .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .map((f) => `/images/${f}`);

  return <HeroCarousel images={images} />;
}
