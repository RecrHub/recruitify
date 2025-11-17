import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { Job } from '@/types/job';

const { Title, Text } = Typography;

interface JobListingGridProps {
  jobs: Job[];
}

export const JobListingGrid: React.FC<JobListingGridProps> = ({ jobs }) => {
  return (
    <Row gutter={[16, 16]}>
      {jobs.map((job) => (
        <Col xs={24} sm={12} lg={8} key={job.id}>
          <Card>
            <Title level={4} style={{ marginBottom: 8 }}>
              {job.title}
            </Title>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              {job.companyName}
            </Text>
            <Text type="secondary">{job.location}</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default JobListingGrid;

