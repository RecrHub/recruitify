'use client';

import { useParams } from 'next/navigation';
import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function AppliedJobDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Job Application Detail</Title>
      <Text>Viewing application #{id}</Text>
    </Flexbox>
  );
}
