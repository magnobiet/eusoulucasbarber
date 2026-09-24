import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono as GeistMono } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ServiceWorkerRegistration } from '~/components';
import { environment } from '~/environment';
import { config } from '../../config/config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const { pageTitle, description, language } = config;

export const metadata: Metadata = {
  title: pageTitle,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html
      lang={language}
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen font-sans">
        {children}

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
