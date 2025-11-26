import type { TooltipProps as AntdTooltipProps } from 'antd';
import type { TooltipRef } from 'antd/lib/tooltip';
import type { ReactNode, Ref } from 'react';


export type TooltipProps = Omit<AntdTooltipProps, 'title'> & {
  hotkey?: string;
  ref?: Ref<TooltipRef>;
  title: ReactNode;
};
