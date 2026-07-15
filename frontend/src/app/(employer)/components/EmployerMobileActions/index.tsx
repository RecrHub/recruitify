"use client";

import * as React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useUserStore } from "@/stores/useUserStore";

import styles from "./EmployerMobileActions.module.css";

export interface EmployerMobileActionsProps {
  /** Open the right drawer (profile menu). Provided by the Header shell. */
  toggleRightNav?: () => void;
}

export default function EmployerMobileActions(
  props: EmployerMobileActionsProps,
): React.ReactElement {
  const { toggleRightNav } = props;
  const { profile, user } = useUserStore();
  const displayName = profile?.fullName || user?.fullName || "User";

  return (
    <div className={styles.actions}>
      <Button
        className={styles.buttonItem}
        type="primary"
        href="/employer/jobs/new"
      >
        Post a Job
      </Button>

      <button
        type="button"
        className={styles.avatarBtn}
        onClick={toggleRightNav}
        aria-label={`Open ${displayName}'s menu`}
        title={displayName}
      >
        <Avatar
          size={35}
          src={profile?.avatarUrl}
          icon={!profile?.avatarUrl && <UserOutlined />}
        />
      </button>
    </div>
  );
}
