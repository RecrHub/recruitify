import { ReactNode, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GlobalProvider from '@/layout/GlobalProvider';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';

const inVercel = process.env.VERCEL === '1';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.DEBUG_REACT_SCAN === '1' && (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body>
        <GlobalProvider appearance="light">
          <AuthProvider>{children}</AuthProvider>
        </GlobalProvider>
        <Suspense fallback={null}>
          {inVercel && <SpeedInsights />}
        </Suspense>
      </body>
    </html>
  );
}

export { generateMetadata } from './metadata';
