'use client';

import { useRef } from 'react';
import { Check, CheckCircle2, ChevronDown, ChevronLeft, Download, Loader2, MapPin, Plus, Send, X } from 'lucide-react';
import styles from './page.module.css';
import {
  FIELD_LIMITS,
  SALARY_MAX,
  SALARY_STEP,
  provinces,
  steps,
} from './constants';
import { formatCurrency, getOptionLabel } from './utils';
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
    requestBody,
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

  const textareaRefs = useRef<Partial<Record<TextareaField, HTMLTextAreaElement | null>>>({});

  const applyMarkdown = (field: TextareaField, kind: 'bold' | 'italic' | 'list', limit: number) => {
    const el = textareaRefs.current[field];
    const value = form[field];
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const selected = value.slice(start, end);

    let insert: string;
    let cursorPos: number;

    if (kind === 'list') {
      const prefix = start > 0 && value[start - 1] !== '\n' ? '\n- ' : '- ';
      insert = `${prefix}${selected}`;
      cursorPos = start + insert.length;
    } else {
      const marker = kind === 'bold' ? '**' : '_';
      insert = `${marker}${selected}${marker}`;
      cursorPos = start + marker.length + selected.length;
    }

    const next = `${value.slice(0, start)}${insert}${value.slice(end)}`.slice(0, limit);
    updateForm(field, next);

    requestAnimationFrame(() => {
      const node = textareaRefs.current[field];
      if (!node) return;
      node.focus();
      const safeCursor = Math.min(cursorPos, next.length);
      node.setSelectionRange(safeCursor, safeCursor);
    });
  };

  const renderTextarea = (
    field: TextareaField,
    label: string,
    placeholder: string,
    limit: number,
  ) => (
    <label className={styles.editorField}>
      <span>{label}</span>
      <textarea
        ref={(node) => {
          textareaRefs.current[field] = node;
        }}
        className={inputClass(field)}
        value={form[field]}
        maxLength={limit}
        placeholder={placeholder}
        onBlur={() => markTouched(field)}
        onChange={(event) => updateForm(field, event.target.value)}
      />
      <div className={styles.editorToolbar}>
        <div>
          <button type="button" onClick={() => applyMarkdown(field, 'bold', limit)}>
            B
          </button>
          <button type="button" onClick={() => applyMarkdown(field, 'italic', limit)}>
            I
          </button>
          <button type="button" onClick={() => applyMarkdown(field, 'list', limit)}>
            List
          </button>
        </div>
        <small>
          {form[field].length}/{limit}
        </small>
      </div>
      {renderError(field)}
    </label>
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
          <aside className={styles.sidePanel}>
            {currentStep > 0 && (
              <button className={styles.previousButton} type="button" onClick={goPrev}>
                <ChevronLeft size={18} />
                Previous
              </button>
            )}
          </aside>

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
                <div className={styles.formHeading}>
                  <h2>Job Description &amp; Responsibilities</h2>
                  <p>Fill in candidate-facing information for this job</p>
                </div>

                {renderTextarea('description', 'Job Description', 'Enter description...', FIELD_LIMITS.description)}
                {renderTextarea('responsibilities', 'Responsibilities', 'Enter responsibilities...', FIELD_LIMITS.responsibilities)}

                <section className={styles.detailsExtras}>
                  {renderTextarea('requirement', 'Candidate Requirements', 'Enter requirements...', FIELD_LIMITS.requirement)}
                  {renderTextarea('benefit', 'Benefits', 'Enter benefits...', FIELD_LIMITS.benefit)}
                </section>
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
                      className={`${styles.toggleRow} ${form.isFeatured ? styles.toggleRowActive : ''}`}
                      type="button"
                      onClick={() => updateForm('isFeatured', !form.isFeatured)}
                    >
                      <span>
                        <strong>Featured listing</strong>
                        <small>Boost visibility and attract more candidates.</small>
                      </span>
                      <i aria-hidden="true">
                        <b />
                      </i>
                    </button>
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

                <section className={styles.categoriesBlock}>
                  <h3>Categories</h3>
                  {renderSelect('categoryId', 'Job Category', 'Select a category', options.categories)}
                  <label className={styles.field}>
                    <span>Hiring Company/Department</span>
                    <input value="From auth context" disabled readOnly />
                  </label>
                </section>

                <section className={styles.skillBlock}>
                  <label className={styles.field}>
                    <span>Add Skills</span>
                    <input
                      value={form.skillDraft}
                      placeholder="Type skill and press Enter"
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
                      value={form.questionDraft}
                      placeholder="Add a screening question"
                      onChange={(event) => updateForm('questionDraft', event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          addQuestion();
                        }
                      }}
                    />
                    <button type="button" disabled={form.screeningQuestions.length >= 5} onClick={addQuestion}>
                      <Plus size={16} />
                      Add questions
                    </button>
                  </div>
                  {form.screeningQuestions.length > 0 && (
                    <ol className={styles.questionList}>
                      {form.screeningQuestions.map((question) => (
                        <li key={question}>
                          <span>{question}</span>
                          <button type="button" onClick={() => removeQuestion(question)} aria-label={`Remove ${question}`}>
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              </>
            )}

            {currentStepKey === 'summary' && (
              <>
                <div className={styles.formHeading}>
                  <h2>Summary</h2>
                  <p>Review the request body before posting this job.</p>
                </div>

                <section className={styles.summaryCard}>
                  <div>
                    <h3>{form.title || 'Untitled job'}</h3>
                    <p>
                      {getOptionLabel(options.categories, form.categoryId)} •{' '}
                      {getOptionLabel(options.employmentTypes, form.employmentTypeId)} •{' '}
                      {getOptionLabel(options.workApproaches, form.workApproachId)}
                    </p>
                  </div>
                </section>

                <div className={styles.summaryGrid}>
                  <section>
                    <h4>Required Fields</h4>
                    <dl>
                      <dt>Category</dt>
                      <dd>{getOptionLabel(options.categories, form.categoryId)}</dd>
                      <dt>Experience</dt>
                      <dd>{getOptionLabel(options.experienceLevels, form.experienceLevelId)}</dd>
                      <dt>Ward Code</dt>
                      <dd>{form.wardCode || 'Not selected'}</dd>
                    </dl>
                  </section>
                  <section>
                    <h4>Settings</h4>
                    <dl>
                      <dt>Hidden</dt>
                      <dd>{form.isHidden ? 'Yes' : 'No'}</dd>
                      <dt>Featured</dt>
                      <dd>{form.isFeatured ? 'Yes' : 'No'}</dd>
                      <dt>Company ID</dt>
                      <dd>From auth context</dd>
                    </dl>
                  </section>
                </div>

                <section className={styles.payloadBox}>
                  <h4>POST /api/v1/jobs</h4>
                  <pre>{JSON.stringify(requestBody, null, 2)}</pre>
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
