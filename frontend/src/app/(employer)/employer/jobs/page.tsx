'use client';

import { useMemo, useState } from 'react';
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Plus,
  Share2,
  Users,
  X,
} from 'lucide-react';
import styles from './page.module.css';

type JobStatus = 'Active' | 'Draft' | 'Closed';

interface JobItem {
  id: number;
  title: string;
  department: string;
  city: string;
  employmentType: string;
  status: JobStatus;
}

interface JobForm {
  title: string;
  department: string;
  closingDate: string;
  employmentType: string;
  position: string;
  workplaceType: string;
  country: string;
  city: string;
  minSalary: string;
  maxSalary: string;
  currency: string;
  paymentType: string;
  teamMember: string;
  shareChannel: string;
}

const emptyForm: JobForm = {
  title: '',
  department: '',
  closingDate: '',
  employmentType: '',
  position: '',
  workplaceType: '',
  country: '',
  city: '',
  minSalary: '',
  maxSalary: '',
  currency: '',
  paymentType: '',
  teamMember: '',
  shareChannel: '',
};

const initialJobs: JobItem[] = [
  {
    id: 1,
    title: 'Academic Director',
    department: 'Academic',
    city: 'Ho Chi Minh',
    employmentType: 'Full-time',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    city: 'Da Nang',
    employmentType: 'Contract',
    status: 'Draft',
  },
];

const workplaceTypes = [
  {
    title: 'On-Site',
    description: 'Employees work from an office',
  },
  {
    title: 'Hybird',
    description: 'Employees work from both office and home',
  },
  {
    title: 'Remote',
    description: 'Employees work from home',
  },
];

const paymentTypes = [
  {
    title: 'Weekly',
    description: 'Payment is processed every week. Suitable for short-term projects.',
  },
  {
    title: 'Monthly',
    description: 'Payment is processed each month. Ideal for ongoing work or contracts.',
  },
  {
    title: 'Contract',
    description: 'Single payment made once. Best for fixed-scope or one-off jobs.',
  },
];

const steps = [
  {
    title: 'Job Information',
    text: 'Provide key details to define the job.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Team Member',
    text: 'Assign the team who will manage candidates.',
    icon: Users,
  },
  {
    title: 'Share Job',
    text: 'Choose where this job will be shared.',
    icon: Share2,
  },
];

function SelectField({
  label,
  value,
  placeholder,
  options,
  hasCalendar,
  onChange,
}: {
  label?: string;
  value: string;
  placeholder: string;
  options: string[];
  hasCalendar?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      {label && <span>{label}</span>}
      <div className={styles.selectWrap}>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {hasCalendar ? <CalendarDays size={16} /> : <ChevronDown size={16} />}
      </div>
    </label>
  );
}

function TextField({
  label,
  value,
  placeholder,
  wide,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  wide?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`${styles.field} ${wide ? styles.fieldWide : ''}`}>
      <span>{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function OptionCard({
  title,
  description,
  active,
  onClick,
}: {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`${styles.optionCard} ${active ? styles.optionCardActive : ''}`} type="button" onClick={onClick}>
      <span className={styles.radioDot} aria-hidden="true" />
      <span className={styles.optionText}>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </button>
  );
}

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<JobForm>(emptyForm);
  const [toast, setToast] = useState('');

  const modalTitle = editingJobId ? 'Edit Job' : 'Create New Jobs';

  const statusCounts = useMemo(
    () => ({
      active: jobs.filter((job) => job.status === 'Active').length,
      draft: jobs.filter((job) => job.status === 'Draft').length,
      total: jobs.length,
    }),
    [jobs],
  );

  const updateForm = (key: keyof JobForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const openCreateModal = () => {
    setEditingJobId(null);
    setCurrentStep(0);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (job: JobItem) => {
    setEditingJobId(job.id);
    setCurrentStep(0);
    setForm({
      ...emptyForm,
      title: job.title,
      department: job.department,
      employmentType: job.employmentType,
      city: job.city,
      country: 'Viet Nam',
      currency: 'USD',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveJob = (status: JobStatus) => {
    if (editingJobId) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingJobId
            ? {
                ...job,
                title: form.title || job.title,
                department: form.department || job.department,
                city: form.city || job.city,
                employmentType: form.employmentType || job.employmentType,
                status,
              }
            : job,
        ),
      );
      showToast('Job updated successfully');
    } else {
      const nextJob: JobItem = {
        id: Date.now(),
        title: form.title || 'Untitled Job',
        department: form.department || 'General',
        city: form.city || 'Not selected',
        employmentType: form.employmentType || 'Not selected',
        status,
      };
      setJobs((prev) => [nextJob, ...prev]);
      showToast(status === 'Draft' ? 'Draft saved successfully' : 'Job created successfully');
    }

    setIsModalOpen(false);
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    saveJob('Active');
  };

  return (
    <main className={styles.jobsPage}>
      <section className={styles.pageHeader}>
        <div>
          <p>Employer Jobs</p>
          <h1>Job Management</h1>
        </div>
        <button className={styles.createButton} type="button" onClick={openCreateModal}>
          <Plus size={18} />
          Create Job
        </button>
      </section>

      <section className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <span>Total Jobs</span>
          <strong>{statusCounts.total}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>Active Jobs</span>
          <strong>{statusCounts.active}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>Draft Jobs</span>
          <strong>{statusCounts.draft}</strong>
        </div>
      </section>

      <section className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2>All Jobs</h2>
          <span>{jobs.length} jobs</span>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Employment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.city}</td>
                  <td>{job.employmentType}</td>
                  <td>
                    <span className={`${styles.statusPill} ${styles[`status${job.status}`]}`}>{job.status}</span>
                  </td>
                  <td>
                    <div className={styles.actionGroup}>
                      <button type="button" onClick={() => openEditModal(job)} aria-label={`Edit ${job.title}`}>
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <section className={styles.jobModal} aria-modal="true" role="dialog">
            <header className={styles.modalTopbar}>
              <div className={styles.titleGroup}>
                <button className={styles.closeButton} type="button" onClick={closeModal} aria-label="Close">
                  <X size={18} />
                </button>
                <h2>{modalTitle}</h2>
              </div>

              <div className={styles.modalActions}>
                <button className={styles.secondaryButton} type="button">
                  Preview
                </button>
                <span className={styles.divider} aria-hidden="true" />
                <button className={styles.secondaryButton} type="button" onClick={() => saveJob('Draft')}>
                  Save as Draft
                </button>
                <button className={styles.primaryButton} type="button" onClick={goNext}>
                  {currentStep === steps.length - 1 ? 'Save' : 'Next'}
                </button>
              </div>
            </header>

            <div className={styles.modalBody}>
              <aside className={styles.stepsPanel}>
                <div className={styles.stepActivePattern} />
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const active = currentStep === index;

                  return (
                    <div className={styles.stepBlock} key={step.title}>
                      <button
                        className={`${styles.stepItem} ${active ? styles.stepItemActive : ''}`}
                        type="button"
                        onClick={() => setCurrentStep(index)}
                      >
                        <span className={active ? styles.stepIcon : styles.stepIconMuted}>
                          <StepIcon size={17} />
                        </span>
                        <span className={styles.stepCopy}>
                          <small>STEP {index + 1}</small>
                          <strong>{step.title}</strong>
                          {active && <em>{step.text}</em>}
                        </span>
                      </button>
                      {index < steps.length - 1 && <span className={styles.stepConnector} aria-hidden="true" />}
                    </div>
                  );
                })}
              </aside>

              <form className={styles.formCard}>
                {currentStep === 0 && (
                  <>
                    <section className={styles.formSection}>
                      <h3>Job Detail</h3>
                      <div className={styles.gridTwo}>
                        <SelectField
                          label="Job Title"
                          value={form.title}
                          placeholder="Select Job Title"
                          options={['Academic Director', 'Product Designer', 'Frontend Developer', 'HR Manager']}
                          onChange={(value) => updateForm('title', value)}
                        />
                        <SelectField
                          label="Department"
                          value={form.department}
                          placeholder="Select Department"
                          options={['Academic', 'Design', 'Engineering', 'Human Resource']}
                          onChange={(value) => updateForm('department', value)}
                        />
                        <SelectField
                          label="Job Vacancy Closing Date"
                          value={form.closingDate}
                          placeholder="Select Date"
                          options={['2026-07-15', '2026-08-01', '2026-08-30']}
                          hasCalendar
                          onChange={(value) => updateForm('closingDate', value)}
                        />
                        <SelectField
                          label="Employment Type"
                          value={form.employmentType}
                          placeholder="Select Type"
                          options={['Full-time', 'Part-time', 'Contract', 'Internship']}
                          onChange={(value) => updateForm('employmentType', value)}
                        />
                        <TextField
                          label="Job Available Position"
                          value={form.position}
                          placeholder="Enter position name"
                          wide
                          onChange={(value) => updateForm('position', value)}
                        />
                      </div>

                      <div className={styles.groupBlock}>
                        <h4>Workplace Type</h4>
                        <div className={styles.optionGrid}>
                          {workplaceTypes.map((item) => (
                            <OptionCard
                              key={item.title}
                              title={item.title}
                              description={item.description}
                              active={form.workplaceType === item.title}
                              onClick={() => updateForm('workplaceType', item.title)}
                            />
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className={styles.formSection}>
                      <h3>Location</h3>
                      <div className={styles.gridTwo}>
                        <SelectField
                          label="Country"
                          value={form.country}
                          placeholder="Select Country"
                          options={['Viet Nam', 'Singapore', 'Thailand']}
                          onChange={(value) => updateForm('country', value)}
                        />
                        <SelectField
                          label="City"
                          value={form.city}
                          placeholder="Select City"
                          options={['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Singapore']}
                          onChange={(value) => updateForm('city', value)}
                        />
                      </div>
                    </section>

                    <section className={styles.formSection}>
                      <div className={styles.sectionTitleRow}>
                        <h3>Salary</h3>
                        <label className={styles.checkboxLabel}>
                          <input type="checkbox" />
                          <span>Prefer not to say</span>
                        </label>
                      </div>

                      <div className={styles.salaryGrid}>
                        <TextField
                          label="Salary Range"
                          value={form.minSalary}
                          placeholder="Min Salary"
                          onChange={(value) => updateForm('minSalary', value)}
                        />
                        <label className={styles.fieldNoLabel}>
                          <input
                            value={form.maxSalary}
                            placeholder="Max Salary"
                            onChange={(event) => updateForm('maxSalary', event.target.value)}
                          />
                        </label>
                        <div className={styles.fieldNoLabel}>
                          <SelectField
                            label=""
                            value={form.currency}
                            placeholder="Currency"
                            options={['USD', 'VND', 'SGD']}
                            onChange={(value) => updateForm('currency', value)}
                          />
                        </div>
                      </div>

                      <div className={styles.groupBlock}>
                        <h4>Payment Type</h4>
                        <div className={styles.optionGrid}>
                          {paymentTypes.map((item) => (
                            <OptionCard
                              key={item.title}
                              title={item.title}
                              description={item.description}
                              active={form.paymentType === item.title}
                              onClick={() => updateForm('paymentType', item.title)}
                            />
                          ))}
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {currentStep === 1 && (
                  <section className={styles.formSection}>
                    <h3>Team Member</h3>
                    <div className={styles.singleColumn}>
                      <SelectField
                        label="Hiring Manager"
                        value={form.teamMember}
                        placeholder="Select Team Member"
                        options={['Jenny Wilson', 'Wade Warren', 'Robert Fox']}
                        onChange={(value) => updateForm('teamMember', value)}
                      />
                      <div className={styles.memberPreview}>
                        <span>JW</span>
                        <div>
                          <strong>{form.teamMember || 'Jenny Wilson'}</strong>
                          <small>Responsible for screening and interview flow.</small>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {currentStep === 2 && (
                  <section className={styles.formSection}>
                    <h3>Share Job</h3>
                    <div className={styles.optionGrid}>
                      {['Company Career Page', 'LinkedIn', 'Recruitify Network'].map((channel) => (
                        <OptionCard
                          key={channel}
                          title={channel}
                          description="Publish this job to selected channel."
                          active={form.shareChannel === channel}
                          onClick={() => updateForm('shareChannel', channel)}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </form>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div className={styles.toast}>
          <CheckCircle2 size={20} />
          {toast}
        </div>
      )}
    </main>
  );
}
