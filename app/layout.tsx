import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/common/FloatingCTA';

export const metadata: Metadata = {
  title: {
    default: 'Dream House Properties - Premium Real Estate in Mumbai | Buy, Sell, Rent',
    template: '%s | Dream House Properties',
  },
  description: 'Find your dream home in Mumbai with Dream House Properties. Premium apartments, villas, and independent houses for sale and rent in Bandra, Juhu, Powai, and other prime locations. Expert real estate services with 10+ years experience.',
  keywords: 'real estate mumbai, property for sale, apartments mumbai, villas mumbai, buy property, rent property, dream house properties, bandra properties, juhu properties, powai properties, andheri properties, worli properties',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://dreamhouseproperties.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dream House Properties - Premium Real Estate in Mumbai',
    description: 'Find your dream home in Mumbai with Dream House Properties. Premium apartments, villas, and independent houses for sale and rent in prime locations.',
    url: 'https://dreamhouseproperties.com',
    siteName: 'Dream House Properties',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Dream House Properties - Premium Real Estate in Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dream House Properties - Premium Real Estate in Mumbai',
    description: 'Find your dream home in Mumbai with Dream House Properties. Premium apartments, villas, and independent houses for sale and rent in prime locations.',
    images: ['/images/hero-bg.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'real estate',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://api.fontshare.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.cdnfonts.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://images.unsplash.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://images.unsplash.com" 
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
          <Footer />
          <FloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}