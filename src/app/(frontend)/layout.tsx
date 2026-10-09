import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
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

const { pageTitle, description, language, theme } = config;

export const metadata: Metadata = {
  metadataBase: new URL(environment.BASE_URL),
  title: pageTitle,
  description,
};

export const viewport: Viewport = {
  themeColor: theme.background,
  colorScheme: 'dark',
};

const toasterStyle = {
  '--normal-bg': 'var(--popover)',
  '--normal-text': 'var(--popover-foreground)',
  '--normal-border': 'var(--border)',
  '--border-radius': 'calc(var(--radius) * 1.4)',
  fontFamily: 'var(--font-plus-jakarta-sans)',
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <html
      lang={language}
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-coffee-950 text-cream selection:bg-brand-cognac/30 min-h-full font-sans selection:text-white">
        <div className="warm-glow relative flex min-h-screen w-full flex-col items-center px-5 pt-6 pb-10">
          <div className="relative flex w-full max-w-md flex-1 flex-col">
            <Header />

            {children}

            <Footer />
          </div>
        </div>

        <Toaster style={toasterStyle} theme="dark" />

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
