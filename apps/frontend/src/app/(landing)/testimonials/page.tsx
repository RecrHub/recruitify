'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function TestimonialsPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Testimonials</Title>
      <Text>See what our users say about Recruitify.</Text>
    </Flexbox>
  );
}
