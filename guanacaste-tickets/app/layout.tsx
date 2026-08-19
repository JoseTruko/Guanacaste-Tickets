import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { Poppins, DM_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminMinimalHeader from '@/components/layout/AdminMinimalHeader';
import GclidCapture from '@/components/analytics/GclidCapture';
import { SITE_URL } from '@/lib/config';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/favicon.svg',
  },
  title: {
    default: 'Guanacaste Tickets | Tours in Costa Rica',
    template: '%s | Guanacaste Tickets',
  },
  description:
    'Discover the best tours and experiences in Guanacaste, Costa Rica. Book your adventure today with local experts.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const trackingId = gaId || adsId;

  const pathname = (await headers()).get('x-pathname') ?? '';
  const isAdmin = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {trackingId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${gaId ? `gtag('config', '${gaId}');` : ''}
                ${adsId ? `gtag('config', '${adsId}');` : ''}
                window.gtag = gtag;
              `}
            </Script>
          </>
        )}
        <GclidCapture />
        {!isLoginPage && (isAdmin ? <AdminMinimalHeader /> : <Header />)}
        <main className="flex-1">{children}</main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
