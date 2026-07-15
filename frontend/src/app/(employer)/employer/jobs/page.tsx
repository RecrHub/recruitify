'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ListFilter } from 'lucide-react';
import type { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { JobDetailsPanel } from './components/JobDetailsPanel';
import { JobsTable, type JobsTableColumn } from './components/JobsTable';
import { StatusBadge } from './components/StatusBadge';
import {
  formatSalary,
  getCategoryLabel,
  getEmploymentTypeLabel,
  getExperienceLevelLabel,
  getWardLabel,
  getWorkApproachLabel,
} from './jobDisplay';
import { categoryFilterOptions, statusTabs } from './jobConstants';
import type { EmployerJobListItem, JobStatus } from './types';
import styles from './jobsPage.module.css';
import { DatePicker } from 'antd';
import { ApiJob, type JobFilterOption } from '@/services/jobService';
import { employerJobService as jobService } from '@/services/employerJobService';

type StatusFilter = 'all' | JobStatus;
type ApiStatusFilter = 'ACTIVE' | 'DRAFT' | 'CLOSED';
type JobFieldKey =
  | 'title'
  | 'status'
  | 'categoryText'
  | 'employmentTypeText'
  | 'experienceLevelText'
  | 'workApproachText'
  | 'salaryText'
  | 'locationText'
  | 'applicants'
  | 'matched'
  | 'skills'
  | 'isHidden'
  | 'isFeatured';

const statusTabToFilter: StatusFilter[] = ['all', 'open', 'hold', 'closed', 'draft'];
const statusTabToApiStatus: Record<StatusFilter, ApiStatusFilter | null> = {
  all: null,
  open: 'ACTIVE',
  hold: null,
  closed: 'CLOSED',
  draft: 'DRAFT',
};

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const DEFAULT_PAGE_SIZE = 10;
const FIELD_PAGE_SIZE = 4;
const DEFAULT_VISIBLE_FIELDS: JobFieldKey[] = ['title', 'categoryText', 'status', 'salaryText'];

const jobFieldOptions: Array<{
  key: JobFieldKey;
  label: string;
  render: (job: EmployerJobListItem) => ReactNode;
}> = [
  { key: 'title', label: 'Job Title', render: (job) => job.title },
  { key: 'status', label: 'Status', render: (job) => <StatusBadge status={job.status} /> },
  { key: 'categoryText', label: 'Category', render: (job) => job.categoryText },
  { key: 'employmentTypeText', label: 'Employment Type', render: (job) => job.employmentTypeText },
  { key: 'experienceLevelText', label: 'Experience', render: (job) => job.experienceLevelText },
  { key: 'workApproachText', label: 'Work Approach', render: (job) => job.workApproachText },
  { key: 'salaryText', label: 'Salary', render: (job) => job.salaryText },
  { key: 'locationText', label: 'Location', render: (job) => job.locationText },
  { key: 'applicants', label: 'Applicants', render: (job) => job.applicants },
  { key: 'matched', label: 'Matched', render: (job) => job.matched },
  { key: 'skills', label: 'Skills', render: (job) => job.skills.join(', ') || 'None' },
  { key: 'isHidden', label: 'Hidden', render: (job) => (job.isHidden ? 'Yes' : 'No') },
  { key: 'isFeatured', label: 'Featured', render: (job) => (job.isFeatured ? 'Yes' : 'No') },
];

const normalizeJobStatus = (status?: string): JobStatus => {
  const normalizedStatus = status?.toLowerCase();
  if (
    normalizedStatus === 'open' ||
    normalizedStatus === 'active' ||
    normalizedStatus === 'hold' ||
    normalizedStatus === 'closed' ||
    normalizedStatus === 'draft'
  ) {
    return normalizedStatus === 'active' ? 'open' : normalizedStatus;
  }
  return 'open';
};

const mapApiJobToEmployerJob = (job: ApiJob): EmployerJobListItem => {
  const minSalary = job.minSalary ?? 0;
  const maxSalary = job.maxSalary ?? 0;
  const wardCode = job.wardCode ?? '';
  const categoryId = job.categoryId ?? 1;
  const employmentTypeId = job.employmentTypeId ?? 1;
  const experienceLevelId = job.experienceLevelId ?? 1;
  const workApproachId = job.workApproachId ?? 1;
  const locationText = [job.provinceName, job.wardName]
    .filter(Boolean)
    .join(', ') || getWardLabel(wardCode);

  return {
    id: Number(job.id),
    title: job.title,
    description: job.description ?? '',
    requirement: job.requirement ?? '',
    responsibilities: job.responsibilities ?? '',
    benefit: job.benefit ?? '',
    minSalary,
    maxSalary,
    salaryText: formatSalary(minSalary, maxSalary),
    isHidden: job.isHidden ?? false,
    isFeatured: false,
    categoryId,
    categoryText: job.categoryName ?? getCategoryLabel(categoryId),
    companyId: job.companyId ?? 1,
    employmentTypeId,
    employmentTypeText: job.employmentTypeName ?? getEmploymentTypeLabel(employmentTypeId),
    experienceLevelId,
    experienceLevelText: job.experienceLevelName ?? getExperienceLevelLabel(experienceLevelId),
    workApproachId,
    workApproachText: job.workApproachName ?? getWorkApproachLabel(workApproachId),
    wardCode,
    locationText,
    status: normalizeJobStatus(job.status),
    matched: job.applied ?? 0,
    applicants: job.applied ?? 0,
    education: job.experienceLevelName ?? '',
    skills: Array.from(job.skillsName ?? []),
    qualifications: [],
  };
};

const filterJobsClientSide = (
  jobs: EmployerJobListItem[],
  categoryIds: number[],
  locationCodes: string[],
  jobTypeIds: number[],
) =>
  jobs.filter((job) => {
    const matchesCategory = categoryIds.length === 0 || categoryIds.includes(job.categoryId);
    const matchesLocation = locationCodes.length === 0 || locationCodes.includes(job.wardCode);
    const matchesJobType = jobTypeIds.length === 0 || jobTypeIds.includes(job.employmentTypeId);
    return matchesCategory && matchesLocation && matchesJobType;
  });

export default function EmployerJobsPage() {
  const searchParams = useSearchParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<EmployerJobListItem | null>(null);
  const [jobs, setJobs] = useState<EmployerJobListItem[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<JobFilterOption[]>(categoryFilterOptions);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedLocationCodes, setSelectedLocationCodes] = useState<string[]>([]);
  const [selectedJobTypeIds, setSelectedJobTypeIds] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedFieldKeys, setSelectedFieldKeys] = useState<JobFieldKey[]>(DEFAULT_VISIBLE_FIELDS);
  const [fieldPageIndex, setFieldPageIndex] = useState(0);
  const [isFieldMenuOpen, setIsFieldMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const keyword = searchParams.get('q')?.trim() ?? '';
  const activeStatusFilter = statusTabToFilter[activeTabIndex] ?? 'all';
  const apiStatus = statusTabToApiStatus[activeStatusFilter];
  const isUnsupportedStatus = activeStatusFilter === 'hold';
  const selectedDateValue = selectedDate?.format('YYYY-MM-DD');
  const resultStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const resultEnd = Math.min(currentPage * pageSize, totalItems);
  const selectedFieldCount = selectedFieldKeys.length;
  const fieldPageCount = Math.max(1, Math.ceil(selectedFieldCount / FIELD_PAGE_SIZE));
  const visibleFieldKeys = selectedFieldKeys.slice(
    fieldPageIndex * FIELD_PAGE_SIZE,
    fieldPageIndex * FIELD_PAGE_SIZE + FIELD_PAGE_SIZE,
  );
  const visibleColumns: JobsTableColumn[] = visibleFieldKeys
    .map((fieldKey) => jobFieldOptions.find((option) => option.key === fieldKey))
    .filter((option): option is (typeof jobFieldOptions)[number] => Boolean(option))
    .map((option) => ({
      key: option.key,
      label: option.label,
      render: option.render,
    }));

  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  useEffect(() => {
    if (fieldPageIndex >= fieldPageCount) {
      setFieldPageIndex(0);
    }
  }, [fieldPageCount, fieldPageIndex]);



  useEffect(() => {
    async function loadJobs() {
      if (isUnsupportedStatus) {
        setJobs([]);
        setTotalItems(0);
        setTotalPages(1);
        setErrorMessage('');
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await jobService.getJobs({
          page: currentPage - 1,
          pageSize,
          keyword,
          status: apiStatus ?? undefined,
          categoryIds: selectedCategoryIds,
          wardCodes: selectedLocationCodes,
          employmentTypeIds: selectedJobTypeIds,
          createdDate: selectedDateValue,
        });

        const mappedJobs = response.jobs.map(mapApiJobToEmployerJob);
        const filteredJobs = filterJobsClientSide(
          mappedJobs,
          selectedCategoryIds,
          selectedLocationCodes,
          selectedJobTypeIds,
        );

        setJobs(filteredJobs);
        setTotalItems(filteredJobs.length === mappedJobs.length ? response.totalElements : filteredJobs.length);
        setTotalPages(
          filteredJobs.length === mappedJobs.length
            ? Math.max(1, response.totalPages)
            : Math.max(1, Math.ceil(filteredJobs.length / pageSize)),
        );
      } catch (error) {
        setJobs([]);
        setTotalItems(0);
        setTotalPages(1);
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load jobs');
        console.error('Failed to load jobs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
  }, [
    apiStatus,
    currentPage,
    isUnsupportedStatus,
    keyword,
    pageSize,
    selectedCategoryIds,
    selectedDateValue,
    selectedJobTypeIds,
    selectedLocationCodes,
  ]);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategoryIds((currentIds) =>
      currentIds.includes(categoryId)
        ? currentIds.filter((id) => id !== categoryId)
        : [...currentIds, categoryId],
    );
    setCurrentPage(1);
  };

  const handleLocationToggle = (locationCode: string) => {
    setSelectedLocationCodes((currentCodes) =>
      currentCodes.includes(locationCode)
        ? currentCodes.filter((code) => code !== locationCode)
        : [...currentCodes, locationCode],
    );
    setCurrentPage(1);
  };

  const handleJobTypeToggle = (jobTypeId: number) => {
    setSelectedJobTypeIds((currentIds) =>
      currentIds.includes(jobTypeId)
        ? currentIds.filter((id) => id !== jobTypeId)
        : [...currentIds, jobTypeId],
    );
    setCurrentPage(1);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const handleFieldToggle = (fieldKey: JobFieldKey) => {
    setSelectedFieldKeys((currentKeys) => {
      if (currentKeys.includes(fieldKey)) {
        return currentKeys.length === 1
          ? currentKeys
          : currentKeys.filter((key) => key !== fieldKey);
      }

      return [...currentKeys, fieldKey];
    });
    setFieldPageIndex(0);
  };

  const showNextFieldPage = () => {
    setFieldPageIndex((currentIndex) => (currentIndex + 1) % fieldPageCount);
  };

  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Jobs</h1>

        <div className={styles.toolbarActions}>
          <DatePicker
            className={styles.datePicker}
            value={selectedDate}
            placeholder="Select date"
            onChange={handleDateChange}
          />
          <button
            type="button"
            className={`${styles.pillButton} ${isFieldMenuOpen ? styles.pillButtonActive : ''}`}
            aria-expanded={isFieldMenuOpen}
            onClick={() => setIsFieldMenuOpen((isOpen) => !isOpen)}
          >
            <ListFilter size={19} aria-hidden />
            List View
          </button>
          {isFieldMenuOpen && (
            <div className={styles.fieldMenu}>
              {jobFieldOptions.map((option) => (
                <label key={option.key} className={styles.fieldMenuOption}>
                  <input
                    type="checkbox"
                    checked={selectedFieldKeys.includes(option.key)}
                    onChange={() => handleFieldToggle(option.key)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className={styles.jobsPage} aria-label="Jobs dashboard">

        <FilterSidebar
          categoryOptions={categoryOptions}
          selectedCategoryIds={selectedCategoryIds}
          selectedLocationCodes={selectedLocationCodes}
          selectedJobTypeIds={selectedJobTypeIds}
          onToggleCategory={handleCategoryToggle}
          onToggleLocation={handleLocationToggle}
          onToggleJobType={handleJobTypeToggle}
        />
        <main className={styles.mainPanel}>
          <div className={styles.toolbar}>
            <nav className={styles.tabs} aria-label="Job status tabs">
              {statusTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.tabButton} ${index === activeTabIndex ? styles.tabButtonActive : ''}`}
                  onClick={() => handleTabChange(index)}
                >
                  {tab}
                </button>
              ))}
            </nav>

          </div>

          {isLoading && <div className={styles.stateMessage}>Loading jobs...</div>}

          {!isLoading && errorMessage && (
            <div className={styles.stateMessage} role="alert">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && isUnsupportedStatus && (
            <div className={styles.stateMessage}>
              Hold status is not supported by the current jobs API.
            </div>
          )}

          {!isLoading && !errorMessage && !isUnsupportedStatus && jobs.length === 0 && (
            <div className={styles.stateMessage}>
              No jobs found.
            </div>
          )}

          {!isLoading && !errorMessage && !isUnsupportedStatus && jobs.length > 0 && (
            <JobsTable
              jobs={jobs}
              columns={visibleColumns}
              onSelectJob={setSelectedJob}
              onShowNextFields={showNextFieldPage}
              hasFieldPages={fieldPageCount > 1}
            />
          )}

          <footer className={styles.paginationBar}>
            <span>Results: {resultStart}-{resultEnd} of {totalItems}</span>
            <div className={styles.paginationControls}>
              <label className={styles.pageSizeControl}>
                Show
                <select
                  value={pageSize}
                  onChange={(event) => handlePageSizeChange(event.target.value)}
                  disabled={isLoading}
                >
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <div className={styles.pagination}>
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={currentPage === 1 || isLoading}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  ‹
                </button>
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={pageNumber === currentPage ? styles.pageActive : ''}
                    disabled={isLoading}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={currentPage >= totalPages || isLoading}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                >
                  ›
                </button>
              </div>
            </div>
          </footer>
        </main>
      </section>

      {selectedJob && <JobDetailsPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </>
  );
}
