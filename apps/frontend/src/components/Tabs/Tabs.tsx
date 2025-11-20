'use client';

import { Tabs as AntdTabs } from 'antd';
import { cva } from 'class-variance-authority';
import { memo, useMemo } from 'react';


import { useStyles } from './style';
import type { TabsProps } from './type';

const Tabs = memo<TabsProps>(({ className, compact, items, ...rest }) => {
  const { styles, cx } = useStyles();
  const hasContent = items?.some((item) => !!item.children);

  const variants = useMemo(
    () =>
      cva(styles.root, {
        defaultVariants: {
          compact: false,
          underlined: true,
          variant: 'point',
        },
        /* eslint-disable sort-keys-fix/sort-keys-fix */
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
        /* eslint-enable sort-keys-fix/sort-keys-fix */
      }),
    [styles],
  );

  return (
    <AntdTabs
      className={cx(variants({ compact, underlined: hasContent }), className)}
      items={items}
      popupClassName={cx(styles.dropdown)}
      tabBarStyle={{ borderBottom: 'none' }}
      {...rest}
    />
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
