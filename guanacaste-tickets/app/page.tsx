import HeroSection from '@/components/home/HeroSection';
import DealsSection from '@/components/home/DealsSection';
import WhySection from '@/components/home/WhySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import RealEstateSection from '@/components/home/RealEstateSection';

export const revalidate = 0;

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DealsSection />
      <TestimonialsSection />
    </main>
  );
}
