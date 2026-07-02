'use client';

import { Card, Table, Tag, Typography, Button, Badge } from 'antd';

import styles from './CurrentOpenings.module.css';

const { Title } = Typography;

const data = [
  {
    key: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    applicants: 85,
    salary: '$2,500',
    status: 'Open',
  },
  {
    key: 2,
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'HCM',
    applicants: 62,
    salary: '$2,200',
    status: 'Open',
  },
  {
    key: 3,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Ha Noi',
    applicants: 41,
    salary: '$1,800',
    status: 'Closed',
  },
  {
    key: 4,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    applicants: 29,
    salary: '$2,800',
    status: 'Open',
  },
  {
    key: 5,
    title: 'Data Analyst',
    department: 'Data & Analytics',
    location: 'HCM',
    applicants: 15,
    salary: '$1,600',
    status: 'Hold',
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'Open':
      return { badgeStatus: 'success' as const, className: styles.tagOpen };
    case 'Hold':
      return { badgeStatus: 'warning' as const, className: styles.tagHold };
    case 'Closed':
      return { badgeStatus: 'error' as const, className: styles.tagClosed };
    default:
      return { badgeStatus: 'default' as const, className: '' };
  }
};

const columns = [
  {
    title: 'Job Title',
    dataIndex: 'title',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Location',
    dataIndex: 'location',
  },
  {
    title: 'Applicants',
    dataIndex: 'applicants',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => {
      const config = getStatusConfig(status);
      return (
        <Tag className={`${styles.statusTag} ${config.className}`}>
          <Badge status={config.badgeStatus} text={status} />
        </Tag>
      );
    },
  },
  {
    title: '',
    render: () => (
      <Button type="link">
        View
      </Button>
    ),
  },
];

export default function CurrentOpenings() {
  return (
    <Card
      className={styles.card}
      bordered={false}
      styles={{
        body: {
          padding: 24,
        },
      }}
    >
      <Title
        level={5}
        className={styles.title}
      >
        Current Openings
      </Title>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className={styles.table}
      />
    </Card>
  );
}