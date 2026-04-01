'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function FavoritesPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Favourite Jobs</Title>
      <Text>Jobs you have saved for later.</Text>
    </Flexbox>
  );
}
