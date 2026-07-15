'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Edit3, MoreHorizontal, Trash2 } from 'lucide-react';
import type { EmployerJobListItem } from '../types';
import actionStyles from './jobActions.module.css';
import styles from './jobsTable.module.css';

export type JobsTableColumn = {
  key: string;
  label: string;
  render: (job: EmployerJobListItem) => ReactNode;
};

type JobsTableProps = {
  jobs: EmployerJobListItem[];
  columns: JobsTableColumn[];
  onSelectJob: (job: EmployerJobListItem) => void;
  onShowNextFields: () => void;
  hasFieldPages: boolean;
};

const createGridTemplate = (columnCount: number) =>
  `repeat(${columnCount}, minmax(0, 1fr)) 34px`;

export function JobsTable({
  jobs,
  columns,
  onSelectJob,
  onShowNextFields,
  hasFieldPages,
}: JobsTableProps) {
  const gridTemplateColumns = createGridTemplate(columns.length);
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
      <div className={styles.tableHeader} style={{ gridTemplateColumns }}>
        {columns.map((column) => (
          <span key={column.key}>{column.label}</span>
        ))}
        <button
          type="button"
          className={styles.nextFieldsButton}
          aria-label="Show next selected fields"
          disabled={!hasFieldPages}
          onClick={onShowNextFields}
        >
          <MoreHorizontal size={20} aria-hidden />
        </button>
      </div>

      <div className={styles.tableRows}>
        {jobs.map((job) => (
          <article
            key={job.id}
            className={`${styles.jobRow} ${openActionJobId === job.id ? styles.jobRowMenuOpen : ''}`}
            style={{ gridTemplateColumns }}
            onClick={() => onSelectJob(job)}
            tabIndex={0}
          >
            {columns.map((column) => (
              <span key={column.key} className={styles.fieldCell} data-label={column.label}>
                {column.render(job)}
              </span>
            ))}
            <div
              className={actionStyles.rowActions}
              data-job-action-menu="true"
              onClick={(event) => event.stopPropagation()}
            >
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
