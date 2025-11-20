'use client';

import Layout from '@/components/Layout';
import { Flexbox } from 'react-layout-kit';
import { createStyles } from 'antd-style';
import Header from '@/components/Header';
import Actions from '@/components/NavAction';
import Tabs from '@/components/Tabs';
import Logo from '@/components/brand/LogoRecruitify/Logo';
import { Section } from 'lucide-react';

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
      <Flexbox className={styles.main} style={{ gap: 16 }}>
        <h1>Welcome to My Homepage</h1>
        <p>
          Đây là phần main content của homepage. Nội dung có thể dài, scroll
          được mà footer vẫn ở dưới.
        </p>
        <section>
          <h2>Đây Là Feature Job</h2>
          <p>Thông tin chi tiết...</p>
        </section>
        <section>
          <h2>Đây Là Freature Company</h2>
          <p>Thông tin chi tiết tiếp theo...</p>
        </section>
      </Flexbox>
    </Layout>
  );
}
