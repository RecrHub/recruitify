'use client';

import { useState } from 'react';
import { ListFilter } from 'lucide-react';
import { FilterSidebar } from './components/FilterSidebar';
import { JobDetailsPanel } from './components/JobDetailsPanel';
import { JobsTable } from './components/JobsTable';
import { statusTabs } from './jobConstants';
import { mockJobs } from './mockJobs';
import type { EmployerJobListItem } from './types';
import styles from './jobsPage.module.css';
import { DatePicker } from 'antd';

export default function EmployerJobsPage() {
  const [selectedJob, setSelectedJob] = useState<EmployerJobListItem | null>(null);

  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Jobs</h1>

        <div className={styles.toolbarActions}>
          <DatePicker className={styles.pillButton} />
          <button type="button" className={styles.pillButton}>
            <ListFilter size={19} aria-hidden />
            List View
          </button>
        </div>
      </header>

      <section className={styles.jobsPage} aria-label="Jobs dashboard">

        <FilterSidebar />
        <main className={styles.mainPanel}>
          <div className={styles.toolbar}>
            <nav className={styles.tabs} aria-label="Job status tabs">
              {statusTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.tabButton} ${index === 0 ? styles.tabButtonActive : ''}`}
                >
                  {tab}
                </button>
              ))}
            </nav>

          </div>

          <JobsTable jobs={mockJobs} onSelectJob={setSelectedJob} />

          <footer className={styles.paginationBar}>
            <span>Results: 11-20 of 54</span>
            <div className={styles.pagination}>
              <button type="button" aria-label="Previous page">
                ‹
              </button>
              <button type="button">1</button>
              <button type="button" className={styles.pageActive}>
                2
              </button>
              <button type="button">3</button>
              <span>...</span>
              <button type="button">5</button>
              <button type="button" aria-label="Next page">
                ›
              </button>
            </div>
          </footer>
        </main>
      </section>

      {selectedJob && <JobDetailsPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </>
  );
}
