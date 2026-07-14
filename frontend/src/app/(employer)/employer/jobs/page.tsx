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
import { ApiJob, type JobFilterOption, jobService } from '@/services/jobService';

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
    let alive = true;

    async function loadCategoryOptions() {
      try {
        const options = await jobService.getCategoryOptions();
        if (alive && options.length > 0) {
          setCategoryOptions(options);
        }
      } catch (error) {
        console.error('Failed to load category options:', error);
      }
    }

    loadCategoryOptions();
    return () => {
      alive = false;
    };
  }, []);

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
