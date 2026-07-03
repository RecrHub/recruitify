import { SlidersHorizontal } from 'lucide-react';
import { filterGroups } from '../jobConstants';
import styles from './filterSidebar.module.css';

export function FilterSidebar() {
  return (
    <aside className={styles.filterSidebar} aria-label="Job filters">
      <h1>Jobs</h1>

      <button type="button" className={styles.filterButton}>
        Filter Options
        <SlidersHorizontal size={14} aria-hidden />
      </button>

      <div className={styles.filterGroups}>
        {filterGroups.map((group) => (
          <section key={group.title} className={styles.filterGroup}>
            <h2>{group.title}</h2>
            <div className={styles.filterOptions}>
              {group.options.map((option) => (
                <label key={option} className={styles.checkboxRow}>
                  <input type="checkbox" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
