'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { FilterSidebar } from './components/FilterSidebar';
import { JobDetailsPanel } from './components/JobDetailsPanel';
import { JobsTable } from './components/JobsTable';
import { statusTabs } from './jobConstants';
import { mockJobs } from './mockJobs';
import type { EmployerJobListItem, JobStatus } from './types';
import styles from './jobsPage.module.css';

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
    <div className={styles.jobsPage}>
      <FilterSidebar />

      <div className={styles.mainPanel}>
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Jobs</h1>
            <p style={{ margin: '4px 0 0', color: '#6b7184', fontSize: 14 }}>
              Manage your open, hold and closed postings in one place.
            </p>
          </div>
          <div className={styles.toolbarActions}>
            <Link href="/employer/jobs/new" className={styles.pillButton}>
              <Plus size={16} aria-hidden />
              Post a New Job
            </Link>
          </div>
        </header>

        <div className={styles.toolbar}>
          <nav className={styles.tabs} aria-label="Job status filter">
            {statusTabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tabButton} ${index === activeTabIndex ? styles.tabButtonActive : ''}`}
                onClick={() => handleTabChange(index)}
                aria-current={index === activeTabIndex ? 'page' : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className={styles.toolbarActions}>
            <label className={styles.pillButton} style={{ cursor: 'text', minHeight: 43 }}>
              <Search size={16} aria-hidden />
              <input
                type="search"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                style={{
                  border: 0,
                  outline: 'none',
                  background: 'transparent',
                  font: 'inherit',
                  minWidth: 160,
                }}
              />
            </label>
          </div>
        </div>

        <JobsTable jobs={paginatedJobs} onSelectJob={setSelectedJob} />

        <div className={styles.paginationBar}>
          <span>
            Showing {filteredJobs.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}-
            {Math.min(safePage * PAGE_SIZE, filteredJobs.length)} of {filteredJobs.length} jobs
          </span>
          <div className={styles.pagination}>
            <button
              type="button"
              aria-label="Previous page"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={page === safePage ? styles.pageActive : ''}
                onClick={() => setCurrentPage(page)}
                aria-current={page === safePage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            >
              <ChevronRight size={16} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {selectedJob && <JobDetailsPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}
