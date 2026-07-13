'use client';

import { useEffect, useState } from 'react';
import { Edit3, MapPin, MoreHorizontal, Trash2 } from 'lucide-react';
import { formatSalary, getCategoryLabel, getWardLabel } from '../jobDisplay';
import type { EmployerJobListItem } from '../types';
import { StatusBadge } from './StatusBadge';
import actionStyles from './jobActions.module.css';
import styles from './jobsTable.module.css';

type JobsTableProps = {
  jobs: EmployerJobListItem[];
  onSelectJob: (job: EmployerJobListItem) => void;
};

export function JobsTable({ jobs, onSelectJob }: JobsTableProps) {
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
            <div className={actionStyles.rowActions} data-job-action-menu="true" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className={actionStyles.moreButton}
                aria-label={`More actions for ${job.title}`}
                aria-expanded={openActionJobId === job.id}
                onClick={() => toggleActionMenu(job.id)}
              >
                <MoreHorizontal size={20} aria-hidden />
              </button>
              {openActionJobId === job.id && (
                <div className={actionStyles.actionMenu} role="menu" aria-label={`Actions for ${job.title}`}>
                  <button type="button" role="menuitem" onClick={closeActionMenu}>
                    <Edit3 size={16} aria-hidden />
                    Edit
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className={actionStyles.deleteMenuItem}
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
