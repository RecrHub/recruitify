'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function ReviewPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Reviews</Title>
      <Text>Read reviews from employers and job seekers.</Text>
    </Flexbox>
  );
}
