'use client';

import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface JobSearchBarFormProps {
  onSearch?: (keyword: string) => void;
  className?: string;
}

const JobSearchBarForm = ({ onSearch, className }: JobSearchBarFormProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    onSearch?.(searchKeyword);
  };

  return (
    <div className={className}>
      {/* Hero Banner Section with Background Image */}
      <div style={{
        backgroundImage: 'url(/layoutfindjob.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '24px 32px',
        borderRadius: '8px',
        color: 'white',
        marginBottom: '16px',
        position: 'relative',
      }}>
        {/* Optional overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '8px',
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '8px',
            color: 'white',
          }}>
            Find your dream job here
          </h1>
          <p style={{
            fontSize: '14px',
            marginBottom: '0',
            opacity: 0.95,
            color: 'white',
          }}>
            Join Recruitify. Recruitify is a place where you find your dream job in various here you will also get many other benefits
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div style={{
        background: '#fff',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
        }}>
          <Input
            placeholder="Search your job"
            size="large"
            prefix={<SearchOutlined />}
            style={{
              height: '44px',
              borderRadius: '8px',
              flex: 1,
            }}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleSearch}
            style={{
              height: '44px',
              padding: '0 28px',
              backgroundColor: '#10b981',
              borderColor: '#10b981',
              fontWeight: 500,
              borderRadius: '8px',
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchBarForm;

