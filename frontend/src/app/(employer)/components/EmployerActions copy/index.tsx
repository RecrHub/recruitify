'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  Search,
  Plus,
  Calendar,
  Mail,
  Inbox,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import styles from './EmployerActions.module.css';

export default function EmployerActions() {
  const router = useRouter();
  const { user, profile, logout } = useUserStore();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const onSearch = (value: string) => {
    const q = value.trim();
    if (!q) return;
    router.push(`/employer/jobs?q=${encodeURIComponent(q)}`);
  };

  const displayName = profile?.fullName ?? user?.fullName ?? 'Guest User';
  const displayEmail = user?.email ?? 'guest@example.com';

  return (
    <ul className={styles.actions}>
      <li className={styles.item}>
        <Input
          placeholder="Search here..."
          prefix={<Search size={16} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={(e) => onSearch((e.target as HTMLInputElement).value)}
          allowClear
          className={styles.search}
        />
      </li>

      <li className={styles.item}>
        <Button
          className={styles.buttonItem}
          type="primary"
          href="/employer/jobs/new"
        >
          Post a Job
        </Button>
      </li>

      <li className={styles.divider} aria-hidden="true" />

      <li className={styles.item}>
        <Link
          href="/employer/interviews"
          className={styles.iconBtn}
          aria-label="Interviews"
        >
          <Calendar size={20} />
        </Link>
      </li>

      <li className={styles.item}>
        <Link
          href="/employer/messages"
          className={styles.iconBtn}
          aria-label="Messages"
        >
          <Mail size={20} />
        </Link>
      </li>

      {/* 6. Inbox - Applications */}
      <li className={styles.item}>
        <Link
          href="/employer/applications"
          className={styles.iconBtn}
          aria-label="Applications"
        >
          <Inbox size={20} />
        </Link>
      </li>

      <li className={`${styles.item} ${styles.profileWrap}`} ref={menuRef}>
        <button
          type="button"
          className={styles.profileBtn}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="User menu"
        >
          <Avatar
            size={32}
            src={profile?.avatarUrl}
            icon={!profile?.avatarUrl && <UserOutlined />}
          />
        </button>

        {menuOpen && (
          <div className={styles.dropdown}>
            <div className={styles.userInfo}>
              <Avatar
                size={40}
                src={profile?.avatarUrl}
                icon={!profile?.avatarUrl && <UserOutlined />}
              />
              <div>
                <div className={styles.userName}>{displayName}</div>
                <div className={styles.userEmail}>{displayEmail}</div>
              </div>
            </div>

            <Link
              href="/employer/profile"
              className={styles.menuItem}
              onClick={() => setMenuOpen(false)}
            >
              <User size={16} />
              <span>Profile</span>
            </Link>
            <Link
              href="/employer/settings"
              className={styles.menuItem}
              onClick={() => setMenuOpen(false)}
            >
              <Settings size={16} />
              <span>Settings</span>
            </Link>

            <div className={styles.menuDivider} />

            <button
              type="button"
              className={styles.signOut}
              onClick={() => {
                setMenuOpen(false);
                logout();
                router.push('/');
              }}
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </li>
    </ul>
  );
}
