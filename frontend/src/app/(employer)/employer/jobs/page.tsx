'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Download,
  Loader2,
  MapPin,
  Plus,
  Send,
  X,
} from 'lucide-react';
import styles from './page.module.css';

type StepKey = 'basic' | 'details' | 'settings' | 'summary';
type Option = { id: string; label: string };
type ToastType = 'success' | 'error' | 'info';

type JobForm = {
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
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  isHidden: boolean;
  isFeatured: boolean;
  skillDraft: string;
  skills: string[];
  questionDraft: string;
  screeningQuestions: string[];
};

type FormErrors = Partial<Record<keyof JobForm, string>>;

const steps: { key: StepKey; label: string }[] = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'details', label: 'Add Details' },
  { key: 'settings', label: 'Settings' },
  { key: 'summary', label: 'Summary' },
];

const emptyForm: JobForm = {
  title: 'Product Designer',
  description: '',
  requirement: '',
  responsibilities: '',
  benefit: '',
  minSalary: '30000',
  maxSalary: '50000',
  categoryId: '',
  employmentTypeId: '',
  experienceLevelId: '',
  workApproachId: '',
  provinceCode: '',
  districtCode: '',
  wardCode: '',
  isHidden: false,
  isFeatured: false,
  skillDraft: 'Product Designer',
  skills: ['Product Design', 'UI/UX Design', 'Prototyping', 'Interaction Design', 'Wireframe', 'PRD', 'Design System', 'Documentation'],
  questionDraft: '',
  screeningQuestions: [],
};

const fallbackOptions = {
  categories: [
    { id: '1', label: 'Design' },
    { id: '2', label: 'Engineering' },
    { id: '3', label: 'Marketing' },
    { id: '4', label: 'Operations' },
  ],
  employmentTypes: [
    { id: '1', label: 'Full-time' },
    { id: '2', label: 'Part-time' },
    { id: '3', label: 'Contract' },
  ],
  experienceLevels: [
    { id: '1', label: 'Not required' },
    { id: '2', label: '1 year' },
    { id: '3', label: '2-3 years' },
    { id: '4', label: '4-5 years' },
    { id: '5', label: '5-7 years' },
    { id: '6', label: '8+ years' },
  ],
  workApproaches: [
    { id: '1', label: 'Onsite' },
    { id: '2', label: 'Remote' },
    { id: '3', label: 'Hybrid' },
  ],
};

const provinces: Option[] = [
  { id: 'HCM', label: 'Ho Chi Minh City' },
  { id: 'HN', label: 'Ha Noi' },
  { id: 'DN', label: 'Da Nang' },
];

const districtsByProvince: Record<string, Option[]> = {
  HCM: [
    { id: 'HCM-Q1', label: 'District 1' },
    { id: 'HCM-Q3', label: 'District 3' },
    { id: 'HCM-TD', label: 'Thu Duc City' },
  ],
  HN: [
    { id: 'HN-CG', label: 'Cau Giay' },
    { id: 'HN-HK', label: 'Hoan Kiem' },
    { id: 'HN-BD', label: 'Ba Dinh' },
  ],
  DN: [
    { id: 'DN-HC', label: 'Hai Chau' },
    { id: 'DN-ST', label: 'Son Tra' },
    { id: 'DN-LC', label: 'Lien Chieu' },
  ],
};

const wardsByDistrict: Record<string, Option[]> = {
  'HCM-Q1': [
    { id: '26734', label: 'Ben Nghe Ward' },
    { id: '26737', label: 'Ben Thanh Ward' },
  ],
  'HCM-Q3': [
    { id: '27154', label: 'Ward 6' },
    { id: '27157', label: 'Ward 7' },
  ],
  'HCM-TD': [
    { id: '26866', label: 'Linh Trung Ward' },
    { id: '26872', label: 'Thao Dien Ward' },
  ],
  'HN-CG': [
    { id: '00160', label: 'Dich Vong Ward' },
    { id: '00166', label: 'Mai Dich Ward' },
  ],
  'HN-HK': [
    { id: '00037', label: 'Hang Bac Ward' },
    { id: '00040', label: 'Hang Dao Ward' },
  ],
  'HN-BD': [
    { id: '00004', label: 'Truc Bach Ward' },
    { id: '00010', label: 'Doi Can Ward' },
  ],
  'DN-HC': [
    { id: '20194', label: 'Thach Thang Ward' },
    { id: '20203', label: 'Hai Chau I Ward' },
  ],
  'DN-ST': [
    { id: '20266', label: 'An Hai Bac Ward' },
    { id: '20275', label: 'Phuoc My Ward' },
  ],
  'DN-LC': [
    { id: '20179', label: 'Hoa Minh Ward' },
    { id: '20182', label: 'Hoa Khanh Bac Ward' },
  ],
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function toOption(item: unknown): Option | null {
  if (!item || typeof item !== 'object') return null;
  const source = item as Record<string, unknown>;
  const id = source.id ?? source.value ?? source.code;
  const label = source.name ?? source.label ?? source.title;

  if (id === undefined || label === undefined) return null;
  return { id: String(id), label: String(label) };
}

function getOptionLabel(options: Option[], id: string) {
  return options.find((option) => option.id === id)?.label || 'Not selected';
}

export default function EmployerJobsPage() {
  const router = useRouter();
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<JobForm>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof JobForm>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);
  const [options, setOptions] = useState(fallbackOptions);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const currentStepKey = steps[currentStep].key;
  const minSalary = Number(form.minSalary || 0);
  const maxSalary = Number(form.maxSalary || 0);
  const districts = districtsByProvince[form.provinceCode] || [];
  const wards = wardsByDistrict[form.districtCode] || [];

  const requestBody = useMemo(
    () => ({
      title: form.title.trim(),
      description: form.description.trim(),
      requirement: form.requirement.trim() || null,
      responsibilities: form.responsibilities.trim() || null,
      benefit: form.benefit.trim() || null,
      minSalary,
      maxSalary,
      isHidden: form.isHidden,
      isFeatured: form.isFeatured,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      employmentTypeId: form.employmentTypeId ? Number(form.employmentTypeId) : null,
      experienceLevelId: form.experienceLevelId ? Number(form.experienceLevelId) : null,
      workApproachId: form.workApproachId ? Number(form.workApproachId) : null,
      wardCode: form.wardCode,
      companyId: 1,
    }),
    [form, minSalary, maxSalary],
  );

  const salaryLeft = Math.min(100, Math.max(0, (minSalary / 150000) * 100));
  const salaryRight = Math.min(100, Math.max(0, 100 - (maxSalary / 150000) * 100));

  useEffect(() => {
    let alive = true;

    async function loadOptions() {
      setLoadingOptions(true);
      try {
        const [categories, employmentTypes, experienceLevels, workApproaches] = await Promise.all([
          fetch('/api/v1/categories').then((res) => (res.ok ? res.json() : Promise.reject())),
          fetch('/api/v1/employment-types').then((res) => (res.ok ? res.json() : Promise.reject())),
          fetch('/api/v1/experience-levels').then((res) => (res.ok ? res.json() : Promise.reject())),
          fetch('/api/v1/work-approaches').then((res) => (res.ok ? res.json() : Promise.reject())),
        ]);

        if (!alive) return;

        const normalize = (data: unknown, fallback: Option[]) => {
          const list = Array.isArray(data) ? data : Array.isArray((data as { data?: unknown[] })?.data) ? (data as { data: unknown[] }).data : [];
          const mapped = list.map(toOption).filter(Boolean) as Option[];
          return mapped.length ? mapped : fallback;
        };

        setOptions({
          categories: normalize(categories, fallbackOptions.categories),
          employmentTypes: normalize(employmentTypes, fallbackOptions.employmentTypes),
          experienceLevels: normalize(experienceLevels, fallbackOptions.experienceLevels),
          workApproaches: normalize(workApproaches, fallbackOptions.workApproaches),
        });
      } catch {
        if (alive) setOptions(fallbackOptions);
      } finally {
        if (alive) setLoadingOptions(false);
      }
    }

    loadOptions();
    return () => {
      alive = false;
    };
  }, []);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 2600);
  };

  const validate = (values: JobForm = form) => {
    const nextErrors: FormErrors = {};
    const title = values.title.trim();
    const description = values.description.trim();
    const nextMinSalary = Number(values.minSalary);
    const nextMaxSalary = Number(values.maxSalary);

    if (!title) nextErrors.title = 'Vui lòng nhập tiêu đề';
    else if (title.length < 5) nextErrors.title = 'Tiêu đề tối thiểu 5 ký tự';
    else if (title.length > 100) nextErrors.title = 'Tiêu đề tối đa 100 ký tự';

    if (!description) nextErrors.description = 'Vui lòng nhập mô tả công việc';
    else if (description.length > 5000) nextErrors.description = 'Mô tả tối đa 5000 ký tự';

    if (values.requirement.length > 5000) nextErrors.requirement = 'Yêu cầu tối đa 5000 ký tự';
    if (values.responsibilities.length > 5000) nextErrors.responsibilities = 'Trách nhiệm tối đa 5000 ký tự';
    if (values.benefit.length > 2000) nextErrors.benefit = 'Quyền lợi tối đa 2000 ký tự';

    if (values.minSalary === '') nextErrors.minSalary = 'Vui lòng nhập lương tối thiểu';
    else if (Number.isNaN(nextMinSalary) || nextMinSalary < 0) nextErrors.minSalary = 'Lương tối thiểu không được âm';

    if (values.maxSalary === '') nextErrors.maxSalary = 'Vui lòng nhập lương tối đa';
    else if (Number.isNaN(nextMaxSalary) || nextMaxSalary < 0) nextErrors.maxSalary = 'Lương tối đa không được âm';

    if (!nextErrors.minSalary && !nextErrors.maxSalary && nextMinSalary >= nextMaxSalary) {
      nextErrors.minSalary = 'Lương tối thiểu phải nhỏ hơn lương tối đa';
      nextErrors.maxSalary = 'Lương tối đa phải lớn hơn lương tối thiểu';
    }

    if (!values.categoryId) nextErrors.categoryId = 'Vui lòng chọn danh mục';
    if (!values.employmentTypeId) nextErrors.employmentTypeId = 'Vui lòng chọn loại hình làm việc';
    if (!values.experienceLevelId) nextErrors.experienceLevelId = 'Vui lòng chọn cấp độ kinh nghiệm';
    if (!values.workApproachId) nextErrors.workApproachId = 'Vui lòng chọn hình thức làm việc';
    if (!values.wardCode) nextErrors.wardCode = 'Vui lòng chọn địa điểm làm việc';

    return nextErrors;
  };

  const validateAndStore = (values: JobForm = form) => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    return nextErrors;
  };

  const updateForm = <Key extends keyof JobForm>(key: Key, value: JobForm[Key]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'provinceCode') {
        next.districtCode = '';
        next.wardCode = '';
      }
      if (key === 'districtCode') {
        next.wardCode = '';
      }

      setErrors(validate(next));
      return next;
    });
  };

  const updateSalaryRange = (field: 'minSalary' | 'maxSalary', value: string) => {
    const salaryValue = Math.min(150000, Math.max(0, Number(value)));
    if (field === 'minSalary') {
      updateForm('minSalary', String(Math.min(salaryValue, maxSalary - 1000)));
      return;
    }

    updateForm('maxSalary', String(Math.max(salaryValue, minSalary + 1000)));
  };

  const markTouched = (field: keyof JobForm) => {
    setTouched((prev) => new Set(prev).add(field));
    validateAndStore();
  };

  const fieldError = (field: keyof JobForm) => (touched.has(field) ? errors[field] : undefined);

  const fieldsForStep: Record<StepKey, (keyof JobForm)[]> = {
    basic: ['title', 'minSalary', 'maxSalary', 'categoryId', 'employmentTypeId', 'experienceLevelId', 'workApproachId', 'wardCode'],
    details: ['description', 'requirement', 'responsibilities', 'benefit'],
    settings: ['isHidden', 'isFeatured'],
    summary: [],
  };

  const canLeaveStep = (stepKey: StepKey) => {
    const nextErrors = validateAndStore();
    const stepFields = fieldsForStep[stepKey];
    setTouched((prev) => new Set([...prev, ...stepFields]));
    return !stepFields.some((field) => nextErrors[field]);
  };

  const goNext = () => {
    if (!canLeaveStep(currentStepKey)) {
      showToast('Vui lòng kiểm tra lại các trường bắt buộc', 'error');
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const saveDraft = () => {
    const blob = new Blob([JSON.stringify({ savedAt: new Date().toISOString(), requestBody, form }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const fileName = `${form.title || 'job'}-draft.json`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = fileName;
      downloadLinkRef.current.click();
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 500);
    showToast('Đã tải bản nháp', 'success');
  };

  const addSkill = () => {
    const skill = form.skillDraft.trim();
    if (!skill || form.skills.includes(skill)) return;
    updateForm('skills', [...form.skills, skill]);
    updateForm('skillDraft', '');
  };

  const removeSkill = (skill: string) => {
    updateForm(
      'skills',
      form.skills.filter((item) => item !== skill),
    );
  };

  const addQuestion = () => {
    const question = form.questionDraft.trim();
    if (!question || form.screeningQuestions.length >= 5) return;
    updateForm('screeningQuestions', [...form.screeningQuestions, question]);
    updateForm('questionDraft', '');
  };

  const removeQuestion = (question: string) => {
    updateForm(
      'screeningQuestions',
      form.screeningQuestions.filter((item) => item !== question),
    );
  };

  const submitJob = async () => {
    const nextErrors = validateAndStore();
    setTouched(new Set(Object.keys(form) as (keyof JobForm)[]));

    if (Object.keys(nextErrors).length) {
      showToast('Không gọi API, vui lòng sửa lỗi trong form', 'error');
      setCurrentStep(0);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/v1/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 201) {
        showToast('Đăng tin thành công!', 'success');
        window.setTimeout(() => router.push('/recruiter/jobs'), 700);
        return;
      }

      if (response.status === 400) {
        const data = await response.json().catch(() => null);
        const apiErrors: FormErrors = {};
        const errorList = Array.isArray(data?.errors) ? data.errors : [];
        errorList.forEach((item: { field?: keyof JobForm; message?: string }) => {
          if (item.field && item.message) apiErrors[item.field] = item.message;
        });
        setErrors((prev) => ({ ...prev, ...apiErrors }));
        showToast('Vui lòng kiểm tra lại thông tin', 'error');
        return;
      }

      if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (response.status === 403) showToast('Bạn không có quyền đăng tin cho công ty này', 'error');
      else if (response.status === 404) showToast('Dữ liệu không hợp lệ, vui lòng thử lại', 'error');
      else showToast('Có lỗi xảy ra, vui lòng thử lại sau', 'error');
    } catch {
      showToast('Không thể kết nối, kiểm tra lại mạng', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: keyof JobForm) => {
    const message = fieldError(field);
    return message ? <small className={styles.errorText}>{message}</small> : null;
  };

  const inputClass = (field: keyof JobForm) => (fieldError(field) ? styles.controlError : '');

  const renderTextarea = (field: keyof Pick<JobForm, 'description' | 'requirement' | 'responsibilities' | 'benefit'>, label: string, placeholder: string, limit: number) => (
    <label className={styles.editorField}>
      <span>{label}</span>
      <textarea
        className={inputClass(field)}
        value={form[field]}
        maxLength={limit}
        placeholder={placeholder}
        onBlur={() => markTouched(field)}
        onChange={(event) => updateForm(field, event.target.value)}
      />
      <div className={styles.editorToolbar}>
        <div>
          <button type="button" onClick={() => updateForm(field, `${form[field]} **bold**`.slice(0, limit))}>
            B
          </button>
          <button type="button" onClick={() => updateForm(field, `${form[field]} _italic_`.slice(0, limit))}>
            I
          </button>
          <button type="button" onClick={() => updateForm(field, `${form[field]}\n- `.slice(0, limit))}>
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
    field: keyof Pick<JobForm, 'categoryId' | 'employmentTypeId' | 'experienceLevelId' | 'workApproachId' | 'provinceCode' | 'districtCode' | 'wardCode'>,
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
          disabled={loadingOptions && ['categoryId', 'employmentTypeId', 'experienceLevelId', 'workApproachId'].includes(field)}
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

  const renderSalaryInput = (field: 'minSalary' | 'maxSalary', label: string, placeholder: string) => (
    <label className={styles.field}>
      <span>{label}</span>
      <input
        className={inputClass(field)}
        type="number"
        min="0"
        value={form[field]}
        placeholder={placeholder}
        onBlur={() => markTouched(field)}
        onChange={(event) => updateForm(field, event.target.value)}
      />
      {renderError(field)}
    </label>
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
                  onClick={() => {
                    if (index <= currentStep || canLeaveStep(currentStepKey)) setCurrentStep(index);
                  }}
                >
                  <span>{step.label}</span>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </nav>
          <button className={styles.cancelButton} type="button" onClick={() => router.push('/recruiter/jobs')}>
            Cancel
          </button>
        </header>

        <div className={styles.divider} />

        <div className={styles.contentGrid}>
          <aside className={styles.sidePanel}>
            {currentStep > 0 && (
              <button className={styles.previousButton} type="button" onClick={() => setCurrentStep((step) => step - 1)}>
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
                    maxLength={100}
                    placeholder="Tiêu đề / Ví dụ: Backend Developer"
                    onBlur={() => markTouched('title')}
                    onChange={(event) => updateForm('title', event.target.value)}
                  />
                  <span className={styles.counter}>{form.title.length}/100</span>
                  {renderError('title')}
                </label>

                <div className={styles.gridTwo}>
                  {renderSelect('categoryId', 'Job Category', 'Chọn danh mục...', options.categories)}
                  {renderSelect('employmentTypeId', 'Employment Type', 'Chọn loại hình...', options.employmentTypes)}
                </div>

                <div className={styles.gridTwo}>
                  {renderSelect('experienceLevelId', 'Experience Level', 'Chọn cấp độ...', options.experienceLevels)}
                  {renderSelect('workApproachId', 'Work Approach', 'Chọn hình thức...', options.workApproaches)}
                </div>

                <section className={styles.locationGroup}>
                  <h3>Location</h3>
                  <div className={styles.gridThree}>
                    {renderSelect('provinceCode', 'Province', 'Tỉnh/Thành phố', provinces, 'location')}
                    {renderSelect('districtCode', 'District', 'Quận/Huyện', districts)}
                    {renderSelect('wardCode', 'Ward', 'Tìm phường/xã...', wards)}
                  </div>
                </section>

                <section className={styles.salarySection}>
                  <h3>Compensation Range (USD)</h3>
                  <div className={styles.gridTwo}>
                    {renderSalaryInput('minSalary', 'Minimum Salary', 'Ví dụ: 1000')}
                    {renderSalaryInput('maxSalary', 'Maximum Salary', 'Ví dụ: 5000')}
                  </div>
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
                      value={minSalary}
                      onChange={(event) => updateSalaryRange('minSalary', event.target.value)}
                    />
                    <input
                      aria-label="Maximum salary"
                      className={styles.rangeInput}
                      type="range"
                      min="0"
                      max="150000"
                      step="1000"
                      value={maxSalary}
                      onChange={(event) => updateSalaryRange('maxSalary', event.target.value)}
                    />
                  </div>
                  <div className={styles.rangeLabels}>
                    <span>{formatCurrency(minSalary)}</span>
                    <span>{formatCurrency(maxSalary)}</span>
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

                {renderTextarea('description', 'Mô tả công việc', 'Nhập mô tả...', 5000)}
                {renderTextarea('responsibilities', 'Trách nhiệm', 'Nhập trách nhiệm...', 5000)}

                <section className={styles.detailsExtras}>
                  {renderTextarea('requirement', 'Yêu cầu ứng viên', 'Nhập yêu cầu...', 5000)}
                  {renderTextarea('benefit', 'Quyền lợi', 'Nhập quyền lợi...', 2000)}
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
                        <strong>Hiển thị nổi bật</strong>
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
                        <strong>Ẩn job này</strong>
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
                  <div className={styles.gridTwo}>
                    {renderSelect('categoryId', 'Job Category', 'Select a category', options.categories)}
                    <label className={styles.field}>
                      <span>Hiring Company/Department</span>
                      <input value="From auth context" disabled readOnly />
                    </label>
                  </div>
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
                      {getOptionLabel(options.categories, form.categoryId)} • {getOptionLabel(options.employmentTypes, form.employmentTypeId)} •{' '}
                      {getOptionLabel(options.workApproaches, form.workApproachId)}
                    </p>
                  </div>
                  <strong>
                    {formatCurrency(minSalary)} - {formatCurrency(maxSalary)}
                  </strong>
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
                  <Send size={17} />
                </button>
              ) : (
                <button className={styles.nextButton} type="button" disabled={isSubmitting} onClick={submitJob}>
                  {isSubmitting ? <Loader2 className={styles.spinner} size={17} /> : <Send size={17} />}
                  Đăng tin tuyển dụng
                </button>
              )}
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
        <div className={`${styles.toast} ${styles[`toast${toast.type}`]}`}>
          <CheckCircle2 size={20} />
          {toast.message}
        </div>
      )}
    </main>
  );
}
