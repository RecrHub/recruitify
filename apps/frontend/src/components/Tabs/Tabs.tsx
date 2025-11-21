'use client';

import { Tabs as AntdTabs } from 'antd';
import { cva } from 'class-variance-authority';
import { MoreHorizontalIcon } from 'lucide-react';
import { memo, useMemo } from 'react';


import { useStyles } from './style';
import type { TabsProps } from './type';

const Tabs = memo<TabsProps>(({ className, compact, variant = 'rounded', items, ...rest }) => {
  const { styles, cx } = useStyles();
  const hasContent = items?.some((item) => !!item.children);

  const variants = useMemo(
    () =>
      cva(styles.root, {
        defaultVariants: {
          compact: false,
          underlined: false,
          variant: 'rounded',
        },
        variants: {
          variant: {
            square: null,
            rounded: styles.rounded,
            point: styles.point,
          },
          compact: {
            false: styles.margin,
            true: styles.compact,
          },
          underlined: {
            false: styles.hideHolder,
            true: null,
          },
        },
      }),
    [styles],
  );

  return (
    <AntdTabs
      className={cx(variants({ compact, underlined: hasContent, variant }), className)}
      items={items}
      popupClassName={cx(styles.dropdown)}
      {...rest}
    />
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
