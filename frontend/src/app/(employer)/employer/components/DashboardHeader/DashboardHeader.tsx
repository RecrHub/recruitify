'use client';

import { Flex, Typography, Button, DatePicker } from 'antd';
import { SettingOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './DashboardHeader.module.css';

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
        <Button
          icon={<SettingOutlined />}
          className={styles.customizeBtn}
        >
          Customize
        </Button>

        <RangePicker
          className={styles.datePicker}
          suffixIcon={<CalendarOutlined className={styles.calendarIcon} />}
          defaultValue={[
            dayjs('2025-06-01'),
            dayjs('2026-06-30')
          ]}
          format="MMM D, YYYY"
          allowClear={false}
        />
      </Flex>
    </Flex>
  );
}