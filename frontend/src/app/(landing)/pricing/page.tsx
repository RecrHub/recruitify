'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function PricingPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Pricing</Title>
      <Text>Choose the plan that fits your hiring needs.</Text>
    </Flexbox>
  );
}
