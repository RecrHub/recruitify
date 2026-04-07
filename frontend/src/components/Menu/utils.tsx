import type { ItemType as AntdItemType } from 'antd/es/menu/interface';
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
      const { children, icon, ...rest } = item as { children?: ItemType[]; icon?: React.ReactNode | React.ComponentType; [key: string]: unknown };
      return {
        children: children ? children?.map((i: ItemType) => mapItems(i)) : undefined,
        icon: icon ? isValidElement(icon) ? icon : <Icon icon={icon} size={'small'} /> : undefined,
        ...rest,
      };
    }
  }
};
