"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useUserStore } from "@/stores/useUserStore";

import styles from "./EmployerMobileActions.module.css";

export interface EmployerMobileActionsProps {
  /** Open the right drawer (profile menu). Provided by the Header shell. */
  toggleRightNav?: () => void;
}

/**
 * Top-bar mobile actions for the Employer area.
 * Renders the primary "Post Job" CTA plus the user avatar.
 * Clicking the avatar opens the RIGHT drawer (profile menu, itviec-style).
 */
export default function EmployerMobileActions(
  props: EmployerMobileActionsProps,
): React.ReactElement {
  const { toggleRightNav } = props;
  const { profile, user } = useUserStore();
  const displayName = profile?.fullName || user?.fullName || "User";

  return (
    <div className={styles.actions}>
      <Link href="/employer/jobs/new" className={styles.postJob}>
        <span>Post Job</span>
      </Link>

      <button
        type="button"
        className={styles.avatarBtn}
        onClick={toggleRightNav}
        aria-label={`Open ${displayName}'s menu`}
        title={displayName}
      >
        <Avatar
          size={32}
          src={profile?.avatarUrl}
          icon={!profile?.avatarUrl && <UserOutlined />}
        />
      </button>
    </div>
  );
}
