import type { FormErrors, JobForm, StepKey } from './types';
import { FIELD_LIMITS } from './constants';

export function validateJobForm(values: JobForm): FormErrors {
  const nextErrors: FormErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();

  if (!title) nextErrors.title = 'Please enter a title';
  else if (title.length < 5) nextErrors.title = 'Title must be at least 5 characters';
  else if (title.length > FIELD_LIMITS.title) nextErrors.title = `Title must be at most ${FIELD_LIMITS.title} characters`;

  if (!description) nextErrors.description = 'Please enter a job description';
  else if (description.length > FIELD_LIMITS.description) nextErrors.description = `Description must be at most ${FIELD_LIMITS.description} characters`;

  if (values.requirement.length > FIELD_LIMITS.requirement) nextErrors.requirement = `Requirements must be at most ${FIELD_LIMITS.requirement} characters`;
  if (values.responsibilities.length > FIELD_LIMITS.responsibilities) nextErrors.responsibilities = `Responsibilities must be at most ${FIELD_LIMITS.responsibilities} characters`;
  if (values.benefit.length > FIELD_LIMITS.benefit) nextErrors.benefit = `Benefits must be at most ${FIELD_LIMITS.benefit} characters`;

  if (!values.categoryId) nextErrors.categoryId = 'Please select a category';
  if (!values.employmentTypeId) nextErrors.employmentTypeId = 'Please select an employment type';
  if (!values.experienceLevelId) nextErrors.experienceLevelId = 'Please select an experience level';
  if (!values.workApproachId) nextErrors.workApproachId = 'Please select a work approach';
  if (!values.wardCode) nextErrors.wardCode = 'Please select a work location';

  return nextErrors;
}

export const fieldsForStep: Record<StepKey, (keyof JobForm)[]> = {
  basic: ['title', 'categoryId', 'employmentTypeId', 'experienceLevelId', 'workApproachId', 'wardCode'],
  details: ['description', 'requirement', 'responsibilities', 'benefit'],
  settings: ['isHidden', 'isFeatured'],
  summary: [],
};

export function hasStepErrors(errors: FormErrors, stepKey: StepKey): boolean {
  return fieldsForStep[stepKey].some((field) => errors[field]);
}
