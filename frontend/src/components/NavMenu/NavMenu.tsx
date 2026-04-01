'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import styles from './NavMenu.module.css';

export interface NavMenuItem {
  key: string;
  label: string;
  href?: string;
}

const publicItems: NavMenuItem[] = [
  { key: '/find-job', label: 'Find Job' },
  { key: '/features', label: 'Features' },
  { key: '/pricing', label: 'Pricing' },
];

const authItems: NavMenuItem[] = [
  { key: '/home', label: 'Favourite Jobs' },
  { key: '/jobs', label: 'Applied Jobs' },
  { key: '/companies', label: 'Job History' },
];

export interface NavMenuProps {
  items?: NavMenuItem[];
  className?: string;
}

export default function NavMenu({ items, className }: NavMenuProps) {
  const { isAuthenticated } = useUserStore();
  const menuItems = items ?? (isAuthenticated ? authItems : publicItems);
  const pathname = usePathname();

  return (
    <ul className={`${styles.navbarNav} ${className || ''}`.trim()}>
      {menuItems.map((item) => {
        const href = item.href || item.key;
        const isActive = pathname === href || pathname.startsWith(href + '/');

        return (
          <li key={item.key} className={styles.navItem}>
            <Link
              href={href}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
