import React, { useEffect } from 'react';
import { Typography, Pagination } from 'antd';
import { useJobsStore } from '@/stores/useJobsStore';
import JobListingGrid from '@/features/jobs/JobListingGrid';

const { Title } = Typography;

const JobsPage: React.FC = () => {
  const {
    jobs,
    currentPage,
    totalElements,
    pageSize,
    fetchJobs,
  } = useJobsStore();

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs(0, pageSize);
  }, [fetchJobs, pageSize]);

  // Handle pagination change
  const handlePageChange = (page: number) => {
    // Ant Design Pagination is 1-indexed, but our API is 0-indexed
    const pageIndex = page - 1;
    fetchJobs(pageIndex, pageSize);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>Job Listings</Title>

      <JobListingGrid jobs={jobs} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <Pagination
          current={currentPage + 1}
          total={totalElements}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default JobsPage;

