'use client';

import { CalendarDays, Plus, Search, SlidersHorizontal } from 'lucide-react';
import styles from '../jobs.module.css';

const tabs = [
  { label: 'Assigned to Me', count: 2 },
  { label: 'Active', count: 2 },
  { label: 'All', count: 44, active: true },
  { label: 'Draft', count: 1 },
  { label: 'Completed', count: 40 },
];

export function JobsFilterBar() {
  return (
    <header className={styles.filterBar}>
      <nav className={styles.tabs} aria-label="Job status tabs">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={`${styles.tabButton} ${tab.active ? styles.tabButtonActive : ''}`}
          >
            <span>{tab.label}</span>
            <span className={styles.tabCount}>{tab.count}</span>
          </button>
        ))}
      </nav>

      <div className={styles.filterActions}>
        <label className={styles.searchBox}>
          <Search size={18} aria-hidden />
          <input type="search" placeholder="Search..." aria-label="Search jobs" />
        </label>

        <button type="button" className={styles.secondaryButton}>
          <CalendarDays size={18} aria-hidden />
          Date added
        </button>

        <button type="button" className={styles.secondaryButton}>
          <SlidersHorizontal size={18} aria-hidden />
          Filter
        </button>

        <button type="button" className={styles.createButton}>
          <Plus size={19} aria-hidden />
          Create Job
        </button>
      </div>
    </header>
  );
}
