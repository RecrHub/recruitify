'use client';

import { Card, Flex, Typography } from 'antd';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import styles from './OverviewChart.module.css';

const { Title } = Typography;

interface ChartData {
  month: string;
  value: number;
}

interface Props {
  data: ChartData[];
}

export default function OverviewChart({ data }: Props) {
  return (
    <div className={styles.container}>
      <Flex
        justify="space-between"
        align="center"
        className={styles.header}
      >
        <Title level={4} className={styles.title}>
          Application Received Time
        </Title>

        <div className={styles.badge}>
          <button className={styles.active}>12 months</button>
          <button className={styles.tab}>30 days</button>
          <button className={styles.tab}>7 Days</button>
        </div>
      </Flex>

      <Card
        className={styles.card}
        styles={{
          body: {
            padding: '24px 24px 16px 24px',
          },
        }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3f8361" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#452626" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#F2F4F7" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={(v) => `${v}k`} tickLine={false} axisLine={false} domain={[50, 250]} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#166534" strokeWidth={3} fill="url(#green)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}