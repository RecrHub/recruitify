"use client";

import { Suspense, useEffect, useState } from "react";
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
import LogoRecr from "@/components/brand/RecruitifyText";
import Link from "next/link";

const useStyles = createStyles(({ css }) => ({
  footer: css`width: 100%;`,
  main: css`min-height: 80vh;`,
  loadingWrapper: css`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 9999;
  `,
}));

const footerColumns: FooterProps["columns"] = [
  {
    title: "Company",
    items: [
      { title: "Features", url: "/features" },
      { title: "Pricing", url: "/pricing" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Insights", url: "/insights" },
      { title: "Review", url: "/review" },
    ],
  },
  {
    title: "Legal",
    items: [{ title: "Testimonials", url: "/testimonials" }],
  },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { styles } = useStyles();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const authRoutes = ["/login", "/signup", "/forget-password", "/reset-password"];
  const isAuthRoute = authRoutes.includes(pathname);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense
      fallback={
        <div className={styles.loadingWrapper}>
          <BrandLoading text={LogoRecr} size={50} />
        </div>
      }
    >
      <AuthProvider>
        <GlobalLayout appearance="light">
          {loading && (
            <div className={styles.loadingWrapper}>
              <BrandLoading text={LogoRecr} size={50} />
            </div>
          )}

          {!isAuthRoute && (
            <Header
              actions={<Actions />}
              logo={
                <Link href="/">
                  <Logo />
                </Link>
              }
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

          <main className={styles.main}>{children}</main>

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
  );
}
