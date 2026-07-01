'use client';

import Link from 'next/link';
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
import type { JobPosting, JobStatus } from './types';
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

export default function EmployerJobsPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

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
              <Link href="/employer/jobs/create" className={styles.createJobButton}>
                Create Job
              </Link>
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

function JobsTable({ jobs, onSelectJob }: { jobs: JobPosting[]; onSelectJob: (job: JobPosting) => void }) {
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
            <span className={styles.categoryText}>{job.category}</span>
            <StatusBadge status={job.status} />
            <span>{job.salary}</span>
            <span className={styles.locationCell}>
              <MapPin size={16} aria-hidden />
              {job.location}
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

function JobDetailsPanel({ job, onClose }: { job: JobPosting; onClose: () => void }) {
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
                {job.location} ({job.workApproach})
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
            <SummaryItem label="Category" value={job.category} />
            <SummaryItem label="Availability" value={job.availability} />
            <SummaryItem label="Work Approach" value={job.workApproach} />
            <SummaryItem label="License" value={job.license} />
            <SummaryItem label="Experience" value={job.experience} />
            <SummaryItem label="Salary" value={job.salary} />
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
            <p>{job.about}</p>
          </section>

          <section className={styles.detailsSection}>
            <h4>Key Responsibilities</h4>
            <ul>
              {job.responsibilities.map((responsibility) => (
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
              {job.qualifications.map((qualification) => (
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
