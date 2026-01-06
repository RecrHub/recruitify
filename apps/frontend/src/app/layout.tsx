import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { generateMetadata } from "./metadata";
import GlobalProvider from "@/layout/GlobalProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode, Suspense } from "react";
export const metadata: Metadata = await generateMetadata();
const inVercel = process.env.VERCEL === '1';
import { type DynamicLayoutProps } from '@/types/next';
import Script from "next/script";
export interface RootLayoutProps extends DynamicLayoutProps {
  children: ReactNode;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, theme, primaryColor, neutralColor } =
    RouteVariants.deserializeVariants(variants);
  const direction = 'ltr';
  const renderContent = () => {
    return (
      <GlobalProvider
        appearance={theme}
        neutralColor={neutralColor}
        primaryColor={primaryColor}
        variants={variants}
      >
        <AuthProvider>{children}</AuthProvider>
        <Suspense fallback={null} />
      </GlobalProvider>
    );
  };
  return (
    <html dir={direction} lang={locale}>
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
        {/* {ENABLE_BUSINESS_FEATURES ? (
          <BusinessGlobalProvider>{renderContent()}</BusinessGlobalProvider>
        ) : (
          renderContent()
        )} */}
        <Suspense fallback={null}>
          {inVercel && <SpeedInsights />}
        </Suspense>
      </body>
    </html>
  );
}
