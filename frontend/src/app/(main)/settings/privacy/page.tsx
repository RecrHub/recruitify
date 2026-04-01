'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function PrivacySettingsPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Privacy Settings</Title>
      <Text>Control your privacy and data sharing preferences.</Text>
    </Flexbox>
  );
}
