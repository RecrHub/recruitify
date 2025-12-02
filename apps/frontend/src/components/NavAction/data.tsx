import { 
  DashboardOutlined,
  UserOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';
import type { MenuProps, ItemType } from '@/components/Menu';
import { DropdownProps } from '../Dropdown';
import { useUserDropdownStyles } from './styles';
import { Briefcase, LayoutDashboard, LogOut, MailCheck, MailIcon, Settings, User2 } from 'lucide-react';

export const useUserDropdownMenu = (
  router: any,
  logout: () => void,
  user?: any
) => {
  const { styles, cx } = useUserDropdownStyles();

  return {
    items: [
      {
        key: 'user-info',
        label: (
          <div className={styles.dropdownGroupLabel}>
            <Avatar
              size={40}
              src={user?.avatar}
              icon={!user?.avatar && <UserOutlined />}
              className={styles.avatar}
            />
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user?.name || 'Hung Thanh'}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'dashboard',
        icon: <LayoutDashboard size={16} />,
        label: 'Dashboard',
        onClick: () => router.push('/dashboard'),
      },
      {
        key: 'profile',
        icon: <User2 size={16} />,
        label: 'Your Profile',
        onClick: () => router.push('/profile'),
      },
      {
        key: 'my-jobs',
        icon: <Briefcase size={16} className={styles.menuIcon} />,
        label: 'My Jobs',
        onClick: () => router.push('/my-jobs'),
      },
      {
        key: 'job-invitation',
        icon: <MailIcon size={16} className={styles.menuIcon} />,
        label: 'Job Invitation',
        onClick: () => router.push('/job-invitation'),
      },
      {
        key: 'settings',
        icon: <Settings size={16} className={styles.menuIcon} />,
        label: 'Settings',
        onClick: () => router.push('/settings'),
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogOut size={16} className={styles.menuIcon} style={{ color: '#ff4d4f' }} />,
        label: <span className={styles.logoutLabel}>Sign Out</span>,
        onClick: () => {
          logout();
          router.push('/');
        },
      },
    ] as ItemType[],
  };
};
