'use client';

import { useEffect, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  Edit3,
  Eye,
  ListFilter,
  MapPin,
  Maximize2,
  MoreHorizontal,
  SlidersHorizontal,
  Trash2,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { mockJobs } from './mockJobs';
import type { EmployerJobListItem, JobStatus } from './types';
import styles from './jobs.module.css';

const statusTabs = ['All', 'Open', 'Hold', 'Closed', 'Drafts (2)'];

const filterGroups = [
  {
    title: 'Category Selection',
    options: ['Marketing Department', 'Engineering Team', 'Product Division', 'Operations Group', 'Sales Department'],
  },
  {
    title: 'Location Details',
    options: ['Toronto, Ontario, Canada', 'New York City, USA', 'Lead Position, UK'],
  },
  {
    title: 'Job Type Options',
    options: ['Full-Time Role', 'Part-Time Role', 'Contractor Position'],
  },
];

const statusLabel: Record<JobStatus, string> = {
  open: 'Open',
  hold: 'Hold',
  closed: 'Closed',
  draft: 'Draft',
};

const categoryLabel: Record<number, string> = {
  1: 'Administrative',
  2: 'Product',
  3: 'Marketing',
  4: 'Engineering',
};

const employmentTypeLabel: Record<number, string> = {
  1: 'Full-time/part-time',
  2: 'Full-time',
  3: 'Part-time',
};

const experienceLevelLabel: Record<number, string> = {
  1: 'Entry level',
  2: 'Mid level',
  3: 'Senior level',
};

const workApproachLabel: Record<number, string> = {
  1: 'Onsite',
  2: 'Hybrid',
  3: 'Remote',
};

const wardLabel: Record<string, string> = {
  'CA-ON': 'Canada',
  'US-NY': 'USA',
  'IN-DL': 'India',
  'UK-LDN': 'UK',
};

const getCategoryLabel = (categoryId: number) => categoryLabel[categoryId] ?? `Category #${categoryId}`;
const getEmploymentTypeLabel = (employmentTypeId: number) =>
  employmentTypeLabel[employmentTypeId] ?? `Employment type #${employmentTypeId}`;
const getExperienceLevelLabel = (experienceLevelId: number) =>
  experienceLevelLabel[experienceLevelId] ?? `Experience level #${experienceLevelId}`;
const getWorkApproachLabel = (workApproachId: number) => workApproachLabel[workApproachId] ?? `Work approach #${workApproachId}`;
const getWardLabel = (wardCode: string) => wardLabel[wardCode] ?? wardCode;
const formatSalary = (minSalary: number, maxSalary: number) =>
  `$${Math.round(minSalary / 1000)}K - $${Math.round(maxSalary / 1000)}K`;

export default function EmployerJobsPage() {
  const [selectedJob, setSelectedJob] = useState<EmployerJobListItem | null>(null);

  return (
    <>
      <section className={styles.jobsPage} aria-label="Jobs dashboard">
        <aside className={styles.filterSidebar} aria-label="Job filters">
          <h1>Jobs</h1>

          <button type="button" className={styles.filterButton}>
            Filter Options
            <SlidersHorizontal size={14} aria-hidden />
          </button>

          <div className={styles.filterGroups}>
            {filterGroups.map((group) => (
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

            <div className={styles.toolbarActions}>
              <button type="button" className={styles.pillButton}>
                <CalendarDays size={19} aria-hidden />
                December, 2027
                <ChevronDown size={15} aria-hidden />
              </button>
              <button type="button" className={styles.pillButton}>
                <ListFilter size={19} aria-hidden />
                List View
              </button>
            </div>
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

function JobsTable({
  jobs,
  onSelectJob,
}: {
  jobs: EmployerJobListItem[];
  onSelectJob: (job: EmployerJobListItem) => void;
}) {
  const [openActionJobId, setOpenActionJobId] = useState<number | null>(null);

  useEffect(() => {
    if (openActionJobId === null) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest('[data-job-action-menu="true"]')) {
        return;
      }

      setOpenActionJobId(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [openActionJobId]);

  const toggleActionMenu = (jobId: number) => {
    setOpenActionJobId((currentJobId) => (currentJobId === jobId ? null : jobId));
  };

  const closeActionMenu = () => setOpenActionJobId(null);

  return (
    <section className={styles.jobsTable} aria-label="Jobs list">
      <div className={styles.tableHeader}>
        <span>Job Title</span>
        <span>Category</span>
        <span>Status</span>
        <span>Salary</span>
        <span>Location</span>
        <span>Matched</span>
        <span aria-label="Actions" />
      </div>

      <div className={styles.tableRows}>
        {jobs.map((job) => (
          <article
            key={job.id}
            className={`${styles.jobRow} ${openActionJobId === job.id ? styles.jobRowMenuOpen : ''}`}
            onClick={() => onSelectJob(job)}
            tabIndex={0}
          >
            <span className={styles.jobTitle}>{job.title}</span>
            <span className={styles.categoryText}>{getCategoryLabel(job.categoryId)}</span>
            <StatusBadge status={job.status} />
            <span>{formatSalary(job.minSalary, job.maxSalary)}</span>
            <span className={styles.locationCell}>
              <MapPin size={16} aria-hidden />
              {getWardLabel(job.wardCode)}
            </span>
            <span>{job.matched}</span>
            <div className={styles.rowActions} data-job-action-menu="true" onClick={(event) => event.stopPropagation()}>
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
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      closeActionMenu();
                      onSelectJob(job);
                    }}
                  >
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

function StatusBadge({ status }: { status: JobStatus }) {
  return <span className={`${styles.statusBadge} ${styles[`statusBadge_${status}`]}`}>{statusLabel[status]}</span>;
}

function JobDetailsPanel({ job, onClose }: { job: EmployerJobListItem; onClose: () => void }) {
  return (
    <div className={styles.detailsOverlay} role="presentation" onClick={onClose}>
      <aside
        className={styles.detailsPanel}
        role="dialog"
        aria-modal="true"
        aria-label={`${job.title} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.detailsTopbar}>
          <div className={styles.detailsNav}>
            <h2>Job Details</h2>
            <button type="button">‹ Previous</button>
            <button type="button">Next ›</button>
          </div>
          <div className={styles.detailsIconActions}>
            <button type="button" aria-label="Expand details">
              <Maximize2 size={20} aria-hidden />
            </button>
            <button type="button" aria-label="Close details" onClick={onClose}>
              <X size={22} aria-hidden />
            </button>
          </div>
        </header>

        <div className={styles.detailsContent}>
          <section className={styles.detailsHero}>
            <div>
              <div className={styles.detailsTitleRow}>
                <h3>{job.title}</h3>
                <StatusBadge status={job.status} />
              </div>
              <p className={styles.detailsLocation}>
                <MapPin size={16} aria-hidden />
                {getWardLabel(job.wardCode)} ({getWorkApproachLabel(job.workApproachId)})
              </p>
            </div>

            <div className={styles.detailsHeroActions}>
              <button type="button" className={styles.detailsPillButton}>
                <Edit3 size={18} aria-hidden />
                Edit Post
              </button>
              <button type="button" className={styles.detailsPillButton}>
                Share
              </button>
            </div>
          </section>

          <section className={styles.detailsSummary} aria-label="Job summary">
            <SummaryItem label="Category" value={getCategoryLabel(job.categoryId)} />
            <SummaryItem label="Availability" value={getEmploymentTypeLabel(job.employmentTypeId)} />
            <SummaryItem label="Work Approach" value={getWorkApproachLabel(job.workApproachId)} />
            <SummaryItem label="Featured" value={job.isFeatured ? 'Yes' : 'No'} />
            <SummaryItem label="Experience" value={getExperienceLevelLabel(job.experienceLevelId)} />
            <SummaryItem label="Salary" value={formatSalary(job.minSalary, job.maxSalary)} />
          </section>

          <div className={styles.detailsStats}>
            <span>
              <Users size={18} aria-hidden />
              {job.applicants} Applicants
            </span>
            <span>
              <UserCheck size={18} aria-hidden />
              {job.matched} Matched
            </span>
          </div>

          <nav className={styles.detailsTabs} aria-label="Job details tabs">
            {['Job Description', 'Applicants', 'Matches', 'Statistics'].map((tab, index) => (
              <button key={tab} type="button" className={index === 0 ? styles.detailsTabActive : ''}>
                {tab}
              </button>
            ))}
          </nav>

          <section className={styles.detailsSection}>
            <h4>About</h4>
            <p>{job.description}</p>
          </section>

          <section className={styles.detailsSection}>
            <h4>Key Responsibilities</h4>
            <ul>
              {job.responsibilities.split('\n').map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </section>

          <section className={styles.detailsSection}>
            <h4>Education</h4>
            <p>{job.education}</p>
          </section>

          <section className={styles.detailsSection}>
            <h4>Skills</h4>
            <div className={styles.skillList}>
              {job.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className={styles.detailsSection}>
            <h4>Preferred Qualifications</h4>
            <ul>
              {job.requirement.split('\n').map((qualification) => (
                <li key={qualification}>{qualification}</li>
              ))}
            </ul>
          </section>
        </div>
      </aside>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.detailsSummaryItem}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
