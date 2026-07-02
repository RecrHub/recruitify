'use client';

import styles from './page.module.css';

import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import StatsCards from './components/StatsCards/StatsCards';
import OverviewChart from './components/OverviewChart/OverviewChart';
import Schedule from './components/Schedule/Schedule';
import CurrentOpenings from './components/CurrentOpenings/CurrentOpenings';
import NewApplications from './components/NewApplications/NewApplications';

const chartData = [
  { month: 'Jan', value: 145 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 165 },
  { month: 'May', value: 220 },
  { month: 'Jun', value: 238 },
  { month: 'Jul', value: 252 },
  { month: 'Aug', value: 255 },
  { month: 'Sep', value: 320 },
  { month: 'Oct', value: 280 },
  { month: 'Nov', value: 205 },
  { month: 'Dec', value: 220 },
];

export default function EmployerDashboard() {
  return (
    <div className={styles.container}>
      <DashboardHeader />

      <StatsCards />

      <div className={styles.middle}>
        <OverviewChart data={chartData} />
        <Schedule />
      </div>

      <div className={styles.bottom}>
        <CurrentOpenings />
        <NewApplications />
      </div>
    </div>
  );
}