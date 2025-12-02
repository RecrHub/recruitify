"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer, { FooterProps } from "@/components/Footer";
import Tabs from "@/components/Tabs";
import Actions from "@/components/NavAction";
import Logo from "@/components/brand/LogoRecruitify/Logo";
import { AuthProvider } from "@/context/AuthContext";
import GlobalLayout from "@/layout/GlobalProvider";
import { createStyles } from "antd-style";
import BrandLoading from "@/components/brand/BrandLoading";
import LogoRecr from "@/components/brand/RecruitifyText/index";

const useStyles = createStyles(({ css, token }) => ({
  footer: css`
    width: 100%;
  `,
  main: css`
    min-height: 80vh;
  `,
  loadingWrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    z-index: 9999;
  `,
}));

const footerColumns: FooterProps['columns'] = [
  {
    title: 'Company',
    items: [
      { title: 'Features', url: '/features' },
      { title: 'Pricing', url: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'Insights', url: '/insights' },
      { title: 'Review', url: '/review' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { title: 'Testimonials', url: '/testimonials' },
    ],
  },
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { styles } = useStyles();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Danh sách các routes không cần Header/Footer
  const authRoutes = ['/login', '/register', '/forgetpassword'];
  const isAuthRoute = authRoutes.includes(pathname);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html dir="ltr" suppressHydrationWarning>
      <body>
        <Suspense fallback={
          <div className={styles.loadingWrapper}>
            <BrandLoading text={LogoRecr} size={100} />
          </div>
        }>
          <AuthProvider>
            <GlobalLayout appearance="light">
              
              {/* LOADING SCREEN */}
              {loading && (
                <div className={styles.loadingWrapper}>
                  <BrandLoading text={LogoRecr} size={100} />
                </div>
              )}

              {/* HEADER - Ẩn trên auth routes */}
              {!isAuthRoute && (
                <Header
                  actions={<Actions />}
                  logo={<Logo />}
                  nav={
                    <Tabs
                      items={[
                        { key: "home", label: "Favourite Jobs" },
                        { key: "jobs", label: "Applied Jobs" },
                        { key: "companies", label: "Job History" },
                      ]}
                    />
                  }
                />
              )}

              {/* MAIN CONTENT */}
              <main className={styles.main}>
                {children}
              </main>

              {/* FOOTER - Ẩn trên auth routes */}
              {!isAuthRoute && (
                <Footer
                  className={styles.footer}
                  columns={footerColumns}
                  bottom="© 2025 Recruitify, Inc. All rights reserved"
                />
              )}

            </GlobalLayout>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}