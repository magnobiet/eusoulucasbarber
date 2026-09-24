import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import {
  JetBrains_Mono as JetBrainsMono,
  Outfit,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ServiceWorkerRegistration } from '~/components';
import { Footer, Header } from '~/components/layout';
import { environment } from '~/environment';
import { config } from '../../config/config';
import './globals.css';

const plusJakartaSans = PlusJakartaSans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const jetBrainsMono = JetBrainsMono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const { pageTitle, description, language } = config;

export const metadata: Metadata = {
  metadataBase: new URL(environment.BASE_URL),
  title: pageTitle,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html
      lang={language}
      className={`${plusJakartaSans.variable} ${outfit.variable} ${jetBrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-coffee-950 text-cream selection:bg-brand-cognac/30 min-h-full font-sans selection:text-white">
        <div className="border-coffee-700/60 bg-coffee-900 warm-glow relative mx-auto flex min-h-screen w-full flex-col items-center border-x px-5 pt-6 pb-10">
          <div className="max-w-md">
            <Header />

            {children}

            <Footer />
          </div>
        </div>

        <Toaster />

        {environment.NODE_ENV === 'production' && <ServiceWorkerRegistration />}

        {environment.VERCEL_WEB_ANALYTICS_ENABLED && (
          <Analytics debug={environment.VERCEL_WEB_ANALYTICS_DEBUG_ENABLED} />
        )}

        {environment.GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={environment.GOOGLE_ANALYTICS_ID} />
        )}
      </body>
    </html>
  );
}
