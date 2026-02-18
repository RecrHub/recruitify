'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function HomePage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Dashboard</Title>
      <Text>Welcome to Recruitify! Manage your job search from here.</Text>
    </Flexbox>
  );
}
