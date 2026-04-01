'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function MessagesPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Messages</Title>
      <Text>Chat with recruiters and employers.</Text>
    </Flexbox>
  );
}
