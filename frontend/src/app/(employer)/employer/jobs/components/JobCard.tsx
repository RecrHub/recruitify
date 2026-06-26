'use client';

import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  CircleDot,
  FilePenLine,
  Heart,
  MapPin,
  MoreHorizontal,
  Network,
  Zap,
} from 'lucide-react';
import { PipelineStat } from './PipelineStat';
import type { JobPosting, JobStatus } from '../types';
import styles from '../jobs.module.css';

interface JobCardProps {
  job: JobPosting;
}

const statusLabel: Record<JobStatus, string> = {
  active: 'Active',
  draft: 'Draft',
  completed: 'Completed',
};

export function JobCard({ job }: JobCardProps) {
  const isDraft = job.status === 'draft';
  const pipelineBeforeOutcome = job.pipeline.slice(0, 4);
  const pipelineOutcome = job.pipeline.slice(4);

  return (
    <article className={`${styles.jobCard} ${styles[`jobCard_${job.status}`]}`}>
      <div className={styles.cardAccent} aria-hidden />

      <div className={styles.jobCardHeader}>
        <div className={styles.jobTitleGroup}>
          <div className={styles.titleRow}>
            <h2>{job.title}</h2>
            <StatusBadge status={job.status} />
            {job.assignedToMe && <span className={styles.assignedBadge}>Assigned to me</span>}
          </div>

          <div className={styles.metaRow}>
            <span>ID: #{job.id}</span>
            <span>
              <BriefcaseBusiness size={17} aria-hidden />
              {job.employmentType}
            </span>
            <span>
              <MapPin size={17} aria-hidden />
              {job.location}
            </span>
            <span>
              Job Available:
              {job.available ? (
                <>
                  <CircleDot className={styles.availabilityIcon} size={17} aria-hidden />
                  {job.available.current}/{job.available.total}
                </>
              ) : (
                ' -'
              )}
            </span>
          </div>
        </div>

        <div className={styles.cardActions}>
          <span className={styles.addedAt}>
            Added at <strong>{job.addedAt}</strong>
          </span>
          <span className={styles.actionDivider} aria-hidden />
          <button type="button" className={styles.iconButton} aria-label={`Save ${job.title}`}>
            <Heart size={21} aria-hidden />
          </button>
          <button type="button" className={styles.iconButton} aria-label={`More options for ${job.title}`}>
            <MoreHorizontal size={22} aria-hidden />
          </button>
          {!isDraft && (
            <button type="button" className={styles.detailButton}>
              Detail
              <ChevronRight size={19} aria-hidden />
            </button>
          )}
        </div>
      </div>

      {isDraft ? (
        <div className={styles.draftCta}>
          <div className={styles.draftContent}>
            <div className={styles.draftIcon}>
              <FilePenLine size={23} aria-hidden />
            </div>
            <div>
              <h3>Complete Your Job Posting Draft</h3>
              <p>Continue to setup job detail and publish for receiving applicants.</p>
            </div>
          </div>
          <button type="button" className={styles.setupButton}>
            Setup Job
            <ChevronRight size={19} aria-hidden />
          </button>
        </div>
      ) : (
        <div className={styles.pipelineRow}>
          {pipelineBeforeOutcome.map((item) => (
            <PipelineStat key={item.key} item={item} />
          ))}
          <div className={styles.pipelineSeparator} aria-hidden>
            &gt;&gt;
          </div>
          {pipelineOutcome.map((item) => (
            <PipelineStat key={item.key} item={item} />
          ))}
        </div>
      )}
    </article>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  const Icon = status === 'active' ? Zap : status === 'completed' ? Network : FilePenLine;

  return (
    <span className={`${styles.statusBadge} ${styles[`statusBadge_${status}`]}`}>
      <Icon size={14} aria-hidden />
      {statusLabel[status]}
      <ChevronDown size={13} aria-hidden />
    </span>
  );
}
