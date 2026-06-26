'use client';

import { JobCard } from './components/JobCard';
import { JobsFilterBar } from './components/JobsFilterBar';
import { mockJobs } from './mockJobs';
import styles from './jobs.module.css';

export default function EmployerJobsPage() {
  return (
    <section className={styles.dashboardShell} aria-label="Job Management Dashboard">
      <JobsFilterBar />

      <div className={styles.jobList}>
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
