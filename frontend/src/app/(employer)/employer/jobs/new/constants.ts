import type { JobForm, Option, StepKey } from './types';

export const steps: { key: StepKey; label: string }[] = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'details', label: 'Add Details' },
  { key: 'settings', label: 'Settings' },
  { key: 'summary', label: 'Summary' },
];

export const emptyForm: JobForm = {
  title: '',
  description: '',
  requirement: '',
  responsibilities: '',
  education: '',
  benefit: '',
  minSalary: '0',
  maxSalary: '150000',
  categoryId: '',
  employmentTypeId: '',
  experienceLevelId: '',
  workApproachId: '',
  provinceCode: '',
  districtCode: '',
  wardCode: '',
  isHidden: false,
  isFeatured: false,
  skillDraft: '',
  skills: [],
  questionDraft: '',
  screeningQuestions: [],
};

export const fallbackOptions = {
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

export const provinces: Option[] = [
  { id: 'HCM', label: 'Ho Chi Minh City' },
  { id: 'HN', label: 'Ha Noi' },
  { id: 'DN', label: 'Da Nang' },
];

export const districtsByProvince: Record<string, Option[]> = {
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

export const wardsByDistrict: Record<string, Option[]> = {
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

export const SALARY_MIN = 0;
export const SALARY_MAX = 150000;
export const SALARY_STEP = 1000;
export const MIN_SALARY_GAP = 1000;
export const MAX_SCREENING_QUESTIONS = 5;
export const TOAST_TIMEOUT_MS = 2600;
export const DRAFT_DOWNLOAD_DELAY_MS = 500;
export const POST_SUBMIT_REDIRECT_MS = 700;

export const FIELD_LIMITS = {
  title: 100,
  description: 5000,
  requirement: 5000,
  responsibilities: 5000,
  education: 2000,
  benefit: 2000,
} as const;
