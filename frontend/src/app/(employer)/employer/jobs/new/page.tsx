'use client';

import { useEffect, useRef } from 'react';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  X,
} from 'lucide-react';
import type Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styles from './page.module.css';
import {
  FIELD_LIMITS,
  SALARY_MAX,
  SALARY_STEP,
  provinces,
  steps,
} from './constants';
import { formatCurrency, getOptionLabel, richTextToPlainText } from './utils';
import { useJobForm } from './useJobForm';
import type { Option, SelectableField, TextareaField } from './types';

export default function EmployerJobsPage() {
  const job = useJobForm();

  const {
    downloadLinkRef,
    currentStep,
    currentStepKey,
    form,
    isSubmitting,
    loadingOptions,
    options,
    toast,
    minSalary,
    maxSalary,
    districts,
    wards,
    salaryLeft,
    salaryRight,
    addQuestion,
    addSkill,
    cancel,
    fieldError,
    goNext,
    goPrev,
    goToStep,
    markTouched,
    removeQuestion,
    removeSkill,
    saveDraft,
    submitJob,
    updateForm,
    updateSalaryRange,
  } = job;

  const renderError = (field: keyof typeof form) => {
    const message = fieldError(field);
    return message ? <small className={styles.errorText}>{message}</small> : null;
  };

  const inputClass = (field: keyof typeof form) => (fieldError(field) ? styles.controlError : '');

  const editorRefs = useRef<Partial<Record<TextareaField, HTMLDivElement | null>>>({});
  const toolbarRefs = useRef<Partial<Record<TextareaField, HTMLDivElement | null>>>({});
  const quillRefs = useRef<Partial<Record<TextareaField, Quill | null>>>({});

  const editorTextLength = (field: TextareaField) => richTextToPlainText(form[field]).length;

  const getSummaryText = (value: string, fallback: string) =>
    richTextToPlainText(value).trim() || fallback;

  const locationLabel = [
    getOptionLabel(wards, form.wardCode),
    getOptionLabel(districts, form.districtCode),
    getOptionLabel(provinces, form.provinceCode),
  ]
    .filter((label) => label && label !== 'Not selected')
    .join(', ');

  // Initialize each Quill editor whenever the user enters the details step.
  // The editor divs only exist while `currentStepKey === 'details'`, so we
  // re-run on every step change and (re)bind Quill to whichever DOM nodes are
  // currently mounted. Old Quill instances are detached and become garbage
  // when React unmounts their host divs.
  useEffect(() => {
    // Drop references to previously-initialised Quill instances; their host
    // DOM nodes may have been unmounted by React.
    (Object.keys(quillRefs.current) as TextareaField[]).forEach((key) => {
      quillRefs.current[key] = null;
    });

    let cancelled = false;

    const initialiseField = async (field: TextareaField, placeholder: string, limit: number) => {
      if (cancelled) return;
      if (quillRefs.current[field]) return;

      const editor = editorRefs.current[field];
      const toolbar = toolbarRefs.current[field];
      if (!editor || !toolbar) return;

      const { default: QuillEditor } = await import('quill');
      if (cancelled || quillRefs.current[field]) return;
      if (!editorRefs.current[field] || !toolbarRefs.current[field]) return;

      const quill = new QuillEditor(editor, {
        placeholder,
        theme: 'snow',
        modules: { toolbar },
      });

      const initialValue = form[field];
      if (initialValue) quill.clipboard.dangerouslyPasteHTML(initialValue);

      quill.on('text-change', () => {
        if (quill.getLength() > limit + 1) {
          quill.deleteText(limit, quill.getLength() - limit);
        }

        const editorEl = editorRefs.current[field];
        const html = editorEl?.querySelector('.ql-editor')?.innerHTML ?? '';
        updateForm(field, richTextToPlainText(html) ? html : '');
      });

      quillRefs.current[field] = quill;
    };

    const fields: { field: TextareaField; placeholder: string; limit: number }[] = [
      { field: 'description', placeholder: 'Enter description...', limit: FIELD_LIMITS.description },
      { field: 'responsibilities', placeholder: 'Enter responsibilities...', limit: FIELD_LIMITS.responsibilities },
      { field: 'education', placeholder: 'Enter education requirements...', limit: FIELD_LIMITS.education },
      { field: 'requirement', placeholder: 'Enter requirements...', limit: FIELD_LIMITS.requirement },
      { field: 'benefit', placeholder: 'Enter benefits...', limit: FIELD_LIMITS.benefit },
    ];

    fields.forEach(({ field, placeholder, limit }) => {
      void initialiseField(field, placeholder, limit);
    });

    return () => {
      cancelled = true;
    };
  }, [currentStepKey]);

  const renderTextarea = (
    field: TextareaField,
    label: string,
    placeholder: string,
    limit: number,
  ) => (
    <div className={styles.editorField}>
      <label htmlFor={`job-${field}`}>{label}</label>
      <div
        id={`job-${field}`}
        ref={(node) => {
          editorRefs.current[field] = node;
        }}
        className={`${styles.richEditor} ${inputClass(field)}`}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
            markTouched(field);
          }
        }}
      />
      <div
        ref={(node) => {
          toolbarRefs.current[field] = node;
        }}
        className={styles.editorToolbar}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
            markTouched(field);
          }
        }}
      >
        <div>
          <button
            type="button"
            className={`ql-bold ${styles.formatButton}`}
            title="Bold"
            aria-label={`Bold ${label}`}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className={`ql-italic ${styles.formatButton}`}
            title="Italic"
            aria-label={`Italic ${label}`}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className={`ql-list ${styles.formatButton} ${styles.listFormatButton}`}
            value="bullet"
            title="Bullet list"
            aria-label={`Bullet list ${label}`}
          >
            • List
          </button>
        </div>
        <small>
          {editorTextLength(field)}/{limit}
        </small>
      </div>
      {renderError(field)}
    </div>
  );

  const renderSkills = () => (
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
      <div className={styles.skillChips} aria-label="Selected skills">
        {form.skills.map((skill) => (
          <button key={skill} type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
            <X size={13} />
            {skill}
          </button>
        ))}
      </div>
    </section>
  );

  const renderSelect = (
    field: SelectableField,
    label: string,
    placeholder: string,
    selectOptions: Option[],
    icon?: 'location',
  ) => (
    <label className={styles.field}>
      <span>{label}</span>
      <div className={styles.selectWrap}>
        <select
          className={inputClass(field)}
          value={form[field]}
          disabled={
            loadingOptions &&
            ['categoryId', 'employmentTypeId', 'experienceLevelId', 'workApproachId'].includes(field)
          }
          onBlur={() => markTouched(field)}
          onChange={(event) => updateForm(field, event.target.value)}
        >
          <option value="">{loadingOptions ? 'Loading...' : placeholder}</option>
          {selectOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {icon === 'location' ? <MapPin size={18} /> : <ChevronDown size={18} />}
      </div>
      {renderError(field)}
    </label>
  );

  const renderPillGroup = (
    field: 'categoryId' | 'employmentTypeId' | 'experienceLevelId' | 'workApproachId',
    label: string,
    selectOptions: Option[],
  ) => (
    <div className={styles.field}>
      <span>{label}</span>
      <div className={styles.pillRow}>
        {selectOptions.map((option) => {
          const active = form[field] === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={`${styles.choicePill} ${active ? styles.choicePillActive : ''}`}
              onClick={() => {
                updateForm(field, option.id);
                markTouched(field);
              }}
            >
              {active ? <Check size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
              {option.label}
            </button>
          );
        })}
      </div>
      {renderError(field)}
    </div>
  );

  return (
    <main className={styles.jobsPage}>
      <section className={styles.shell} aria-label="Create new job">
        <header className={styles.pageTop}>
          <div className={styles.pageTitleGroup}>
            <h1>Create new job</h1>
          </div>
          <nav className={styles.stepper} aria-label="Job creation steps">
            {steps.map((step, index) => {
              const active = index === currentStep;
              const done = index < currentStep;
              return (
                <button
                  className={`${styles.step} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}
                  key={step.key}
                  type="button"
                  onClick={() => goToStep(index)}
                >
                  <span>{step.label}</span>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </nav>
          <button className={styles.cancelButton} type="button" onClick={cancel}>
            Cancel
          </button>
        </header>

        <div className={styles.divider} />

        <div className={styles.contentGrid}>
          <aside className={styles.sidePanel} />

          <form className={styles.formPanel} onSubmit={(event) => event.preventDefault()}>
            {currentStepKey === 'basic' && (
              <>
                <div className={styles.formHeading}>
                  <h2>Add Basic Information</h2>
                  <p>Let&apos;s complete the basic job information</p>
                </div>

                <label className={styles.field}>
                  <span>Job Title</span>
                  <input
                    className={inputClass('title')}
                    value={form.title}
                    maxLength={FIELD_LIMITS.title}
                    placeholder="Title / e.g. Backend Developer"
                    onBlur={() => markTouched('title')}
                    onChange={(event) => updateForm('title', event.target.value)}
                  />
                  {renderError('title')}
                </label>

                {renderSelect('categoryId', 'Job Category', 'Select a category...', options.categories)}

                <section className={styles.locationGroup}>
                  <h4>Location</h4>
                  {renderSelect('provinceCode', 'Province', 'Province/City', provinces, 'location')}
                  {renderSelect('districtCode', 'District', 'District', districts)}
                  {renderSelect('wardCode', 'Ward', 'Find ward...', wards)}
                </section>

                {renderPillGroup('employmentTypeId', 'Employment Type', options.employmentTypes)}

                {renderPillGroup('experienceLevelId', 'Experience Level', options.experienceLevels)}
                {renderPillGroup('workApproachId', 'Work Approach', options.workApproaches)}

                <section className={styles.salarySection}>
                  <div>Compensation Range (USD)</div>
                  <div className={styles.rangeWrap}>
                    <div className={styles.rangeTrack}>
                      <span style={{ left: `${salaryLeft}%`, right: `${salaryRight}%` }} />
                    </div>
                    <input
                      aria-label="Minimum salary"
                      className={styles.rangeInput}
                      type="range"
                      min={0}
                      max={SALARY_MAX}
                      step={SALARY_STEP}
                      value={minSalary}
                      onChange={(event) => updateSalaryRange('minSalary', event.target.value)}
                    />
                    <input
                      aria-label="Maximum salary"
                      className={styles.rangeInput}
                      type="range"
                      min={0}
                      max={SALARY_MAX}
                      step={SALARY_STEP}
                      value={maxSalary}
                      onChange={(event) => updateSalaryRange('maxSalary', event.target.value)}
                    />
                  </div>
                  <div className={styles.rangeLabels}>
                    <span style={{ left: `${salaryLeft}%` }}>{formatCurrency(minSalary)}</span>
                    <span style={{ left: `${100 - salaryRight}%` }}>{formatCurrency(maxSalary)}</span>
                  </div>
                </section>
              </>
            )}

            {currentStepKey === 'details' && (
              <>
                <div className={styles.detailsHeading}>
                  <button className={styles.previousButton} type="button" onClick={goPrev}>
                    <ChevronLeft size={18} />
                    Previous
                  </button>
                  <div className={styles.formHeading}>
                    <h2>Job Description &amp; Responsibilities</h2>
                    <p>Fill in candidate-facing information for this job</p>
                  </div>
                </div>

                {renderTextarea('description', 'Job Description', 'Enter description...', FIELD_LIMITS.description)}
                {renderTextarea('responsibilities', 'Responsibilities', 'Enter responsibilities...', FIELD_LIMITS.responsibilities)}
                {renderTextarea('education', 'Education', 'Enter education requirements...', FIELD_LIMITS.education)}

                <section className={styles.detailsExtras}>
                  {renderTextarea('requirement', 'Candidate Requirements', 'Enter requirements...', FIELD_LIMITS.requirement)}
                  {renderTextarea('benefit', 'Benefits', 'Enter benefits...', FIELD_LIMITS.benefit)}
                </section>
                {renderSkills()}
              </>
            )}

            {currentStepKey === 'settings' && (
              <>
                <div className={styles.formHeading}>
                  <h2>Job Setting</h2>
                  <p>Define how this job is promoted and categorized across the platform.</p>
                </div>

                <section className={styles.settingCard}>
                  <div>
                    <h3>Visibility &amp; Promotion</h3>
                    <p>Boost visibility and control whether this job appears in public listings.</p>
                  </div>
                  <div className={styles.settingsList}>
                    <button
                      className={`${styles.toggleRow} ${form.isHidden ? styles.toggleRowActive : ''}`}
                      type="button"
                      onClick={() => updateForm('isHidden', !form.isHidden)}
                    >
                      <span>
                        <strong>Hide this job</strong>
                        <small>Keep this job hidden from public listings.</small>
                      </span>
                      <i aria-hidden="true">
                        <b />
                      </i>
                    </button>
                  </div>
                </section>
              </>
            )}

            {currentStepKey === 'summary' && (
              <>
                <div className={`${styles.formHeading} ${styles.summaryHeading}`}>
                  <span className={styles.summaryEyebrow}>Final review</span>
                  <h2>Review your job listing</h2>
                  <p>Make sure everything looks right before you publish.</p>
                </div>

                <section className={styles.jobPreview} aria-label="Job listing preview">
                  <div className={styles.previewHero}>
                    <div>
                      <div className={styles.previewTitleRow}>
                        <h3>{form.title || 'Untitled job'}</h3>
                        <span className={styles.readyBadge}>
                          <Check size={13} strokeWidth={3} /> Ready
                        </span>
                      </div>
                      <p className={styles.previewLocation}>
                        <MapPin size={16} />
                        {locationLabel || 'Location not selected'} ({getOptionLabel(options.workApproaches, form.workApproachId)})
                      </p>
                    </div>
                    <button className={styles.editButton} type="button" onClick={() => goToStep(0)}>
                      <Pencil size={14} /> Edit Post
                    </button>
                  </div>

                  <div className={styles.previewSummary}>
                    <div className={styles.previewSummaryItem}>
                      <span>Category</span>
                      <strong>{getOptionLabel(options.categories, form.categoryId)}</strong>
                    </div>
                    <div className={styles.previewSummaryItem}>
                      <span>Availability</span>
                      <strong>{getOptionLabel(options.employmentTypes, form.employmentTypeId)}</strong>
                    </div>
                    <div className={styles.previewSummaryItem}>
                      <span>Work Approach</span>
                      <strong>{getOptionLabel(options.workApproaches, form.workApproachId)}</strong>
                    </div>
                    <div className={styles.previewSummaryItem}>
                      <span>Visibility</span>
                      <strong>{form.isHidden ? 'Private' : 'Public'}</strong>
                    </div>
                    <div className={styles.previewSummaryItem}>
                      <span>Experience</span>
                      <strong>{getOptionLabel(options.experienceLevels, form.experienceLevelId)}</strong>
                    </div>
                    <div className={styles.previewSummaryItem}>
                      <span>Salary</span>
                      <strong>{formatCurrency(minSalary)} – {formatCurrency(maxSalary)}</strong>
                    </div>
                  </div>

                  <div className={styles.previewTabs}>
                    <span>Job Description</span>
                    <button className={styles.editButton} type="button" onClick={() => goToStep(1)}>
                      <Pencil size={14} /> Edit details
                    </button>
                  </div>

                  <section className={styles.previewSection}>
                    <h4>About</h4>
                    <p>{getSummaryText(form.description, 'No description added.')}</p>
                  </section>

                  <section className={styles.previewSection}>
                    <h4>Key Responsibilities</h4>
                    <p>{getSummaryText(form.responsibilities, 'No responsibilities added.')}</p>
                  </section>

                  <section className={styles.previewSection}>
                    <h4>Skills</h4>
                    <div className={styles.previewSkills}>
                      {form.skills.length > 0
                        ? form.skills.map((skill) => <span key={skill}>{skill}</span>)
                        : <em>No skills added</em>}
                    </div>
                  </section>

                  <section className={styles.previewSection}>
                    <h4>Education</h4>
                    <p>{getSummaryText(form.education, 'No education requirements added.')}</p>
                  </section>

                  <section className={styles.previewSection}>
                    <h4>Preferred Qualifications</h4>
                    <p>{getSummaryText(form.requirement, 'No requirements added.')}</p>
                  </section>

                  <section className={styles.previewSection}>
                    <h4>Benefits</h4>
                    <p>{getSummaryText(form.benefit, 'No benefits added.')}</p>
                  </section>

                  <div className={styles.previewFooter}>
                    <span>
                      This listing will be <strong>{form.isHidden ? 'private' : 'public'}</strong> after publishing.
                    </span>
                    <button className={styles.editButton} type="button" onClick={() => goToStep(2)}>
                      <Pencil size={14} /> Edit settings
                    </button>
                  </div>
                </section>
              </>
            )}

            <div className={styles.formActions}>
              {currentStep < steps.length - 1 ? (
                <button className={styles.nextButton} type="button" onClick={goNext}>
                  Next                
                </button>
              ) : (
                <button className={styles.nextButton} type="button" disabled={isSubmitting} onClick={submitJob}>
                  {isSubmitting && <Loader2 className={styles.spinner} size={17} />}
                  Post job listing
                </button>
              )}
              <button className={styles.draftButton} type="button" onClick={saveDraft}>             
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
        <div className={`${styles.toast} ${styles[`toast${toast.type}`]}`}>
          <CheckCircle2 size={20} />
          {toast.message}
        </div>
      )}
    </main>
  );
}
