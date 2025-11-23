'use client';

import { Checkbox, Select, Slider } from 'antd';
import { useState } from 'react';

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

const JobFilterForm = ({ onFilterChange, className }: JobFilterFormProps) => {
  const [filters, setFilters] = useState<JobFilters>({
    category: 'Marketing',
    jobType: [],
    experienceLevel: [],
    workApproad: [],
    salaryRange: [10, 5000],
    salaryOptions: [],
  });

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

  return (
    <div className={className}>
      {/* Header */}
      <div className="filter-header">
        <h3>Filter</h3>
      </div>

      {/* Category */}
      <div className="filter-section">
        <h4>Category</h4>
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
      <div className="filter-section">
        <h4>Job type</h4>
        <div className="checkbox-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Checkbox
              checked={filters.jobType.includes('Full-Time')}
              onChange={(e) =>
                handleCheckboxChange('jobType', 'Full-Time', e.target.checked)
              }
            >
              Full-Time
            </Checkbox>
            <Checkbox
              checked={filters.jobType.includes('Contract')}
              onChange={(e) =>
                handleCheckboxChange('jobType', 'Contract', e.target.checked)
              }
            >
              Contract
            </Checkbox>
          </div>
          <Checkbox
            checked={filters.jobType.includes('Part-Time')}
            onChange={(e) =>
              handleCheckboxChange('jobType', 'Part-Time', e.target.checked)
            }
          >
            Part-Time
          </Checkbox>
        </div>
      </div>

      {/* Experience Level */}
      <div className="filter-section">
        <h4>Experience Level</h4>
        <div className="checkbox-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

      {/* Work Approad */}
      <div className="filter-section">
        <h4>Work Approad</h4>
        <div className="checkbox-group">
          <Checkbox
            checked={filters.workApproad.includes('On-Site')}
            onChange={(e) =>
              handleCheckboxChange('workApproad', 'On-Site', e.target.checked)
            }
          >
            On-Site
          </Checkbox>
          <Checkbox
            checked={filters.workApproad.includes('Remote')}
            onChange={(e) =>
              handleCheckboxChange('workApproad', 'Remote', e.target.checked)
            }
          >
            Remote
          </Checkbox>
        </div>
      </div>

      {/* Expected Salary */}
      <div className="filter-section">
        <h4>Expected Salary</h4>
        <div className="checkbox-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Checkbox
              checked={filters.salaryOptions.includes('Under $100')}
              onChange={(e) =>
                handleCheckboxChange('salaryOptions', 'Under $100', e.target.checked)
              }
            >
              Under $100
            </Checkbox>
            <Checkbox
              checked={filters.salaryOptions.includes('$ 1K To $ 5K')}
              onChange={(e) =>
                handleCheckboxChange('salaryOptions', '$ 1K To $ 5K', e.target.checked)
              }
            >
              $ 1K To $ 5K
            </Checkbox>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Checkbox
              checked={filters.salaryOptions.includes('$ 100 to $ 1K')}
              onChange={(e) =>
                handleCheckboxChange('salaryOptions', '$ 100 to $ 1K', e.target.checked)
              }
            >
              $ 100 to $ 1K
            </Checkbox>
            <Checkbox
              checked={filters.salaryOptions.includes('Hourly')}
              onChange={(e) =>
                handleCheckboxChange('salaryOptions', 'Hourly', e.target.checked)
              }
            >
              Hourly
            </Checkbox>
          </div>
        </div>

        <div className="salary-slider">
          <Slider
            range
            min={10}
            max={5000}
            value={filters.salaryRange}
            onChange={(value) => handleFilterChange('salaryRange', value as [number, number])}
            className="custom-slider"
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '12px',
            fontSize: '12px',
            color: '#666',
          }}>
            <span>$ {filters.salaryRange[0]}</span>
            <span>$ {filters.salaryRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilterForm;

