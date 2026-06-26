'use client';

import type { PipelineStat as PipelineStatType } from '../types';
import styles from '../jobs.module.css';

interface PipelineStatProps {
  item: PipelineStatType;
}

export function PipelineStat({ item }: PipelineStatProps) {
  const Icon = item.icon;
  const toneClass =
    item.tone === 'hired'
      ? styles.pipelineValueHired
      : item.tone === 'rejected'
        ? styles.pipelineValueRejected
        : styles.pipelineValueDefault;

  return (
    <div className={styles.pipelineItem}>
      <span className={styles.pipelineLabel}>
        <Icon size={17} aria-hidden />
        {item.label}
      </span>
      <span className={`${styles.pipelineValue} ${toneClass}`}>{item.value}</span>
    </div>
  );
}
