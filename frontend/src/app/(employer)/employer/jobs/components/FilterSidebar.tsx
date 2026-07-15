import {
  jobTypeFilterOptions,
  locationFilterOptions,
} from '../jobConstants';
import styles from './filterSidebar.module.css';

type CategoryFilterOption = {
  id: number;
  label: string;
};

type FilterSidebarProps = {
  categoryOptions: CategoryFilterOption[];
  selectedCategoryIds: number[];
  selectedLocationCodes: string[];
  selectedJobTypeIds: number[];
  onToggleCategory: (categoryId: number) => void;
  onToggleLocation: (locationCode: string) => void;
  onToggleJobType: (jobTypeId: number) => void;
};

export function FilterSidebar({
  categoryOptions,
  selectedCategoryIds,
  selectedLocationCodes,
  selectedJobTypeIds,
  onToggleCategory,
  onToggleLocation,
  onToggleJobType,
}: FilterSidebarProps) {
  return (
    <aside className={styles.filterSidebar} aria-label="Job filters">
      <div className={styles.filterGroups}>
        <section className={styles.filterGroup}>
          <h2>Category Selection</h2>
          <div className={styles.filterOptions}>
            {categoryOptions.map((option) => (
              <label key={option.id} className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(option.id)}
                  onChange={() => onToggleCategory(option.id)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className={styles.filterGroup}>
          <h2>Location Details</h2>
          <div className={styles.filterOptions}>
            {locationFilterOptions.map((option) => (
              <label key={option.code} className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={selectedLocationCodes.includes(option.code)}
                  onChange={() => onToggleLocation(option.code)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className={styles.filterGroup}>
          <h2>Job Type Options</h2>
          <div className={styles.filterOptions}>
            {jobTypeFilterOptions.map((option) => (
              <label key={option.id} className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={selectedJobTypeIds.includes(option.id)}
                  onChange={() => onToggleJobType(option.id)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
