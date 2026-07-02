'use client';

import { Card, Typography } from 'antd';
import {
  Briefcase,
  CheckCircle,
  FileText,
  Headphones,
  UserX,
  Users,
} from 'lucide-react';

import styles from './StatsCards.module.css';

const { Title, Text } = Typography;

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Job Openings Availbable',
      value: '367',
      icon: <Briefcase size={18} />,
      color: '#6C4CF1',
      bg: '#F3EEFF',
    },
    {
      title: 'Total Number of Applications',
      value: '12,045',
      icon: <FileText size={18} />,
      color: '#4096ff',
      bg: '#EEF6FF',
    },
    {
      title: 'Primary Shortlist Candidates',
      value: '3,628',
      icon: <Users size={18} />,
      color: '#d4b106',
      bg: '#FFF8DA',
    },
    {
      title: 'Candidates Interviewed',
      value: '2,042',
      icon: <Headphones size={18} />,
      color: '#fa8c16',
      bg: '#FFF2E8',
    },
    {
      title: 'Applicants Rejected',
      value: '8,234',
      icon: <UserX size={18} />,
      color: '#ff4d4f',
      bg: '#FFF1F0',
    },
    {
      title: 'Candidates Hired',
      value: '9,369',
      icon: <CheckCircle size={18} />,
      color: '#52c41a',
      bg: '#F6FFED',
    },
  ];

  return (
    <Card
      className={styles.wrapper}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div className={styles.grid}>
        {stats.map((item, index) => (
          <div
            key={item.title}
            className={`${styles.item} ${
              index !== stats.length - 1 ? styles.border : ''
            }`}
          >
            <div
              className={styles.icon}
              style={{
                background: item.bg,
                color: item.color,
              }}
            >
              {item.icon}
            </div>

            <Text className={styles.title}>{item.title}</Text>

            <Title level={2} className={styles.value}>
              {item.value}
            </Title>
          </div>
        ))}
      </div>
    </Card>
  );
}