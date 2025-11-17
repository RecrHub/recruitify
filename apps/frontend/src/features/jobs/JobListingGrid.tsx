"use client";
import React from "react";
import { Row, Col, Empty, Spin } from "antd";
import { createStyles } from "antd-style";
import { Job } from "@/types/job";
import JobListingCard from "./JobListingCard";

interface JobListingGridProps {
  jobs: Job[];
  loading?: boolean;
  onJobClick?: (job: Job) => void;
}

const useStyles = createStyles(({ css }) => ({
  loadingContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  `,
  emptyContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  `,
}));

export const JobListingGrid: React.FC<JobListingGridProps> = ({
  jobs,
  loading = false,
  onJobClick,
}) => {
  const { styles } = useStyles();

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  // Empty state
  if (!jobs || jobs.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Empty description="No jobs available" />
      </div>
    );
  }

  // Jobs grid
  return (
    <Row gutter={[16, 16]}>
      {jobs.map((job) => (
        <Col
          key={job.id}
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={8}
          xxl={6}
        >
          <JobListingCard job={job} onClick={onJobClick} />
        </Col>
      ))}
    </Row>
  );
};

export default JobListingGrid;

