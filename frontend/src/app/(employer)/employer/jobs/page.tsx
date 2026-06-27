'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronsUpDown,
  Edit3,
  Eye,
  LayoutList,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { mockJobs } from './mockJobs';
import type { JobPosting, JobStatus } from './types';
import styles from './jobs.module.css';

const tabs = [
  { label: 'All Jobs', count: 45, active: true },
  { label: 'Active', count: 21 },
  { label: 'Draft', count: 6 },
  { label: 'Completed', count: 18 },
  { label: 'Assigned to Me', count: 9 },
];

const filters = [
  {
    title: 'Job Status',
    options: ['Active', 'Draft', 'Completed', 'Open soon'],
  },
  {
    title: 'Employment Type',
    options: ['Full Time', 'Part Time', 'Contract', 'Internship'],
  },
  {
    title: 'Work Approach',
    options: ['Onsite', 'Hybrid', 'Remote'],
  },
  {
    title: 'Experience',
    options: ['5-7 years', '3-5 years', '1-3 years'],
  },
  {
    title: 'Location',
    options: ['Riyadh', 'Jeddah', 'Dubai', 'Remote'],
  },
  {
    title: 'Date Added',
    options: ['Today', 'This week', 'This month'],
  },
];

const statusLabel: Record<JobStatus, string> = {
  active: 'Open',
  draft: 'Draft',
  completed: 'Completed',
};

export default function EmployerJobsPage() {
  const featuredJob = mockJobs[0];

  return (
    <section className={styles.jobsWorkspace} aria-label="Jobs dashboard">
      <aside className={styles.filterSidebar} aria-label="Job filters">
        <div className={styles.filterTitleRow}>
          <h1>Jobs</h1>
          <button type="button" className={styles.filterPill}>
            Filter
            <SlidersHorizontal size={17} aria-hidden />
          </button>
        </div>

        <div className={styles.filterGroups}>
          {filters.map((group) => (
            <section key={group.title} className={styles.filterGroup}>
              <h2>{group.title}</h2>
              <div className={styles.filterOptions}>
                {group.options.map((option) => (
                  <label key={option} className={styles.checkboxRow}>
                    <input type="checkbox" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>

      <div className={styles.mainPanel}>
        <header className={styles.topHeader}>
          <div>
            <div className={styles.titleLine}>
              <h2>{featuredJob.title}</h2>
              <ChevronDown size={20} aria-hidden />
              <StatusBadge status={featuredJob.status} />
            </div>
            <p className={styles.locationLine}>
              <MapPin size={18} aria-hidden />
              {featuredJob.location}
            </p>
          </div>

          <div className={styles.headerActions}>
            <button type="button" className={styles.outlineButton}>
              <Edit3 size={19} aria-hidden />
              Edit Job
            </button>
            <button type="button" className={styles.outlineButton}>
              <Send size={19} aria-hidden />
              Share
            </button>
            <button type="button" className={styles.primaryButton}>
              <Plus size={20} aria-hidden />
              Create Job
            </button>
          </div>
        </header>

        <section className={styles.summaryCard} aria-label="Selected job details">
          <SummaryItem label="Category" value={featuredJob.category} />
          <SummaryItem label="Availability" value={featuredJob.employmentType} />
          <SummaryItem label="Work Approach" value={featuredJob.workApproach} />
          <SummaryItem label="Experience" value={featuredJob.experience} />
          <SummaryItem label="Salary" value={featuredJob.salary} />
          <SummaryItem label="License" value={featuredJob.license} />
        </section>

        <div className={styles.listToolbar}>
          <nav className={styles.tabs} aria-label="Job status tabs">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={`${styles.tabButton} ${tab.active ? styles.tabButtonActive : ''}`}
              >
                {tab.label}
                <span>{tab.count}</span>
              </button>
            ))}
          </nav>

          <div className={styles.toolbarActions}>
            <label className={styles.searchBox}>
              <Search size={18} aria-hidden />
              <input type="search" placeholder="Search jobs..." aria-label="Search jobs" />
            </label>
            <button type="button" className={styles.viewButton}>
              <LayoutList size={19} aria-hidden />
              List View
              <ChevronDown size={17} aria-hidden />
            </button>
          </div>
        </div>

        <JobsList jobs={mockJobs} />

        <footer className={styles.paginationBar}>
          <span>Results: 1-6 of 45</span>
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
      </div>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.summaryItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  return <span className={`${styles.statusBadge} ${styles[`statusBadge_${status}`]}`}>{statusLabel[status]}</span>;
}

function JobsList({ jobs }: { jobs: JobPosting[] }) {
  const [openActionJobId, setOpenActionJobId] = useState<number | null>(null);

  const toggleActionMenu = (jobId: number) => {
    setOpenActionJobId((currentJobId) => (currentJobId === jobId ? null : jobId));
  };

  const closeActionMenu = () => setOpenActionJobId(null);

  return (
    <section className={styles.jobsTable} aria-label="Jobs list">
      <div className={styles.tableHead}>
        <span>Job Title</span>
        <span>
          Applicants <ChevronsUpDown size={15} aria-hidden />
        </span>
        <span>
          Date added <ChevronsUpDown size={15} aria-hidden />
        </span>
        <span>License</span>
        <span>
          Salary <ChevronsUpDown size={15} aria-hidden />
        </span>
        <span>
          Experience <ChevronsUpDown size={15} aria-hidden />
        </span>
        <span aria-label="Actions" />
      </div>

      <div className={styles.tableRows}>
        {jobs.map((job) => (
          <article
            key={job.id}
            className={`${styles.jobRow} ${openActionJobId === job.id ? styles.jobRowMenuOpen : ''}`}
          >
            <div className={styles.jobIdentity}>
              <div className={`${styles.jobAvatar} ${styles[`jobAvatar_${job.status}`]}`}>
                {job.title
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <h3>{job.title}</h3>
                <p>
                  #{job.id} · {job.employmentType} · {job.location}
                </p>
              </div>
            </div>

            <span className={styles.applicantScore}>{job.applicants}</span>
            <span>{job.addedAt}</span>
            <span>{job.license}</span>
            <span>{job.salary}</span>
            <span>{job.experience}</span>
            <div className={styles.rowActions}>
              <StatusBadge status={job.status} />
              <button
                type="button"
                className={styles.moreButton}
                aria-label={`More actions for ${job.title}`}
                aria-expanded={openActionJobId === job.id}
                onClick={() => toggleActionMenu(job.id)}
              >
                <MoreHorizontal size={20} aria-hidden />
              </button>
              {openActionJobId === job.id && (
                <div className={styles.actionMenu} role="menu" aria-label={`Actions for ${job.title}`}>
                  <button type="button" role="menuitem" onClick={closeActionMenu}>
                    <Edit3 size={16} aria-hidden />
                    Edit
                  </button>
                  <button type="button" role="menuitem" onClick={closeActionMenu}>
                    <Eye size={16} aria-hidden />
                    Detail
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className={styles.deleteMenuItem}
                    onClick={closeActionMenu}
                  >
                    <Trash2 size={16} aria-hidden />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
