'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation'; // App Router
import { useStyles } from './actions.styles';

export default function Actions({ className }: { className?: string }) {
  const { styles, cx } = useStyles();
  const router = useRouter();

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
