import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { generateMetadata } from "./metadata";
import GlobalProvider from "@/layout/GlobalProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode, Suspense } from "react";
const inVercel = process.env.VERCEL === '1';
import { type DynamicLayoutProps } from '@/types/next';
import Script from "next/script";
import { RouteVariants } from "@/utils/server/routeVariants";
export interface RootLayoutProps extends DynamicLayoutProps {
  children: ReactNode;
}
const RootLayout = async ({ children,params}:  RootLayoutProps) => {
  const { variants } = await params;
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
        <Suspense fallback={null}>
          {inVercel && <SpeedInsights />}
        </Suspense>
      </body>
    </html>
  );
}
export default RootLayout;

export { generateMetadata } from './metadata';
