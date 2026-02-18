'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function EditProfilePage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Edit Profile</Title>
      <Text>Update your personal information and CV.</Text>
    </Flexbox>
  );
}
