'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, FormEvent, useMemo, useState } from 'react';
import type { JobPostPayload } from '../types';
import styles from './createJob.module.css';

type FormState = {
  title: string;
  description: string;
  requirement: string;
  responsibilities: string;
  benefit: string;
  minSalary: string;
  maxSalary: string;
  categoryId: string;
  employmentTypeId: string;
  experienceLevelId: string;
  workApproachId: string;
  wardCode: string;
  isHidden: boolean;
  isFeatured: boolean;
};

type FieldName = keyof FormState;
type FormErrors = Partial<Record<FieldName, string>>;

const initialForm: FormState = {
  title: '',
  description: '',
  requirement: '',
  responsibilities: '',
  benefit: '',
  minSalary: '',
  maxSalary: '',
  categoryId: '',
  employmentTypeId: '',
  experienceLevelId: '',
  workApproachId: '',
  wardCode: '',
  isHidden: false,
  isFeatured: false,
};

const categories = [
  { value: '1', label: 'Administrative' },
  { value: '2', label: 'Product' },
  { value: '3', label: 'Marketing' },
  { value: '4', label: 'Engineering' },
];

const employmentTypes = [
  { value: '1', label: 'Full-time' },
  { value: '2', label: 'Part-time' },
  { value: '3', label: 'Contractor' },
];

const experienceLevels = [
  { value: '1', label: 'Entry level' },
  { value: '2', label: 'Mid level' },
  { value: '3', label: 'Senior level' },
];

const workApproaches = [
  { value: '1', label: 'Onsite' },
  { value: '2', label: 'Hybrid' },
  { value: '3', label: 'Remote' },
];

const wards = [
  { value: 'CA-ON', label: 'Canada - Ontario' },
  { value: 'US-NY', label: 'USA - New York' },
  { value: 'IN-DL', label: 'India - Delhi' },
  { value: 'UK-LDN', label: 'UK - London' },
];

const textLimits: Partial<Record<FieldName, number>> = {
  title: 100,
  description: 5000,
  requirement: 5000,
  responsibilities: 5000,
  benefit: 2000,
};

export default function CreateJobPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const isDirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(initialForm), [form]);

  const validateField = (name: FieldName, nextForm = form): string => {
    const value = nextForm[name];

    if (name === 'title') {
      const title = String(value).trim();
      if (!title) return 'Vui long nhap tieu de';
      if (title.length < 5) return 'Tieu de toi thieu 5 ky tu';
      if (title.length > 100) return 'Tieu de toi da 100 ky tu';
    }

    if (name === 'description') {
      const description = String(value).trim();
      if (!description) return 'Vui long nhap mo ta cong viec';
      if (description.length > 5000) return 'Mo ta toi da 5000 ky tu';
    }

    if (name === 'requirement' && String(value).length > 5000) return 'Yeu cau toi da 5000 ky tu';
    if (name === 'responsibilities' && String(value).length > 5000) return 'Trach nhiem toi da 5000 ky tu';
    if (name === 'benefit' && String(value).length > 2000) return 'Quyen loi toi da 2000 ky tu';

    if (name === 'minSalary') {
      if (!nextForm.minSalary) return 'Vui long nhap luong toi thieu';
      const minSalary = Number(nextForm.minSalary);
      const maxSalary = Number(nextForm.maxSalary);
      if (Number.isNaN(minSalary) || minSalary < 0) return 'Luong toi thieu khong duoc am';
      if (nextForm.maxSalary && minSalary >= maxSalary) return 'Luong toi thieu phai nho hon luong toi da';
    }

    if (name === 'maxSalary') {
      if (!nextForm.maxSalary) return 'Vui long nhap luong toi da';
      const minSalary = Number(nextForm.minSalary);
      const maxSalary = Number(nextForm.maxSalary);
      if (Number.isNaN(maxSalary) || maxSalary < 0) return 'Luong toi da khong duoc am';
      if (nextForm.minSalary && maxSalary <= minSalary) return 'Luong toi da phai lon hon luong toi thieu';
    }

    if (name === 'categoryId' && !nextForm.categoryId) return 'Vui long chon danh muc';
    if (name === 'employmentTypeId' && !nextForm.employmentTypeId) return 'Vui long chon loai hinh lam viec';
    if (name === 'experienceLevelId' && !nextForm.experienceLevelId) return 'Vui long chon cap do kinh nghiem';
    if (name === 'workApproachId' && !nextForm.workApproachId) return 'Vui long chon hinh thuc lam viec';
    if (name === 'wardCode' && !nextForm.wardCode) return 'Vui long chon dia diem lam viec';

    return '';
  };

  const validateForm = (nextForm = form) => {
    const requiredFields: FieldName[] = [
      'title',
      'description',
      'requirement',
      'responsibilities',
      'benefit',
      'minSalary',
      'maxSalary',
      'categoryId',
      'employmentTypeId',
      'experienceLevelId',
      'workApproachId',
      'wardCode',
    ];
    const nextErrors = requiredFields.reduce<FormErrors>((acc, field) => {
      const message = validateField(field, nextForm);
      if (message) acc[field] = message;
      return acc;
    }, {});

    setErrors(nextErrors);
    return nextErrors;
  };

  const updateField = (name: FieldName, value: string | boolean) => {
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);
    setSubmitMessage(null);

    const message = validateField(name, nextForm);
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      if (message) {
        nextErrors[name] = message;
      } else {
        delete nextErrors[name];
      }
      return nextErrors;
    });

    if (name === 'minSalary' || name === 'maxSalary') {
      const otherField = name === 'minSalary' ? 'maxSalary' : 'minSalary';
      const otherMessage = validateField(otherField, nextForm);
      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors };
        if (otherMessage) {
          nextErrors[otherField] = otherMessage;
        } else {
          delete nextErrors[otherField];
        }
        return nextErrors;
      });
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateField(event.target.name as FieldName, event.target.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name as FieldName;
    const message = validateField(name);
    setErrors((currentErrors) => ({ ...currentErrors, ...(message ? { [name]: message } : {}) }));
  };

  const buildPayload = (): JobPostPayload => ({
    title: form.title.trim(),
    description: form.description.trim(),
    requirement: form.requirement.trim() || null,
    responsibilities: form.responsibilities.trim() || null,
    benefit: form.benefit.trim() || null,
    minSalary: Number(form.minSalary),
    maxSalary: Number(form.maxSalary),
    isHidden: form.isHidden,
    isFeatured: form.isFeatured,
    categoryId: Number(form.categoryId),
    companyId: 1,
    employmentTypeId: Number(form.employmentTypeId),
    experienceLevelId: Number(form.experienceLevelId),
    workApproachId: Number(form.workApproachId),
    wardCode: form.wardCode,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setSubmitMessage('Vui long kiem tra lai cac truong bat buoc.');
      return;
    }

    setIsSubmitting(true);
    const payload = buildPayload();

    window.setTimeout(() => {
      console.info('Mock POST /api/v1/jobs', payload);
      setSubmitMessage('Dang tin thanh cong!');
      setIsSubmitting(false);
      router.push('/employer/jobs');
    }, 700);
  };

  const handleCancel = () => {
    router.push('/employer/jobs');
  };

  return (
    <section className={styles.createPage} aria-label="Create job posting">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Post Job</p>
          <h1>Create Job Posting</h1>
          <p>
            Tao tin tuyen dung moi cho Recruitify. Form hien dang validate phia FE va gia lap submit vi chua co backend
            API.
          </p>
        </div>
        <Link href="/employer/jobs" className={styles.backLink}>
          Back to Jobs
        </Link>
      </header>

      <form className={styles.formShell} onSubmit={handleSubmit} noValidate>
        <FormSection title="Job information" note="Required fields are marked with *">
          <div className={styles.grid}>
            <TextField
              name="title"
              label="Tieu de"
              placeholder="Backend Developer"
              value={form.title}
              error={errors.title}
              required
              maxLength={100}
              onBlur={handleBlur}
              onChange={handleTextChange}
            />

            <TextAreaField
              name="description"
              label="Mo ta cong viec"
              placeholder="Nhap mo ta cong viec..."
              value={form.description}
              error={errors.description}
              required
              maxLength={5000}
              className={styles.descriptionArea}
              onBlur={handleBlur}
              onChange={handleTextChange}
            />

            <TextAreaField
              name="requirement"
              label="Yeu cau ung vien"
              placeholder="Nhap yeu cau..."
              value={form.requirement}
              error={errors.requirement}
              maxLength={5000}
              onBlur={handleBlur}
              onChange={handleTextChange}
            />

            <TextAreaField
              name="responsibilities"
              label="Trach nhiem"
              placeholder="Nhap trach nhiem..."
              value={form.responsibilities}
              error={errors.responsibilities}
              maxLength={5000}
              onBlur={handleBlur}
              onChange={handleTextChange}
            />

            <TextAreaField
              name="benefit"
              label="Quyen loi"
              placeholder="Nhap quyen loi..."
              value={form.benefit}
              error={errors.benefit}
              maxLength={2000}
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
          </div>
        </FormSection>

        <FormSection title="Salary and classification">
          <div className={styles.grid}>
            <TextField
              name="minSalary"
              label="Luong toi thieu"
              placeholder="1000"
              value={form.minSalary}
              error={errors.minSalary}
              required
              type="number"
              min="0"
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
            <TextField
              name="maxSalary"
              label="Luong toi da"
              placeholder="5000"
              value={form.maxSalary}
              error={errors.maxSalary}
              required
              type="number"
              min="0"
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
            <SelectField
              name="categoryId"
              label="Danh muc"
              placeholder="Chon danh muc"
              value={form.categoryId}
              error={errors.categoryId}
              options={categories}
              required
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
            <SelectField
              name="employmentTypeId"
              label="Loai hinh"
              placeholder="Chon loai hinh"
              value={form.employmentTypeId}
              error={errors.employmentTypeId}
              options={employmentTypes}
              required
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
            <SelectField
              name="experienceLevelId"
              label="Cap do kinh nghiem"
              placeholder="Chon cap do"
              value={form.experienceLevelId}
              error={errors.experienceLevelId}
              options={experienceLevels}
              required
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
            <SelectField
              name="workApproachId"
              label="Hinh thuc lam viec"
              placeholder="Chon hinh thuc"
              value={form.workApproachId}
              error={errors.workApproachId}
              options={workApproaches}
              required
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
            <SelectField
              name="wardCode"
              label="Dia diem"
              placeholder="Chon phuong/xa"
              value={form.wardCode}
              error={errors.wardCode}
              options={wards}
              required
              onBlur={handleBlur}
              onChange={handleTextChange}
            />
          </div>
        </FormSection>

        <FormSection title="Visibility">
          <div className={styles.toggleGrid}>
            <ToggleField
              name="isHidden"
              title="An job nay"
              description="Mac dinh OFF, bat len neu chua muon hien thi job."
              checked={form.isHidden}
              onChange={updateField}
            />
            <ToggleField
              name="isFeatured"
              title="Hien thi noi bat"
              description="Mac dinh OFF, bat len neu muon danh dau job noi bat."
              checked={form.isFeatured}
              onChange={updateField}
            />
          </div>
        </FormSection>

        {submitMessage && (
          <div className={`${styles.alert} ${Object.keys(errors).length > 0 ? styles.alertError : styles.alertSuccess}`}>
            {submitMessage}
          </div>
        )}

        <footer className={styles.footer}>
          <button type="button" className={styles.button} onClick={handleCancel}>
            Huy
          </button>
          <button type="submit" className={`${styles.button} ${styles.primaryButton}`} disabled={isSubmitting}>
            {isSubmitting ? 'Dang xu ly...' : isDirty ? 'Dang tin tuyen dung' : 'Dang tin tuyen dung'}
          </button>
        </footer>
      </form>
    </section>
  );
}

function FormSection({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2>{title}</h2>
        {note && <span>{note}</span>}
      </div>
      {children}
    </section>
  );
}

function TextField({
  name,
  label,
  value,
  error,
  required,
  maxLength,
  onChange,
  onBlur,
  ...inputProps
}: {
  name: FieldName;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'onBlur'>) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        {...inputProps}
        id={name}
        name={name}
        value={value}
        maxLength={maxLength}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        onBlur={onBlur}
        onChange={onChange}
      />
      <FieldHint value={value} maxLength={maxLength} error={error} />
    </div>
  );
}

function TextAreaField({
  name,
  label,
  value,
  error,
  required,
  maxLength,
  className,
  onChange,
  onBlur,
  ...textareaProps
}: {
  name: FieldName;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value' | 'onChange' | 'onBlur'>) {
  return (
    <div className={`${styles.field} ${styles.fieldFull}`}>
      <label htmlFor={name}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <textarea
        {...textareaProps}
        id={name}
        name={name}
        value={value}
        maxLength={maxLength}
        className={`${styles.textarea} ${className ?? ''} ${error ? styles.inputError : ''}`}
        onBlur={onBlur}
        onChange={onChange}
      />
      <FieldHint value={value} maxLength={maxLength} error={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  value,
  error,
  required,
  placeholder,
  options,
  onChange,
  onBlur,
}: {
  name: FieldName;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (event: FocusEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        className={`${styles.select} ${error ? styles.inputError : ''}`}
        onBlur={onBlur}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldHint value="" error={error} />
    </div>
  );
}

function ToggleField({
  name,
  title,
  description,
  checked,
  onChange,
}: {
  name: 'isHidden' | 'isFeatured';
  title: string;
  description: string;
  checked: boolean;
  onChange: (name: FieldName, value: boolean) => void;
}) {
  return (
    <div className={styles.toggleCard}>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={(event) => onChange(name, event.target.checked)} />
        <span className={styles.slider} />
      </label>
    </div>
  );
}

function FieldHint({ value, maxLength, error }: { value: string; maxLength?: number; error?: string }) {
  return (
    <div className={styles.hintRow}>
      <span className={error ? styles.errorText : ''}>{error ?? ' '}</span>
      {maxLength && <span>{`${value.length}/${maxLength}`}</span>}
    </div>
  );
}
