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
  /** Mobile-specific actions. Can be a render function receiving toggleRightNav. */
  mobileActions?: ReactNode | ((toggleRightNav: () => void) => ReactNode);
  /** Extra content rendered at the bottom of the left mobile sidebar */
  mobileSidebarContent?: ReactNode;
  /** Content rendered inside the right slide-out nav (user menu) */
  mobileRightNavContent?: ReactNode;
  ref?: Ref<HTMLElement>;
}
