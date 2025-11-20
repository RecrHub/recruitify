'use client';

import Layout from '@/components/Layout';
import { Flexbox } from 'react-layout-kit';
import { createStyles } from 'antd-style';
import Header from '@/components/Header';
import Actions from '@/components/NavAction';
import Tabs from '@/components/Tabs';
import Logo from '@/components/brand/LogoRecruitify/Logo';
import { Section } from 'lucide-react';
import HeroSection from '@/components/HeroSection';

const useStyles = createStyles(({ css, token }) => ({
  footer: css`
    height: 36px;
  `,
  main: css`
    height: 889px;
  `,
}));

export default function Home() {
  const { styles } = useStyles();
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
                onLogin={() => {
                  /* login */
                }}
                onPost={() => {
                  /* post */
                }}
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
        <Flexbox align="center" justify="center" className={styles.footer}>
          Đây Là Phần Footer
        </Flexbox>
      }
    >
      <HeroSection />
    </Layout>
  );
}
