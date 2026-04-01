'use client';

import { Flexbox } from 'react-layout-kit';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Flexbox align="center" justify="center" style={{ minHeight: '100vh' }} gap={16}>
      <Title level={3}>Something went wrong</Title>
      <Text type="secondary">{error.message}</Text>
      <Button type="primary" onClick={() => reset()}>
        Try again
      </Button>
    </Flexbox>
  );
}
