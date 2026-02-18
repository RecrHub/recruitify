'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function NotificationsPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Notifications</Title>
      <Text>Stay updated with your latest alerts and updates.</Text>
    </Flexbox>
  );
}
