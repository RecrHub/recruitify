"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  Bell,
  Calendar,
  ChevronRight,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
} from "lucide-react";

import { useUserStore } from "@/stores/useUserStore";

import styles from "./EmployerMobileSidebar.module.css";

export interface EmployerMobileSidebarProps {
  /** Called after the user activates an internal link so the drawer dismisses. */
  onClose?: () => void;
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


  return (
    <div className={styles.root}>
      <Link
        href="/employer/profile"
        className={styles.userHeader}
        onClick={dismiss}
        aria-label="Open profile"
      >
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            {profile?.fullName || user?.fullName || "User"}
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={styles.signOut}
        onClick={handleSignOut}
      >
        <LogOut size={16} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
