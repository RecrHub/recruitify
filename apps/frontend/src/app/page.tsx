'use client';

import { Flexbox } from 'react-layout-kit';
import { createStyles } from 'antd-style';
import HeroSection from '@/components/HeroSection';
import FeatureJob from '@/components/FeatureJob';
import FeatureCompany from '@/components/FeatureCompany';
import PricingSection from '@/components/PricingSection';
import ExploreFAQ from '@/components/ExploreFAQ';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: 100%;
    min-height: 100vh;
  `,
  section: css`
    width: 100%;
    padding-block: 60px;
    
    &:first-child {
      padding-top: 0;
    }
  `,
}));

export default function Home() {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.container}>
      <div className={styles.section}>
        <HeroSection />
      </div>

      <div className={styles.section}>
        <FeatureJob />
      </div>

      <div className={styles.section}>
        <FeatureCompany />
      </div>

      <div className={styles.section}>
        <PricingSection />
      </div>

      <div className={styles.section}>
        <ExploreFAQ />
      </div>
    </Flexbox>
  );
}