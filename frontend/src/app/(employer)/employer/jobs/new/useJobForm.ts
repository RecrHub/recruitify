'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FormErrors, JobForm, StepKey, Toast, ToastType } from './types';
import {
  DRAFT_DOWNLOAD_DELAY_MS,
  districtsByProvince,
  emptyForm,
  fallbackOptions,
  MAX_SCREENING_QUESTIONS,
  MIN_SALARY_GAP,
  POST_SUBMIT_REDIRECT_MS,
  SALARY_MAX,
  steps,
  TOAST_TIMEOUT_MS,
  wardsByDistrict,
} from './constants';
import { fetchJson, normalizeOptions, slugify } from './utils';
import { fieldsForStep, hasStepErrors, validateJobForm } from './validation';

const STEP_OPTION_ENDPOINTS = {
  categories: '/api/v1/categories',
  employmentTypes: '/api/v1/employment-types',
  experienceLevels: '/api/v1/experience-levels',
  workApproaches: '/api/v1/work-approaches',
} as const;

export function useJobForm() {
  const router = useRouter();
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<JobForm>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof JobForm>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [options, setOptions] = useState(fallbackOptions);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const currentStepKey = steps[currentStep].key;
  const minSalary = Number(form.minSalary || 0);
  const maxSalary = Number(form.maxSalary || SALARY_MAX);
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
    }),
    [form, minSalary, maxSalary],
  );

  const salaryLeft = useMemo(
    () => Math.min(100, Math.max(0, (minSalary / SALARY_MAX) * 100)),
    [minSalary],
  );
  const salaryRight = useMemo(
    () => Math.min(100, Math.max(0, 100 - (maxSalary / SALARY_MAX) * 100)),
    [maxSalary],
  );

  useEffect(() => {
    let alive = true;

    async function loadOptions() {
      setLoadingOptions(true);
      try {
        const [categories, employmentTypes, experienceLevels, workApproaches] = await Promise.all([
          fetchJson(STEP_OPTION_ENDPOINTS.categories),
          fetchJson(STEP_OPTION_ENDPOINTS.employmentTypes),
          fetchJson(STEP_OPTION_ENDPOINTS.experienceLevels),
          fetchJson(STEP_OPTION_ENDPOINTS.workApproaches),
        ]);

        if (!alive) return;

        setOptions({
          categories: normalizeOptions(categories, fallbackOptions.categories),
          employmentTypes: normalizeOptions(employmentTypes, fallbackOptions.employmentTypes),
          experienceLevels: normalizeOptions(experienceLevels, fallbackOptions.experienceLevels),
          workApproaches: normalizeOptions(workApproaches, fallbackOptions.workApproaches),
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

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), TOAST_TIMEOUT_MS);
  }, []);

  const runValidation = useCallback((values: JobForm) => validateJobForm(values), []);

  const validateAndStore = useCallback((values: JobForm = form) => {
    const nextErrors = validateJobForm(values);
    setErrors(nextErrors);
    return nextErrors;
  }, [form]);

  const updateForm = useCallback(<Key extends keyof JobForm>(key: Key, value: JobForm[Key]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'provinceCode') {
        next.districtCode = '';
        next.wardCode = '';
      }
      if (key === 'districtCode') {
        next.wardCode = '';
      }

      setErrors(validateJobForm(next));
      return next;
    });
  }, []);

  const updateSalaryRange = useCallback(
    (field: 'minSalary' | 'maxSalary', value: string) => {
      const salaryValue = Math.min(SALARY_MAX, Math.max(0, Number(value)));
      if (field === 'minSalary') {
        updateForm('minSalary', String(Math.min(salaryValue, maxSalary - MIN_SALARY_GAP)));
        return;
      }
      updateForm('maxSalary', String(Math.max(salaryValue, minSalary + MIN_SALARY_GAP)));
    },
    [updateForm, minSalary, maxSalary],
  );

  const markTouched = useCallback(
    (field: keyof JobForm) => {
      setTouched((prev) => new Set(prev).add(field));
      validateAndStore();
    },
    [validateAndStore],
  );

  const fieldError = useCallback(
    (field: keyof JobForm) => (touched.has(field) ? errors[field] : undefined),
    [touched, errors],
  );

  const canLeaveStep = useCallback(
    (stepKey: StepKey) => {
      const nextErrors = validateAndStore();
      const stepFields = fieldsForStep[stepKey];
      setTouched((prev) => new Set([...prev, ...stepFields]));
      return !hasStepErrors(nextErrors, stepKey);
    },
    [validateAndStore],
  );

  const goNext = useCallback(() => {
    if (!canLeaveStep(currentStepKey)) {
      showToast('Please review the required fields', 'error');
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }, [canLeaveStep, currentStepKey, showToast]);

  const goPrev = useCallback(() => {
    setCurrentStep((step) => Math.max(0, step - 1));
  }, []);

  const goToStep = useCallback(
    (target: number) => {
      setCurrentStep((prev) => {
        if (target <= prev) return target;
        if (canLeaveStep(steps[prev].key)) return target;
        return prev;
      });
    },
    [canLeaveStep],
  );

  const cancel = useCallback(() => {
    router.push('/employer/jobs');
  }, [router]);

  const saveDraft = useCallback(() => {
    const blob = new Blob(
      [JSON.stringify({ savedAt: new Date().toISOString(), requestBody, form }, null, 2)],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const fileName = `${slugify(form.title || 'job')}-draft.json`;

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = fileName;
      downloadLinkRef.current.click();
    }

    window.setTimeout(() => URL.revokeObjectURL(url), DRAFT_DOWNLOAD_DELAY_MS);
    showToast('Draft downloaded', 'success');
  }, [form, requestBody, showToast]);

  const addSkill = useCallback(() => {
    const skill = form.skillDraft.trim();
    if (!skill || form.skills.includes(skill)) return;
    updateForm('skills', [...form.skills, skill]);
    updateForm('skillDraft', '');
  }, [form.skillDraft, form.skills, updateForm]);

  const removeSkill = useCallback(
    (skill: string) => {
      updateForm('skills', form.skills.filter((item) => item !== skill));
    },
    [form.skills, updateForm],
  );

  const addQuestion = useCallback(() => {
    const question = form.questionDraft.trim();
    if (!question || form.screeningQuestions.length >= MAX_SCREENING_QUESTIONS) return;
    updateForm('screeningQuestions', [...form.screeningQuestions, question]);
    updateForm('questionDraft', '');
  }, [form.questionDraft, form.screeningQuestions, updateForm]);

  const removeQuestion = useCallback(
    (question: string) => {
      updateForm('screeningQuestions', form.screeningQuestions.filter((item) => item !== question));
    },
    [form.screeningQuestions, updateForm],
  );

  const submitJob = useCallback(async () => {
    const nextErrors = validateAndStore();
    setTouched(new Set(Object.keys(form) as (keyof JobForm)[]));

    if (Object.keys(nextErrors).length) {
      showToast('API not called, please fix the form errors', 'error');
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
        showToast('Job posted successfully!', 'success');
        window.setTimeout(() => router.push('/employer/jobs'), POST_SUBMIT_REDIRECT_MS);
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
        showToast('Please review your information', 'error');
        return;
      }

      if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (response.status === 403) showToast('You are not authorized to post jobs for this company', 'error');
      else if (response.status === 404) showToast('Invalid data, please try again', 'error');
      else showToast('Something went wrong, please try again later', 'error');
    } catch {
      showToast('Connection failed, please check your network', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [form, requestBody, router, showToast, validateAndStore]);

  return {
    // refs
    downloadLinkRef,

    // state
    currentStep,
    currentStepKey,
    form,
    isSubmitting,
    loadingOptions,
    options,
    toast,

    // derived
    minSalary,
    maxSalary,
    districts,
    wards,
    requestBody,
    salaryLeft,
    salaryRight,

    // handlers
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
    showToast,
    submitJob,
    updateForm,
    updateSalaryRange,
  };
}
