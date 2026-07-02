'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Download,
  Eye,
  FileText,
  MapPin,
  Plus,
  Send,
  Settings,
  Trash2,
  X,
} from 'lucide-react';
import styles from './page.module.css';

type StepKey = 'basic' | 'details' | 'settings' | 'summary';

type JobForm = {
  referenceNumber: string;
  title: string;
  category: string;
  location: string;
  employmentType: string;
  workApproach: string;
  experienceLevel: string;
  compensationType: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  responsibilities: string;
  skillDraft: string;
  skills: string[];
  questions: string[];
  visibility: string;
  applicationDeadline: string;
  hiringTeam: string;
  applicationMethod: string;
  autoScreening: boolean;
  emailNotifications: boolean;
  publishImmediately: boolean;
};

const steps: { key: StepKey; label: string }[] = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'details', label: 'Add Details' },
  { key: 'settings', label: 'Settings' },
  { key: 'summary', label: 'Summary' },
];

const initialForm: JobForm = {
  referenceNumber: '',
  title: 'Product Designer',
  category: '',
  location: '',
  employmentType: 'Full-time',
  workApproach: 'Remote',
  experienceLevel: '4-5 years',
  compensationType: '',
  salaryMin: 30000,
  salaryMax: 50000,
  description: '',
  responsibilities: '',
  skillDraft: 'Product Designer',
  skills: ['Product Design', 'UI/UX Design', 'Prototyping', 'Interaction Design', 'Wireframe', 'PRD', 'Design System'],
  questions: [],
  visibility: 'Public',
  applicationDeadline: '',
  hiringTeam: 'Design Hiring Team',
  applicationMethod: 'Recruitify Apply',
  autoScreening: true,
  emailNotifications: true,
  publishImmediately: false,
};

const jobCategories = ['Design', 'Engineering', 'Marketing', 'Operations', 'Human Resources'];
const locations = ['Ho Chi Minh City', 'Ha Noi', 'Da Nang', 'Remote', 'Hybrid - Viet Nam'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract'];
const workApproaches = ['Onsite', 'Hybrid', 'Remote'];
const experienceLevels = ['Not required', '1 year', '2-3 years', '4-5 years', '5-7 years', '8+ years'];
const compensationTypes = ['Monthly salary', 'Annual salary', 'Hourly rate', 'Project based'];
const visibilityOptions = ['Public', 'Private', 'Internal only'];
const applicationMethods = ['Recruitify Apply', 'External Link', 'Email'];
const hiringTeams = ['Design Hiring Team', 'Product Team', 'People Team', 'Engineering Hiring Team'];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  icon,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  icon?: 'location';
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <div className={styles.selectWrap}>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {icon === 'location' ? <MapPin size={18} /> : <ChevronDown size={18} />}
      </div>
    </label>
  );
}

function ChoicePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`${styles.choicePill} ${active ? styles.choicePillActive : ''}`} type="button" onClick={onClick}>
      {active ? <Check size={16} /> : <Plus size={16} />}
      <span>{label}</span>
    </button>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      className={`${styles.toggleRow} ${checked ? styles.toggleRowActive : ''}`}
      type="button"
      onClick={() => onChange(!checked)}
    >
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <i aria-hidden="true">
        <b />
      </i>
    </button>
  );
}

function TextEditor({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const limit = 600;

  const appendMarker = (marker: string) => {
    const nextValue = value ? `${value}${marker}` : marker.trimStart();
    onChange(nextValue.slice(0, limit));
  };

  return (
    <label className={styles.editorField}>
      <span>{label}</span>
      <textarea
        value={value}
        maxLength={limit}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className={styles.editorToolbar}>
        <div>
          <button type="button" onClick={() => appendMarker(' **bold**')}>
            B
          </button>
          <button type="button" onClick={() => appendMarker(' _italic_')}>
            I
          </button>
          <button type="button" onClick={() => appendMarker(' __underline__')}>
            U
          </button>
          <button type="button" onClick={() => appendMarker('\n- ')}>
            List
          </button>
          <button type="button" onClick={() => appendMarker('\n1. ')}>
            1.
          </button>
        </div>
        <small>
          {value.length}/{limit}
        </small>
      </div>
    </label>
  );
}

export default function EmployerJobsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<JobForm>(initialForm);
  const [questionDraft, setQuestionDraft] = useState('');
  const [toast, setToast] = useState('');
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const currentStepKey = steps[currentStep].key;
  const canGoBack = currentStep > 0;
  const canGoNext = currentStep < steps.length - 1;

  const completedFields = useMemo(() => {
    const basic = [
      form.referenceNumber,
      form.title,
      form.category,
      form.location,
      form.employmentType,
      form.workApproach,
      form.experienceLevel,
      form.compensationType,
    ].filter(Boolean).length;

    return {
      basic,
      details: [form.description, form.responsibilities, form.skills.length ? 'skills' : ''].filter(Boolean).length,
      settings: [form.visibility, form.hiringTeam, form.applicationMethod].filter(Boolean).length,
    };
  }, [form]);

  const updateForm = <Key extends keyof JobForm>(key: Key, value: JobForm[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const goNext = () => {
    if (canGoNext) {
      setCurrentStep((step) => step + 1);
      return;
    }

    showToast('Job is ready to publish');
  };

  const addSkill = () => {
    const nextSkill = form.skillDraft.trim();
    if (!nextSkill || form.skills.includes(nextSkill)) return;
    updateForm('skills', [...form.skills, nextSkill]);
    updateForm('skillDraft', '');
  };

  const removeSkill = (skill: string) => {
    updateForm(
      'skills',
      form.skills.filter((item) => item !== skill),
    );
  };

  const addQuestion = () => {
    const nextQuestion = questionDraft.trim();
    if (!nextQuestion || form.questions.length >= 5) return;
    updateForm('questions', [...form.questions, nextQuestion]);
    setQuestionDraft('');
  };

  const removeQuestion = (question: string) => {
    updateForm(
      'questions',
      form.questions.filter((item) => item !== question),
    );
  };

  const updateSalary = (key: 'salaryMin' | 'salaryMax', value: number) => {
    setForm((prev) => {
      const boundedValue = Math.min(150000, Math.max(0, value));
      if (key === 'salaryMin') {
        return { ...prev, salaryMin: Math.min(boundedValue, prev.salaryMax - 1000) };
      }

      return { ...prev, salaryMax: Math.max(boundedValue, prev.salaryMin + 1000) };
    });
  };

  const saveDraft = () => {
    const draft = {
      savedAt: new Date().toISOString(),
      step: steps[currentStep].label,
      job: form,
    };
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const fileName = `${form.title || 'job'}-draft.json`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = fileName;
      downloadLinkRef.current.click();
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 500);
    showToast('Draft downloaded');
  };

  const salaryLeft = (form.salaryMin / 150000) * 100;
  const salaryRight = 100 - (form.salaryMax / 150000) * 100;

  return (
    <main className={styles.jobsPage}>
      <section className={styles.shell} aria-label="Create new job">
        <header className={styles.pageTop}>
          <h1>Create new job</h1>
          <nav className={styles.stepper} aria-label="Job creation steps">
            {steps.map((step, index) => {
              const active = index === currentStep;
              const done = index < currentStep;

              return (
                <button
                  className={`${styles.step} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}
                  key={step.key}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                >
                  <span>{step.label}</span>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </nav>
          <button className={styles.cancelButton} type="button" onClick={() => setForm(initialForm)}>
            Cancel
          </button>
        </header>

        <div className={styles.divider} />

        <div className={styles.contentGrid}>
          <aside className={styles.sidePanel} aria-label="Job creation progress">
            <div className={styles.progressCard}>
              <FileText size={22} />
              <strong>{steps[currentStep].label}</strong>
              <p>
                {currentStepKey === 'basic' && `${completedFields.basic}/8 fields completed`}
                {currentStepKey === 'details' && `${completedFields.details}/3 detail sections completed`}
                {currentStepKey === 'settings' && `${completedFields.settings}/3 settings completed`}
                {currentStepKey === 'summary' && 'Review all information before publishing'}
              </p>
            </div>
            <button className={styles.previousButton} type="button" disabled={!canGoBack} onClick={() => setCurrentStep((step) => step - 1)}>
              <ChevronLeft size={18} />
              Previous
            </button>
          </aside>

          <form className={styles.formPanel}>
            {currentStepKey === 'basic' && (
              <>
                <div className={styles.formHeading}>
                  <h2>Add Basic Information</h2>
                  <p>Let&apos;s complete the basic job information</p>
                </div>

                <TextField
                  label="Reference Number"
                  value={form.referenceNumber}
                  placeholder="Enter job reference number"
                  onChange={(value) => updateForm('referenceNumber', value)}
                />

                <TextField
                  label="Job Title"
                  value={form.title}
                  placeholder="Product Designer"
                  onChange={(value) => updateForm('title', value)}
                />

                <SelectField
                  label="Job Category"
                  value={form.category}
                  placeholder="Choose category"
                  options={jobCategories}
                  onChange={(value) => updateForm('category', value)}
                />

                <SelectField
                  label="Location"
                  value={form.location}
                  placeholder="Choose location"
                  options={locations}
                  icon="location"
                  onChange={(value) => updateForm('location', value)}
                />

                <section className={styles.optionGroup}>
                  <h3>Employment Type</h3>
                  <div className={styles.pillRow}>
                    {employmentTypes.map((type) => (
                      <ChoicePill
                        key={type}
                        label={type}
                        active={form.employmentType === type}
                        onClick={() => updateForm('employmentType', type)}
                      />
                    ))}
                  </div>
                </section>

                <section className={styles.optionGroup}>
                  <h3>Work Approach</h3>
                  <div className={styles.pillRow}>
                    {workApproaches.map((approach) => (
                      <ChoicePill
                        key={approach}
                        label={approach}
                        active={form.workApproach === approach}
                        onClick={() => updateForm('workApproach', approach)}
                      />
                    ))}
                  </div>
                </section>

                <section className={styles.optionGroup}>
                  <h3>Experience Level</h3>
                  <div className={styles.pillRow}>
                    {experienceLevels.map((level) => (
                      <ChoicePill
                        key={level}
                        label={level}
                        active={form.experienceLevel === level}
                        onClick={() => updateForm('experienceLevel', level)}
                      />
                    ))}
                  </div>
                </section>

                <SelectField
                  label="Compensation Type"
                  value={form.compensationType}
                  placeholder="Select"
                  options={compensationTypes}
                  onChange={(value) => updateForm('compensationType', value)}
                />

                <section className={styles.salarySection}>
                  <h3>Compensation Range (USD)</h3>
                  <div className={styles.rangeWrap}>
                    <div className={styles.rangeTrack}>
                      <span style={{ left: `${salaryLeft}%`, right: `${salaryRight}%` }} />
                    </div>
                    <input
                      aria-label="Minimum salary"
                      className={styles.rangeInput}
                      type="range"
                      min="0"
                      max="150000"
                      step="1000"
                      value={form.salaryMin}
                      onChange={(event) => updateSalary('salaryMin', Number(event.target.value))}
                    />
                    <input
                      aria-label="Maximum salary"
                      className={styles.rangeInput}
                      type="range"
                      min="0"
                      max="150000"
                      step="1000"
                      value={form.salaryMax}
                      onChange={(event) => updateSalary('salaryMax', Number(event.target.value))}
                    />
                  </div>
                  <div className={styles.rangeLabels}>
                    <span>{formatCurrency(form.salaryMin)}</span>
                    <span>{formatCurrency(form.salaryMax)}</span>
                  </div>
                </section>
              </>
            )}

            {currentStepKey === 'details' && (
              <>
                <div className={styles.formHeading}>
                  <h2>Job Description &amp; Responsibilities</h2>
                  <p>Let&apos;s fill out the details candidates will read</p>
                </div>

                <TextEditor
                  label="Add job description"
                  value={form.description}
                  placeholder="Describe the job description..."
                  onChange={(value) => updateForm('description', value)}
                />

                <TextEditor
                  label="Responsibilities"
                  value={form.responsibilities}
                  placeholder="Describe the job responsibilities..."
                  onChange={(value) => updateForm('responsibilities', value)}
                />

                <section className={styles.skillBlock}>
                  <label className={styles.field}>
                    <span>Add Skills</span>
                    <input
                      value={form.skillDraft}
                      placeholder="Type a skill and press Enter"
                      onChange={(event) => updateForm('skillDraft', event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                  </label>
                  <div className={styles.skillChips}>
                    {form.skills.map((skill) => (
                      <button key={skill} type="button" onClick={() => removeSkill(skill)}>
                        <X size={13} />
                        {skill}
                      </button>
                    ))}
                  </div>
                </section>

                <section className={styles.questionCard}>
                  <h3>Screening Questions</h3>
                  <p>You can add up to 5 screening questions to the job posting.</p>
                  <div className={styles.questionInput}>
                    <input
                      value={questionDraft}
                      placeholder="Example: What portfolio project best shows your process?"
                      onChange={(event) => setQuestionDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          addQuestion();
                        }
                      }}
                    />
                    <button type="button" disabled={form.questions.length >= 5} onClick={addQuestion}>
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                  {form.questions.length > 0 && (
                    <ol className={styles.questionList}>
                      {form.questions.map((question) => (
                        <li key={question}>
                          <span>{question}</span>
                          <button type="button" onClick={() => removeQuestion(question)} aria-label={`Remove ${question}`}>
                            <Trash2 size={15} />
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              </>
            )}

            {currentStepKey === 'settings' && (
              <>
                <div className={styles.formHeading}>
                  <h2>Job Settings</h2>
                  <p>Control publishing, visibility, and application handling</p>
                </div>

                <div className={styles.gridTwo}>
                  <SelectField
                    label="Job Visibility"
                    value={form.visibility}
                    placeholder="Select visibility"
                    options={visibilityOptions}
                    onChange={(value) => updateForm('visibility', value)}
                  />
                  <SelectField
                    label="Hiring Team"
                    value={form.hiringTeam}
                    placeholder="Select team"
                    options={hiringTeams}
                    onChange={(value) => updateForm('hiringTeam', value)}
                  />
                </div>

                <div className={styles.gridTwo}>
                  <label className={styles.field}>
                    <span>Application Deadline</span>
                    <input
                      type="date"
                      value={form.applicationDeadline}
                      onChange={(event) => updateForm('applicationDeadline', event.target.value)}
                    />
                  </label>
                  <SelectField
                    label="Application Method"
                    value={form.applicationMethod}
                    placeholder="Select method"
                    options={applicationMethods}
                    onChange={(value) => updateForm('applicationMethod', value)}
                  />
                </div>

                <div className={styles.settingsList}>
                  <Toggle
                    label="Auto Screening"
                    description="Use screening questions to organize candidates."
                    checked={form.autoScreening}
                    onChange={(checked) => updateForm('autoScreening', checked)}
                  />
                  <Toggle
                    label="Email Notifications"
                    description="Notify hiring team when new applications arrive."
                    checked={form.emailNotifications}
                    onChange={(checked) => updateForm('emailNotifications', checked)}
                  />
                  <Toggle
                    label="Publish Immediately"
                    description="Publish the job after final confirmation."
                    checked={form.publishImmediately}
                    onChange={(checked) => updateForm('publishImmediately', checked)}
                  />
                </div>
              </>
            )}

            {currentStepKey === 'summary' && (
              <>
                <div className={styles.formHeading}>
                  <h2>Summary</h2>
                  <p>Review your job before publishing or saving a draft</p>
                </div>

                <section className={styles.summaryCard}>
                  <div>
                    <h3>{form.title || 'Untitled job'}</h3>
                    <p>
                      {[form.category, form.location, form.employmentType, form.workApproach].filter(Boolean).join(' • ') ||
                        'Basic details are not complete yet'}
                    </p>
                  </div>
                  <strong>{formatCurrency(form.salaryMin)} - {formatCurrency(form.salaryMax)}</strong>
                </section>

                <div className={styles.summaryGrid}>
                  <section>
                    <h4>Basic Info</h4>
                    <dl>
                      <dt>Reference</dt>
                      <dd>{form.referenceNumber || 'Not added'}</dd>
                      <dt>Experience</dt>
                      <dd>{form.experienceLevel}</dd>
                      <dt>Compensation</dt>
                      <dd>{form.compensationType || 'Not selected'}</dd>
                    </dl>
                  </section>
                  <section>
                    <h4>Settings</h4>
                    <dl>
                      <dt>Visibility</dt>
                      <dd>{form.visibility}</dd>
                      <dt>Hiring Team</dt>
                      <dd>{form.hiringTeam}</dd>
                      <dt>Deadline</dt>
                      <dd>{form.applicationDeadline || 'No deadline'}</dd>
                    </dl>
                  </section>
                </div>

                <section className={styles.reviewBlock}>
                  <h4>Skills</h4>
                  <div className={styles.skillChips}>
                    {form.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </section>

                <section className={styles.reviewBlock}>
                  <h4>Description</h4>
                  <p>{form.description || 'No description added yet.'}</p>
                </section>

                <section className={styles.reviewBlock}>
                  <h4>Screening Questions</h4>
                  {form.questions.length ? (
                    <ol>
                      {form.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>No screening questions added.</p>
                  )}
                </section>
              </>
            )}

            <div className={styles.formActions}>
              <button className={styles.nextButton} type="button" onClick={goNext}>
                {canGoNext ? 'Next' : 'Publish Job'}
                {canGoNext ? <Send size={17} /> : <Eye size={17} />}
              </button>
              <button className={styles.draftButton} type="button" onClick={saveDraft}>
                <Download size={16} />
                Save as Draft
              </button>
              <a ref={downloadLinkRef} className={styles.hiddenDownload}>
                Download draft
              </a>
            </div>
          </form>
        </div>
      </section>

      {toast && (
        <div className={styles.toast}>
          <CheckCircle2 size={20} />
          {toast}
        </div>
      )}
    </main>
  );
}
