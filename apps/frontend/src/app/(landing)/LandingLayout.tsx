'use client';

import Header from '@/components/NavHeader';
import Footer, { FooterProps } from '@/components/Footer';
import NavMenu from '@/components/NavMenu';
import Actions, { MobileActions, MobileSidebarExtras } from '@/components/NavAction';
import Logo from '@/components/brand/LogoRecruitify/Logo';
import Link from 'next/link';
import styles from './LandingLayout.module.css';

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
    items: [{ title: 'Testimonials', url: '/testimonials' }],
  },
];

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        actions={<Actions />}
        mobileActions={<MobileActions />}
        mobileSidebarContent={<MobileSidebarExtras />}
        logo={
          <Link href="/">
            <Logo />
          </Link>
        }
        nav={
          <nav aria-label="Main navigation">
            <NavMenu />
          </nav>
        }
      />

      <main className={styles.main}>{children}</main>

      <Footer
        className={styles.footer}
        columns={footerColumns}
        bottom="© 2025 Recruitify, Inc. All rights reserved"
      />
    </>
  );
}
