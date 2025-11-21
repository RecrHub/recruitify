import React from "react";
import { Button } from "antd";
import { useStyles } from "./actions.styles";

export type ActionsProps = {
  className?: string;
  onLogin?: () => void;
  onPost?: () => void;
};

export default function Actions({ className, onLogin, onPost }: ActionsProps) {
  const { styles, cx } = useStyles();

  return (
    <div className={cx(styles.root, className)}>
      <Button className={styles.login} type="text" onClick={onLogin}>
        Login
      </Button>

      <Button className={styles.post} type="primary" onClick={onPost}>
        Post Job
      </Button>
    </div>
  );
}
