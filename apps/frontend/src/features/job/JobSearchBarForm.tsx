'use client';

import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useStyles } from './JobSearchBarForm.styles';

interface JobSearchBarFormProps {
  onSearch?: (keyword: string) => void;
  className?: string;
}

const JobSearchBarForm = ({ onSearch, className }: JobSearchBarFormProps) => {
  const { styles, cx } = useStyles();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    onSearch?.(searchKeyword);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cx(styles.container, className)}>
      {/* Hero Banner Section with Background Image */}
      <div className={styles.heroBanner}>
        {/* Overlay for better text readability */}
        <div className={styles. heroOverlay} />
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Find your dream job here
          </h1>
          <p className={styles.heroDescription}>
            Join Recruitify. Recruitify is a place where you find your dream job in various here, <br></br> you will also get many other benefits
          </p>
        </div>
      </div>

      {/* Search Section */}
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Search your job"
            size="large"
            className={styles.searchInput}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onPressEnter={handleSearch}
            onKeyPress={handleKeyPress}
            allowClear
          />
          <Button
            type="primary"
            size="large"
            onClick={handleSearch}
            className={styles.searchButton}
          >
            Search
          </Button>
        </div>
      </div>
  );
};

export default JobSearchBarForm;