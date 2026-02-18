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
  FileText,
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

export function MobileActions() {
  const { isAuthenticated } = useUserStore();
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

  if (!isAuthenticated) {
    return (
      <Link href="/login" className={styles.link}>
        Sign In
      </Link>
    );
  }

  return null;
}

export function MobileSidebarExtras() {
  const { isAuthenticated } = useUserStore();
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
    <ul className={styles.sidebarExtras}>
      <li className={styles.navItem}>
        <Link href="/post-job" className={styles.link}>
          For Employers
        </Link>
      </li>
      <li className={styles.navItem}>
        <LanguageSwitcher locale={locale} onSwitch={switchLang} />
      </li>
    </ul>
  );
}

export default function Actions({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isAuthenticated, logout } = useUserStore();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "en";

  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const notifRef = useRef<HTMLLIElement>(null);
  const avatarRef = useRef<HTMLLIElement>(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(avatarRef, () => setAvatarOpen(false));

  const switchLang = (lang: Locale) => {
    if (lang === locale) return;
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  if (!isAuthenticated) {
    return (
      <ul className={`${styles.navbarNav}`}>
        <li className={styles.navItem}>
          <Link href="/post-job" className={styles.link}>
            For Employers
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/login" className={styles.link}>
            Sign In / Sign Up
          </Link>
        </li>
        <li className={styles.navItem}>
          <LanguageSwitcher locale={locale} onSwitch={switchLang} />
        </li>
        <li></li>
      </ul>
    );
  }
  return (
    <ul className={`${styles.navbarNav}`}>
      <li className={styles.navItem}>
        <Link href="/post-job" className={styles.link}>
          For Employers
        </Link>
      </li>

      <li className={`${styles.navItem} ${styles.popupWrapper}`} ref={notifRef}>
        <button
          className={styles.iconBtn}
          type="button"
          aria-label="Notifications"
          onClick={() => {
            setNotifOpen((v) => !v);
            setAvatarOpen(false);
          }}
        >
          <Bell size={22} />
        </button>
        {notifOpen && (
          <div className={styles.popup}>
            <div className={styles.popupHeader}>Notifications</div>
            <ul className={styles.notifList}>
              {mockNotifications.map((n) => (
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
            <Link href="/notifications" className={styles.viewAll} onClick={() => setNotifOpen(false)}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </li>

      <li className={`${styles.navItem} ${styles.popupWrapper}`} ref={avatarRef}>
        <button
          className={styles.avatarBtn}
          type="button"
          onClick={() => {
            setAvatarOpen((v) => !v);
            setNotifOpen(false);
          }}
        >
          <Avatar
            size={32}
            src={profile?.avatarUrl}
            icon={!profile?.avatarUrl && <UserOutlined />}
            className={styles.avatar}
          />
          <ChevronDown size={14} className={styles.chevron} />
        </button>
        {avatarOpen && (
          <div className={styles.popup}>
            <div className={styles.userHeader}>
              <Avatar
                size={40}
                src={profile?.avatarUrl}
                icon={!profile?.avatarUrl && <UserOutlined />}
              />
              <div className={styles.userDetails}>
                <div className={styles.userName}>{profile?.fullName || user?.username || "User"}</div>
                <div className={styles.userEmail}>{user?.email}</div>
              </div>
            </div>
            <ul className={styles.menuList}>
              {userMenuItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={styles.menuItem}
                    onClick={() => setAvatarOpen(false)}
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
                setAvatarOpen(false);
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

      <li className={styles.navItem}>
        <LanguageSwitcher locale={locale} onSwitch={switchLang} />
      </li>
    </ul>
  );
}
