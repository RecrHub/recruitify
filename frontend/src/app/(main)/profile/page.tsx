'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function ProfilePage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>My Profile</Title>
      <Text>View and manage your professional profile.</Text>
    </Flexbox>
  );
}
