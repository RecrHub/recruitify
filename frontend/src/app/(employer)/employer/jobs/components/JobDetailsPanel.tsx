import { Button, Modal, Spin, message } from 'antd';
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
import api from '@/services/apiAdmin/api';

type JobDetailsPanelProps = {
  job: EmployerJobListItem;
  onClose: () => void;
};

export function JobDetailsPanel({ job, onClose }: JobDetailsPanelProps) {
  const router = useRouter();
  const [isAnalysisConfirmationOpen, setIsAnalysisConfirmationOpen] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const openAnalysisResults = async () => {
    try {
      setIsAnalyzing(true);
      const response = await api.post(`/api/v1/hr/jobs/${job.id}/analyze`);
      const data = response.data.data; // ApiResponse has a 'data' field
      sessionStorage.setItem('ai_analysis_result', JSON.stringify(data));
      setIsAnalysisConfirmationOpen(false);
      router.push(`/employer/jobs/${job.id}/ai-analysis`);
    } catch (error: any) {
      console.error('Error during AI analysis:', error);
      setIsAnalysisConfirmationOpen(false);
      message.error(error.response?.data?.message || 'Failed to analyze job. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
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
                {job.locationText} ({job.workApproachText})
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
            <SummaryItem label="Category" value={job.categoryText} />
            <SummaryItem label="Availability" value={job.employmentTypeText} />
            <SummaryItem label="Work Approach" value={job.workApproachText} />
            <SummaryItem label="Featured" value={job.isFeatured ? 'Yes' : 'No'} />
            <SummaryItem label="Experience" value={job.experienceLevelText} />
            <SummaryItem label="Salary" value={job.salaryText} />
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
          title={isAnalyzing ? "Analyzing..." : "AI Analysis Confirmation"}
          open={isAnalysisConfirmationOpen}
          cancelText="Cancel"
          okText="Analysis now"
          okButtonProps={{ className: styles.aiAnalysisConfirmButton }}
          confirmLoading={isAnalyzing}
          centered
          closable={!isAnalyzing}
          maskClosable={!isAnalyzing}
          footer={isAnalyzing ? null : undefined}
          onCancel={() => !isAnalyzing && setIsAnalysisConfirmationOpen(false)}
          onOk={openAnalysisResults}
        >
          {isAnalyzing ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
               <Spin size="large" />
               <p style={{ marginTop: 16 }}>AI is analyzing this job. This may take a few seconds...</p>
            </div>
          ) : (
            <p>
              Would you like AI to analyze this job posting and provide optimization suggestions? This process may take a
              few seconds to analyze the data and deliver the most accurate results.
            </p>
          )}
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
