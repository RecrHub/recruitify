import { Button, Modal } from 'antd';
import { Edit3, MapPin, Maximize2, Sparkles, UserCheck, Users, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  formatSalary,
  getCategoryLabel,
  getEmploymentTypeLabel,
  getExperienceLevelLabel,
  getWardLabel,
  getWorkApproachLabel,
} from '../jobDisplay';
import type { EmployerJobListItem } from '../types';
import { StatusBadge } from './StatusBadge';
import contentStyles from './jobDetailsContent.module.css';
import styles from './jobDetailsPanel.module.css';

type JobDetailsPanelProps = {
  job: EmployerJobListItem;
  onClose: () => void;
};

export function JobDetailsPanel({ job, onClose }: JobDetailsPanelProps) {
  const router = useRouter();
  const [isAnalysisConfirmationOpen, setIsAnalysisConfirmationOpen] = useState(false);

  const openAnalysisResults = () => {
    setIsAnalysisConfirmationOpen(false);
    router.push(`/employer/jobs/${job.id}/ai-analysis`);
  };

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

          <nav className={contentStyles.detailsTabs} aria-label="Job details tabs">
            {['Job Description', 'Applicants', 'Matches', 'Statistics'].map((tab, index) => (
              <button key={tab} type="button" className={index === 0 ? contentStyles.detailsTabActive : ''}>
                {tab}
              </button>
            ))}
          </nav>

          <DetailsSection title="About">
            <p>{job.description}</p>
          </DetailsSection>

          <DetailsSection title="Key Responsibilities">
            <ul>
              {job.responsibilities.split('\n').map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </DetailsSection>

          <DetailsSection title="Education">
            <p>{job.education}</p>
          </DetailsSection>

          <DetailsSection title="Skills">
            <div className={contentStyles.skillList}>
              {job.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </DetailsSection>

          <DetailsSection title="Preferred Qualifications">
            <ul>
              {job.requirement.split('\n').map((qualification) => (
                <li key={qualification}>{qualification}</li>
              ))}
            </ul>
          </DetailsSection>
        </div>

        <Button
          type="primary"
          className={styles.aiAnalysisButton}
          aria-label={`Analyze ${job.title} with AI`}
          onClick={() => setIsAnalysisConfirmationOpen(true)}
          icon={
            <span className={styles.aiAnalysisIcon} aria-hidden>
              <Sparkles size={18} />
            </span>
          }
        >
          <span className={styles.aiAnalysisLabel}>AI Analysis</span>
        </Button>

        <Modal
          title="AI Analysis Confirmation"
          open={isAnalysisConfirmationOpen}
          cancelText="Cancel"
          okText="Analysis now"
          okButtonProps={{ className: styles.aiAnalysisConfirmButton }}
          centered
          onCancel={() => setIsAnalysisConfirmationOpen(false)}
          onOk={openAnalysisResults}
        >
          <p>
            Would you like AI to analyze this job posting and provide optimization suggestions? This process may take a
            few seconds to analyze the data and deliver the most accurate results.
          </p>
        </Modal>
      </aside>
    </div>
  );
}

function DetailsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={contentStyles.detailsSection}>
      <h4>{title}</h4>
      {children}
    </section>
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
