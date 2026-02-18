'use client';

import { Flexbox } from 'react-layout-kit';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export default function AppliedJobsPage() {
  return (
    <Flexbox padding={24} gap={16}>
      <Title level={2}>Applied Jobs</Title>
      <Text>Track the status of your job applications.</Text>
    </Flexbox>
  );
}
