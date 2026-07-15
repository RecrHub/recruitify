'use client';

import { Flex, Typography } from 'antd';
import styles from './Schedule.module.css';

const { Text } = Typography;

const schedules = [
  {
    time: '10:30 AM',
    title: 'Interview with Rafiqur Rahman',
    color: '#4f46e5',
    bgColor: '#eef2ff',
    avatars: ['R', 'M'],
  },
  {
    time: '12:00 PM',
    title: 'HR Team Meeting',
    color: '#15803d',
    bgColor: '#f0fdf4',
    avatars: ['A', 'B'],
  },
  {
    time: '01:00 PM',
    title: 'Job Post – Design Lead...',
    color: '#b91c1c',
    bgColor: '#fef2f2',
    avatars: ['D'],
  },
  {
    time: '05:00 PM',
    title: 'First Call with Jawaid...',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    avatars: ['J'],
  },
  {
    time: '06:30 PM',
    title: 'Interview with Le Thi Mai',
    color: '#b45309',
    bgColor: '#fffbeb',
    avatars: ['L', 'M'],
  },
  {
    time: '08:00 PM',
    title: 'Sync with Pham Quoc Bao',
    color: '#0ea5e9',
    bgColor: '#f0f9ff',
    avatars: ['P', 'B'],
  },
];

export default function Schedule() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <Flex align="center" gap={8} className={styles.header}>
        <Text strong className={styles.title}>
          Today&apos;s Schedule
        </Text>
        <span className={styles.badge}>6</span>
      </Flex>

      {/* List */}
      <Flex vertical gap={12} className={styles.list}>
        {schedules.map((item, index) => (
          <Flex key={index} align="center" className={styles.itemRow}>
            <span className={styles.timeText}>{item.time}</span>

            <div
              className={styles.dot}
              style={{ borderColor: item.color }}
            />

            {/* Khung nội dung chứa cả Avatar và HungGay */}
            <Flex
              align="center"
              className={styles.contentBox}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: item.bgColor,
                color: item.color
              }}
            >
              {/* Cụm nhóm Avatar lồng nhau */}
              <div className={styles.avatarGroup}>
                {item.avatars.map((letter, i) => (
                  <div
                    key={i}
                    className={styles.avatarItem}
                    style={{ backgroundColor: item.color }}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              {/* Text tiêu đề lịch hẹn */}
              <span className={styles.itemTitle}>{item.title}</span>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <div className={styles.viewCalendar}>
        View Calendar
      </div>
    </div>
  );
}
