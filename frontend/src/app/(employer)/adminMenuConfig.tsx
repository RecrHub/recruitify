import type { MenuDataItem } from '@ant-design/pro-components';
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export const adminMenuConfig: MenuDataItem[] = [
  {
    path: '/employer',
    name: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: '/employer/jobs',
    name: 'Quản lý tin tuyển dụng',
    icon: <FileTextOutlined />,
  },
  {
    path: '/employer/candidates',
    name: 'Ứng viên',
    icon: <TeamOutlined />,
  },
  {
    path: '/employer/interviews',
    name: 'Phỏng vấn',
    icon: <CalendarOutlined />,
  },
  {
    path: '/employer/settings',
    name: 'Cài đặt',
    icon: <SettingOutlined />,
  },
];
