import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  actions?: ReactNode;
  actionsClassName?: string;
  actionsStyle?: CSSProperties;
  logo?: ReactNode;
  logoClassName?: string;
  logoStyle?: CSSProperties;
  nav?: ReactNode;
  navClassName?: string;
  navStyle?: CSSProperties;
  /** Mobile-specific actions (e.g. simplified sign-in link) */
  mobileActions?: ReactNode;
  /** Extra content rendered at the bottom of the mobile sidebar */
  mobileSidebarContent?: ReactNode;
  ref?: Ref<HTMLElement>;
}
