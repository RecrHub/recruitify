'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function AccountSettingsPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Account Settings</Title>
      <Text>Update your email, password, and account details.</Text>
    </Flexbox>
  );
}
