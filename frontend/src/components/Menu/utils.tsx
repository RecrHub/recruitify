import type { ItemType as AntdItemType } from 'antd/es/menu/interface';
import { LucideIcon } from 'lucide-react';
import React, { isValidElement } from 'react';

import Icon from '@/components/Icon';

import type { ItemType } from './type';

export const mapItems = (item: ItemType): AntdItemType => {
  switch (item?.type) {
    case 'divider': {
      return item;
    }
    case 'group': {
      const { children, ...rest } = item;
      return {
        children: children ? children?.map((i) => mapItems(i)) : undefined,
        ...rest,
      };
    }
    default: {
      const { children, icon, ...rest } = item as unknown as {
        children?: ItemType[];
        icon?: React.ReactElement | LucideIcon;
        [key: string]: unknown;
      };

      const resolvedIcon = (() => {
        if (!icon) return undefined;
        if (isValidElement(icon)) return icon;
        if (typeof icon === 'function') {
          return <Icon icon={icon as LucideIcon} size={'small'} />;
        }
        return undefined;
      })();

      return {
        children: children ? children.map((i: ItemType) => mapItems(i)) : undefined,
        icon: resolvedIcon,
        ...rest,
      } as AntdItemType;
    }
  }
};