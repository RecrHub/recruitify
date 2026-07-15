"use client";

import { Avatar } from "antd";
import { usePathname, useRouter } from "next/navigation";
import styles from "./NavAction.module.css";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  User,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  Inbox,
} from "lucide-react";

const mockNotifications = [
  {
    id: "1",
    icon: "/images/default-avatar.png",
    title: "New Job Invitation",
    content: "You have been invited to apply for Senior Frontend Developer at TechCorp.",
    date: "2 hours ago",
  },
  {
    id: "2",
    icon: "/images/default-avatar.png",
    title: "Application Update",
    content: "Your application for React Developer has been reviewed.",
    date: "1 day ago",
  },
  {
    id: "3",
    icon: "/images/default-avatar.png",
    title: "Post Approved",
    content: "Your job post has been approved and is now live.",
    date: "3 days ago",
  },
];


  const userMenuItems = [
    { key: "dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard", href: "/dashboard" },
    { key: "profile", icon: <User size={16} />, label: "Profile", href: "/profile" },
    { key: "my-jobs", icon: <Briefcase size={16} />, label: "My Jobs", href: "/my-jobs" },
    { key: "job-invitation", icon: <Mail size={16} />, label: "Job Invitation", href: "/job-invitation" },
    { key: "email-subscriptions", icon: <Inbox size={16} />, label: "Email Subscriptions", href: "/email-subscriptions" },
    { key: "notifications", icon: <Bell size={16} />, label: "Notifications", href: "/notifications" },
    { key: "settings", icon: <Settings size={16} />, label: "Settings", href: "/settings" },
  ];

type Locale = "en" | "vi";

function LanguageSwitcher({
  locale,
  onSwitch,
}: {
  locale: Locale;
  onSwitch: (lang: Locale) => void;
}) {
  return (
    <div className={styles.switchLanguage}>
      <button
        className={`${styles.textButton} ${styles.lang} ${locale === "en" ? styles.active : ""}`}
        onClick={() => onSwitch("en")}
      >
        EN
      </button>
      <div className={styles.divider} />
      <button
        className={`${styles.textButton} ${styles.lang} ${locale === "vi" ? styles.active : ""}`}
        onClick={() => onSwitch("vi")}
      >
        VN
      </button>
    </div>
  );
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
}

/**
 * Notification bell with a click-to-open popup.
 * Reusable on its own: <NotificationBell />
 */
export function NotificationBell({
  notifications = mockNotifications,
}: {
  notifications?: typeof mockNotifications;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <li className={`${styles.navItem} ${styles.popupWrapper}`} ref={ref}>
      <button
        className={styles.iconBtn}
        type="button"
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
      >
        <Bell size={22} />
      </button>
      {open && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>Notifications</div>
          <ul className={styles.notifList}>
            {notifications.map((n) => (
              <li key={n.id} className={styles.notifItem}>
                <Image src={n.icon} alt="" width={40} height={40} className={styles.notifIcon} />
                <div className={styles.notifContent}>
                  <div className={styles.notifTitle}>{n.title}</div>
                  <div className={styles.notifText}>{n.content}</div>
                  <div className={styles.notifDate}>{n.date}</div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/notifications" className={styles.viewAll} onClick={() => setOpen(false)}>
            View all <ChevronRight size={14} />
          </Link>
        </div>
      )}
    </li>
  );
}

/**
 * Avatar button with a user dropdown menu.
 * Reusable on its own: <UserMenu />
 */
export function UserMenu() {
  const router = useRouter();
  const { user, profile, logout } = useUserStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <li className={`${styles.navItem} ${styles.popupWrapper}`} ref={ref}>
      <button
        className={styles.avatarBtn}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar
          size={32}
          src={profile?.avatarUrl}
          icon={!profile?.avatarUrl && <UserOutlined />}
          className={styles.avatar}
        />
        <ChevronDown size={14} className={styles.chevron} />
      </button>
      {open && (
        <div className={styles.popup}>
          <div className={styles.userHeader}>
            <Avatar
              size={40}
              src={profile?.avatarUrl}
              icon={!profile?.avatarUrl && <UserOutlined />}
            />
            <div className={styles.userDetails}>
              <div className={styles.userName}>{profile?.fullName || user?.fullName || "User"}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
          <ul className={styles.menuList}>
            {userMenuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={styles.menuItem}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.menuDivider} />
          <button
            className={styles.signOutBtn}
            onClick={() => {
              setOpen(false);
              logout();
              router.push("/");
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </li>
  );
}

export function MobileActions({ onToggleMenu }: { onToggleMenu?: () => void }) {
  const { isAuthenticated, profile } = useUserStore();

  if (!isAuthenticated) {
    return (
      <Link href="/login" className={styles.link}>
        Sign In
      </Link>
    );
  }

  return (
    <div className={styles.mobileAuthActions}>
      <Link href="/notifications" className={styles.iconBtn} aria-label="Notifications">
        <Bell size={22} />
      </Link>
      <button
        type="button"
        className={styles.avatarBtn}
        onClick={onToggleMenu}
        aria-label="Open menu"
      >
        <Avatar
          size={32}
          src={profile?.avatarUrl}
          icon={!profile?.avatarUrl && <UserOutlined />}
          className={styles.avatar}
        />
      </button>
    </div>
  );
}

export function MobileSidebarExtras() {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "en";
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (lang: Locale) => {
    if (lang === locale) return;
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <div className={styles.sidebarExtras}>
      <ul className={styles.mobileExtraLinks}>
        <li className={styles.navItem}>
          <Link href="/post-job" className={styles.link}>
            For Employers
          </Link>
        </li>
        <li className={styles.navItem}>
          <LanguageSwitcher locale={locale} onSwitch={switchLang} />
        </li>
      </ul>
    </div>
  );
}

export function MobileRightNav() {
  const { user, profile, isAuthenticated, logout } = useUserStore();
  const router = useRouter();

  if (!isAuthenticated) return null;

  return (
    <div className={styles.rightNavContent}>
      <div className={styles.rightNavUserHeader}>
        <Avatar
          size={40}
          src={profile?.avatarUrl}
          icon={!profile?.avatarUrl && <UserOutlined />}
        />
        <div className={styles.rightNavUserDetails}>
          <p className={styles.rightNavUserName}>
            {profile?.fullName || user?.fullName || "User"}
          </p>
          <p className={styles.rightNavUserEmail}>{user?.email}</p>
        </div>
      </div>
      <ul className={styles.rightNavMenuList}>
        {userMenuItems.map((item) => (
          <li key={item.key}>
            <Link href={item.href} className={styles.rightNavMenuItem}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            className={styles.rightNavSignOut}
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default function Actions({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "en";

  const switchLang = (lang: Locale) => {
    if (lang === locale) return;
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <ul className={`${styles.navbarNav} ${className ?? ""}`}>
      <li className={styles.navItem}>
        <Link href="/post-job" className={styles.link}>
          For Employers
        </Link>
      </li>

      {isAuthenticated ? (
        <>
          <NotificationBell />
          <UserMenu />
        </>
      ) : (
        <li className={styles.navItem}>
          <Link href="/login" className={styles.link}>
            Sign In / Sign Up
          </Link>
        </li>
      )}

      <li className={styles.navItem}>
        <LanguageSwitcher locale={locale} onSwitch={switchLang} />
      </li>
    </ul>
  );
}
