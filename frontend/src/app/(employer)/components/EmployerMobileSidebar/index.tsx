"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  Bell,
  Briefcase,
  Calendar,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  User,
} from "lucide-react";

import { useUserStore } from "@/stores/useUserStore";

import styles from "./EmployerMobileSidebar.module.css";

export interface EmployerMobileSidebarProps {
  /** Called after the user activates an internal link so the drawer dismisses. */
  onClose?: () => void;
}

type MenuLink = {
  key: string;
  icon: React.ReactNode;
  label: string;
  href: string;
};

type MenuItem = MenuLink | { key: string; icon: React.ReactNode; label: string; onClick: () => void };

function isLink(item: MenuItem): item is MenuLink {
  return "href" in item;
}

export default function EmployerMobileSidebar({
  onClose,
}: EmployerMobileSidebarProps) {
  const router = useRouter();
  const { user, profile, logout } = useUserStore();

  const dismiss = () => onClose?.();

  const handleSignOut = () => {
    logout();
    router.push("/");
    dismiss();
  };

  const menuItems: MenuItem[] = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      href: "/employer/dashboard",
    },
    {
      key: "jobs",
      icon: <Briefcase size={18} />,
      label: "My Jobs",
      href: "/employer/jobs",
    },
    {
      key: "applications",
      icon: <Inbox size={18} />,
      label: "Applications",
      href: "/employer/applications",
    },
    {
      key: "interviews",
      icon: <Calendar size={18} />,
      label: "Interviews",
      href: "/employer/interviews",
    },
    {
      key: "messages",
      icon: <Mail size={18} />,
      label: "Messages",
      href: "/employer/messages",
    },
    {
      key: "notifications",
      icon: <Bell size={18} />,
      label: "Notifications",
      href: "/employer/notifications",
    },
    {
      key: "profile",
      icon: <User size={18} />,
      label: "Profile",
      href: "/employer/profile",
    },
    {
      key: "settings",
      icon: <Settings size={18} />,
      label: "Settings",
      href: "/employer/settings",
    },
  ];

  return (
    <ul className={styles.menuList}>
      {/* ===== User card ===== */}
      <li className={styles.userCard}>
        <Avatar
          size={40}
          src={profile?.avatarUrl}
          icon={!profile?.avatarUrl && <UserOutlined />}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <p className={styles.userName}>
            {profile?.fullName || user?.fullName || "User"}
          </p>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>
      </li>

      {/* ===== Menu links ===== */}
      {menuItems.map((item) => (
        <li key={item.key} className={styles.menuItem}>
          {isLink(item) ? (
            <Link
              href={item.href}
              className={styles.menuLink}
              onClick={dismiss}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              <span className={styles.menuLabel}>{item.label}</span>
            </Link>
          ) : (
            <button
              type="button"
              className={styles.menuLink}
              onClick={item.onClick}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              <span className={styles.menuLabel}>{item.label}</span>
            </button>
          )}
        </li>
      ))}

      {/* ===== Sign Out ===== */}
      <li className={styles.menuItem}>
        <button
          type="button"
          className={`${styles.menuLink} ${styles.signOut}`}
          onClick={handleSignOut}
        >
          <span className={styles.menuIcon}>
            <LogOut size={18} />
          </span>
          <span className={styles.menuLabel}>Sign Out</span>
        </button>
      </li>
    </ul>
  );
}
