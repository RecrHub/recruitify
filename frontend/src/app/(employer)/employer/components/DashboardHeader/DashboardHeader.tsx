'use client';

import { Flex, Typography, Button, DatePicker } from 'antd';
import { SettingOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './DashboardHeader.module.css';
import { Settings2 } from 'lucide-react';


const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function DashboardHeader() {
  return (
    <Flex
      justify="space-between"
      align="center"
      className={styles.container}
    >
      <Title level={2} className={styles.title}>
        Overview
      </Title>

      <Flex gap={12} align="center">
        <DatePicker
          className={styles.datePicker}
          suffixIcon={<CalendarOutlined className={styles.calendarIcon} />}
          // defaultValue={[
          //   dayjs('2025-06-01'),
          //   dayjs('2026-06-30')
          // ]}
          defaultValue={[
            dayjs('2026-06-01')
          ]}
          format="MMM D, YYYY"
          allowClear={false}
        />
         <Button
          icon={<Settings2 />}
          className={styles.customizeBtn}
        >
          Customize
        </Button>
      </Flex>
    </Flex>
  );
}