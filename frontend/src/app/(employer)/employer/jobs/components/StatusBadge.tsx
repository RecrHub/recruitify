import type { JobStatus } from '../types';
import { statusLabel } from '../jobConstants';
import styles from './jobStatus.module.css';

export function StatusBadge({ status }: { status: JobStatus }) {
  return <span className={`${styles.statusBadge} ${styles[`statusBadge_${status}`]}`}>{statusLabel[status]}</span>;
}
