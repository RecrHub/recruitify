'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function HistoryPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Job History</Title>
      <Text>Review your past job search activity.</Text>
    </Flexbox>
  );
}
