'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function SettingsPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Settings</Title>
      <Text>Manage your account preferences.</Text>
    </Flexbox>
  );
}
