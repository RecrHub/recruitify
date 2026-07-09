'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ListFilter, Plus, Search } from 'lucide-react';
import { FilterSidebar } from './components/FilterSidebar';
import { JobDetailsPanel } from './components/JobDetailsPanel';
import { JobsTable } from './components/JobsTable';
import { statusTabs } from './jobConstants';
import { mockJobs } from './mockJobs';
import type { EmployerJobListItem, JobStatus } from './types';
import styles from './jobsPage.module.css';
import { DatePicker } from 'antd';

type StatusFilter = 'all' | JobStatus;

const statusTabToFilter: StatusFilter[] = ['all', 'open', 'hold', 'closed', 'draft'];

const PAGE_SIZE = 5;

export default function EmployerJobsPage() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<EmployerJobListItem | null>(null);

  const filteredJobs = useMemo(() => {
    const filter = statusTabToFilter[activeTabIndex] ?? 'all';
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return mockJobs.filter((job) => {
      const matchesStatus = filter === 'all' || job.status === filter;
      const matchesQuery =
        normalizedQuery === '' || job.title.toLowerCase().includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [activeTabIndex, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedJobs = filteredJobs.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

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
