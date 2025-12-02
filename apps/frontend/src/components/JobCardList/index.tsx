'use client';

import React from 'react';
import { EnvironmentOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import BookMark from '@/access/icons/BookMarkOutline.svg';
import Block from '../Block';
import { Button } from 'antd';
import { useStyles } from './style';

const JobCardList: React.FC = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.jobCard}>
      {/* TOP: trái + phải */}
      <div className={styles.cardTopSize}>
        <div className={styles.leftTopSize}>
          <div className={styles.companyLogo} />
          <div className={styles.info}>
            <div className={styles.title}>Frontend Developer</div>
            <div className={styles.company}>Hopin</div>
          </div>
        </div>

        <div className={styles.rightTopSize}>
          <div className={styles.bookmarkRow}>
            <BookMark />
          </div>
          <div className={styles.rateText}>$90-120/hr</div>

          <div className={styles.cardBottom}>
            <div className="metaItem">
              <EnvironmentOutlined />
              <span>Hybrid, North America</span>
            </div>
            <div className="metaItem">
              <ClockCircleOutlined />
              <span>UTC -5</span>
            </div>
            <div className="metaItem">
              <CalendarOutlined />
              <span>20+ hrs/wk</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: tags (trái) + posted + button (phải) */}
      <div className={styles.bottomRow}>
        <div className={styles.tagsRow}>
          <Block className={styles.tagItem}>Tailwind CSS</Block>
          <Block className={styles.tagItem}>React.js</Block>
          <Block className={styles.tagItem}>JavaScript</Block>
          <Block className={styles.tagItem}>CSS3</Block>
          <Block className={styles.tagItem}>TypeScript</Block>
        </div>

        <div className={styles.rightBottom}>
          <span className={styles.postedText}>Posted Apr 6, 2025</span>
          <Button className={styles.applyButton}>Apply Job</Button>
        </div>
      </div>
    </div>
  );
};

export default JobCardList;