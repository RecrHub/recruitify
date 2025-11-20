'use client';

import Layout from '@/components/Layout';
import { Flexbox } from 'react-layout-kit';
import { createStyles } from 'antd-style';
import Header from '@/components/Header';
import { LobeHub } from '@/components/brand';
import Tabs from '@/components/Tabs/Tabs';
import type { TabsProps } from '@/components/Tabs';

const useStyles = createStyles(({ css, token }) => ({
  header: css`
    height: 64px;
    border-bottom: 1px solid ${token.colorBorder};
  `,
  footer: css`
    height: 36px;
    background: ${token.blue};
    border-top: 1px solid ${token.colorBorder};
  `,
  main: css`
    padding: 16px;
    background: ${token.blue5};
  `,
}));

export default function Home() {
  const { styles } = useStyles();
  const tabsItems: TabsProps['items'] = [
    { key: 'favourite_job', label: 'Favourite Jobs' },
    { key: 'applied_job', label: 'Applied Jobs' },
    { key: 'job_history', label: 'Job History' },
  ];
  return (
    <Layout
      header={
        <Flexbox
          align="center"
          justify="space-between"
          className={styles.header}
          style={{ padding: '0 16px' }}
        >
          <Header
            actions={'ACTIONS'}
            logo={<LobeHub type={'combine'} />}
            nav={<Tabs items={tabsItems} />}
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
          Đây là phần main content của homepage. Nội dung có thể dài, scroll được mà footer vẫn ở dưới.
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
