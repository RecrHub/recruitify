import type { DropdownProps as AntdDropdownProps } from 'antd';

import type { IconContentConfig } from '@/components/Icon';
import type { MenuProps } from '@/components/Menu';

export interface DropdownProps extends Omit<AntdDropdownProps, 'menu'> {
  iconProps?: IconContentConfig;
  menu: MenuProps;
}

export type { MenuItemType as DropdownMenuItemType } from '@/components/Menu';
