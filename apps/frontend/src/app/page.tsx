'use client';

import Layout from '@/components/Layout';
import { Flexbox } from 'react-layout-kit';
import { createStyles } from 'antd-style';
import Header from '@/components/Header';
import Actions from '@/components/NavAction';
import Tabs from '@/components/Tabs';
import Logo from '@/components/brand/LogoRecruitify/Logo';
import HeroSection from '@/components/HeroSection';
import FeatureJob from '@/components/FeatureJob';
import { useEffect, useState } from 'react';
import BrandLoading from '@/components/brand/BrandLoading';
import LogoRecr from '@/components/brand/RecruitifyText/index';
import Footer, { FooterProps } from '@/components/Footer';
import FeatureCompany from '@/components/FeatureCompany';
import PricingSection from '@/components/PricingSection';
import ExploreFAQ from '@/components/ExploreFAQ'

const useStyles = createStyles(({ css, token }) => ({
  footer: css`
    width: 100%;
  `,
  main: css`
    height: 889px;
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

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          zIndex: 9999,
        }}
      >
        <BrandLoading text={LogoRecr} size={100} />
      </div>
    );
  }
  return (
    <Layout
      header={
        <Flexbox
          align="center"
          justify="space-between"
          style={{ padding: "0 16px" }}
        >
          <Header
            actions={
              <Actions
              />
            }
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
        </Flexbox>
      }
      footer={
          <Footer 
          columns={footerColumns} 
          bottom="© 2025 Recruitify, Inc. All rights reserved"
        />
      }
    >
      <HeroSection />
      <FeatureJob/>
      <FeatureCompany/>
      <PricingSection/>
      <ExploreFAQ/>
    </Layout>
  );
}
