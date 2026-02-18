'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function InsightsPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Insights</Title>
      <Text>Latest trends and tips in recruitment.</Text>
    </Flexbox>
  );
}
