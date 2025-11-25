'use client';

import { Button, Avatar, Badge } from 'antd';
import { useRouter } from 'next/navigation';
import { useStyles } from './styles';
import { useUserStore } from '@/stores/useUserStore';
import { useUserDropdownMenu } from './data';
import { useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import Bell from '@/access/icons/bell.svg'
import { UserOutlined } from '@ant-design/icons';
import { margin } from 'polished';
import Link from 'next/link';
const notificationMenu = [
  {
    key: '1',
    label: 'You have a new job invitation',
  },
  {
    key: '2',
    label: 'Your post has been approved',
  },
];
export default function Actions({ className }: { className?: string }) {
  const { styles, cx } = useStyles();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useUserStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const menu = useUserDropdownMenu(router, logout, user);
  if (!mounted) {
    return (
      <div className={cx(styles.root, className)}>
        <div style={{ width: '218px', height: '40px' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={cx(styles.root, className)}>
        <Button
          className={styles.login}
          type="text"
          onClick={() => router.push('/login')}
        >
          Login
        </Button>

        <Button
          className={styles.post}
          type="primary"
          onClick={() => router.push('/post-job')}
        >
          Post Job
        </Button>
      </div>
    );
  }

  return (
    <div className={cx(styles.root, styles.loggedIn, className)}>
      {/* Right Side Actions */}
      <div className={styles.rightActions}>
        <Link
          href="/forEmployeee"
          className={styles.employerLink}
        >
          For Employee
        </Link>

        {/* Notification Icon */}
        <Dropdown menu={{ items: notificationMenu }} trigger={['click']} placement="bottomRight">
          <Button
            type="text"
            icon={<Bell style={{ fontSize: '32px', marginTop: '4px' }} />}
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>


        {/* User Avatar with Dropdown */}
        <Dropdown menu={menu} trigger={['click']} placement="bottomRight">
          <Avatar
            size={32}
            // src={user?.avatar}
            icon={<UserOutlined />}
            className={styles.avatar}
          />
        </Dropdown>
      </div>
    </div>
  );
}