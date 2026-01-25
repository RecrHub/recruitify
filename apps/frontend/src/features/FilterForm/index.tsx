'use client';

import { Checkbox, Select, Slider } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Line from '@/access/icons/Line.svg';
import { useStyles } from './style';

interface JobFilterFormProps {
  onFilterChange?: (filters: JobFilters) => void;
  className?: string;
}

export interface JobFilters {
  category?: string;
  jobType: string[];
  experienceLevel: string[];
  workApproad: string[];
  salaryRange: [number, number];
  salaryOptions: string[];
}

// Define styles using createStyles

const JobFilterForm = ({ onFilterChange, className }: JobFilterFormProps) => {
  const { styles, cx } = useStyles();

  const [filters, setFilters] = useState<JobFilters>({
    category: 'Marketing',
    jobType: [],
    experienceLevel: [],
    workApproad: [],
    salaryRange: [10, 5000],
    salaryOptions: [],
  });

  const salaryOptions = ['Under $100', '$1K To $5K', '$100 to $1K', 'Hourly'];

  const handleFilterChange = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCheckboxChange = (key: keyof JobFilters, value: string, checked: boolean) => {
    const currentValues = filters[key] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    handleFilterChange(key, newValues);
  };

  const handleSliderChange = (value: number | number[]) => {
    handleFilterChange('salaryRange', value as [number, number]);
  };

  return (
    <div className={cx(styles.container, className)}>
      {/* Header */}
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>Filter</h3>
      </div>
      <Line />

      {/* Category */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Category</h4>
        <Select
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value)}
          style={{ width: '100%' }}
          size="large"
          options={[
            { label: 'Marketing', value: 'Marketing' },
            { label: 'Design', value: 'Design' },
            { label: 'Development', value: 'Development' },
            { label: 'Finance', value: 'Finance' },
            { label: 'Sales', value: 'Sales' },
            { label: 'Customer Service', value: 'Customer Service' },
          ]}
        />
      </div>

      {/* Job type */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Job type</h4>
        <div className={styles.borderedSection}><div className={styles.checkboxGroup}>
          <div className={styles.checkboxRow}>
            <Checkbox
              checked={filters.jobType.includes('Full-Time')}
              onChange={(e) => handleCheckboxChange('jobType', 'Full-Time', e.target.checked)}
            >
              Full-Time
            </Checkbox>
            <Checkbox
              checked={filters.jobType.includes('Contract')}
              onChange={(e) => handleCheckboxChange('jobType', 'Contract', e.target.checked)}
            >
              Contract
            </Checkbox>
          </div>
          <Checkbox
            checked={filters.jobType.includes('Part-Time')}
            onChange={(e) => handleCheckboxChange('jobType', 'Part-Time', e.target.checked)}
          >
            Part-Time
          </Checkbox>
        </div>
        </div>
      </div>

      {/* Experience Level */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Experience Level</h4>
        <div className={styles.borderedSection}>
          <div className={styles.checkboxGroup}>
            <div className={styles.checkboxRow}>
              <Checkbox
                checked={filters.experienceLevel.includes('Entry Level')}
                onChange={(e) =>
                  handleCheckboxChange('experienceLevel', 'Entry Level', e.target.checked)
                }
              >
                Entry Level
              </Checkbox>
              <Checkbox
                checked={filters.experienceLevel.includes('Expert')}
                onChange={(e) =>
                  handleCheckboxChange('experienceLevel', 'Expert', e.target.checked)
                }
              >
                Expert
              </Checkbox>
            </div>
            <Checkbox
              checked={filters.experienceLevel.includes('Intermediate')}
              onChange={(e) =>
                handleCheckboxChange('experienceLevel', 'Intermediate', e.target.checked)
              }
            >
              Intermediate
            </Checkbox>
          </div>
        </div>
      </div>

      {/* Work Approad */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Work Approad</h4>
        <div className={styles.borderedSection}>
          <div className={styles.checkboxGroup}>
            <Checkbox
              checked={filters.workApproad.includes('On-Site')}
              onChange={(e) => handleCheckboxChange('workApproad', 'On-Site', e.target.checked)}
            >
              On-Site
            </Checkbox>
            <Checkbox
              checked={filters.workApproad.includes('Remote')}
              onChange={(e) => handleCheckboxChange('workApproad', 'Remote', e.target.checked)}
            >
              Remote
            </Checkbox>
          </div>
        </div>
      </div>

      {/* Expected Salary - WITH BORDER */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Expected Salary</h4>

        <div className={styles.borderedSection}>
          {/* Checkbox grid */}
          <div className={styles.checkboxGrid}>
            {salaryOptions.map((option) => (
              <Checkbox
                key={option}
                checked={filters.salaryOptions.includes(option)}
                onChange={(e: CheckboxChangeEvent) =>
                  handleCheckboxChange('salaryOptions', option, e.target.checked)
                }
              >
                {option}
              </Checkbox>
            ))}
          </div>

          {/* Salary slider */}
          <div className={styles.salarySlider}>
            <Slider
              range
              min={10}
              max={5000}
              value={filters.salaryRange}
              onChange={handleSliderChange}
              tooltip={{ formatter: (value) => `$${value}` }}
              styles={{
                track: { backgroundColor: '#10b981' },
                tracks: { backgroundColor: '#10b981' },
              }}
            />
            <div className={styles.sliderLabels}>
              <span className={styles.sliderLabel}>${filters.salaryRange[0]}</span>
              <span className={styles.sliderLabel}>${filters.salaryRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilterForm;