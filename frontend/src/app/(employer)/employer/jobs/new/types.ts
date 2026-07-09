export type StepKey = 'basic' | 'details' | 'settings' | 'summary';

export type Option = { id: string; label: string };

export type ToastType = 'success' | 'error' | 'info';

export type Toast = { type: ToastType; message: string };

export type JobForm = {
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

export type FormErrors = Partial<Record<keyof JobForm, string>>;

export type SelectableField = keyof Pick<
  JobForm,
  | 'categoryId'
  | 'employmentTypeId'
  | 'experienceLevelId'
  | 'workApproachId'
  | 'provinceCode'
  | 'districtCode'
  | 'wardCode'
>;

export type TextareaField = keyof Pick<JobForm, 'description' | 'requirement' | 'responsibilities' | 'benefit'>;

export type SelectOptions = {
  categories: Option[];
  employmentTypes: Option[];
  experienceLevels: Option[];
  workApproaches: Option[];
};
