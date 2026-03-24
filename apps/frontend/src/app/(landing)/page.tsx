'use client';

import { useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { createStyles } from 'antd-style';
import HeroSection from '@/components/HeroSection';
import FeatureJob from '@/components/FeatureJob';
import FeatureCompany from '@/components/FeatureCompany';
import { homepageService, homePageData } from '@/services/homepageService';

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
  const [loading, setLoading] = useState(true);
  const [homepageData, setHomepageData] = useState<homePageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homepageService.getHomepageData();
        setHomepageData(data);
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!homepageData) return <div>Failed to load data</div>;

  return (
    <Flexbox className={styles.container}>
      <div className={styles.section}>
        <HeroSection  />
      </div>

      <div className={styles.section}>
        <FeatureJob jobs={homepageData.featureJobs} />
      </div>

      <div className={styles.section}>
        <FeatureCompany companies={homepageData.featureCompanies} />
      </div>
    </Flexbox>
  );
}