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
  /** Mobile-specific actions.
   *  When a render function, receives both `toggleMenu` (left drawer) and
   *  `toggleRightNav` (right drawer) so callers can pick which to open. */
  mobileActions?:
    | ReactNode
    | ((handlers: {
        toggleMenu: () => void;
        toggleRightNav: () => void;
      }) => ReactNode);
  /** Extra content rendered at the bottom of the left mobile sidebar.
   *  Can be a render function receiving close() so links can dismiss the drawer. */
  mobileSidebarContent?: ReactNode | ((close: () => void) => ReactNode);
  /** Content rendered inside the right slide-out nav (user menu).
   *  Can be a render function receiving closeRightNav so links can dismiss the drawer. */
  mobileRightNavContent?: ReactNode | ((closeRightNav: () => void) => ReactNode);
  ref?: Ref<HTMLElement>;
}
