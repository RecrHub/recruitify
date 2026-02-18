'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function FeaturesPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Features</Title>
      <Text>Discover what makes Recruitify the best hiring platform.</Text>
    </Flexbox>
  );
}
