import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => {
  return {
    root: css`
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    `,

    loggedIn: css`
      gap: 24px;
      width: 100%;
    `,

    login: css`
      display: flex;
      width: 109px;
      height: 40px;
      padding: 1px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 6px;
      border: 1px solid #000;
      background: #fff;
      color: #000;
      font-weight: 500;

      &:hover {
        background: rgba(0, 0, 0, 0.04) !important;
        color: #000 !important;
        border-color: #000 !important;
      }

      &:focus,
      &:active {
        box-shadow: none !important;
        border-color: #000 !important;
      }
    `,

    post: css`
      display: flex;
      width: 109px;
      height: 40px;
      padding: 1px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 6px;
      border: 1px solid #000;
      background: #000;
      color: #fff;
      font-weight: 500;

      &:hover {
        background: #111111 !important;
        border-color: #000 !important;
        color: #fff !important;
      }

      &:focus,
      &:active {
        box-shadow: none !important;
        border-color: #000 !important;
      }
    `,

    navLinks: css`
      display: flex;
      align-items: center;
      gap: 8px;
    `,

    navLink: css`
      color: #000;
      font-weight: 500;
      padding: 8px 16px;
      height: auto;
      border: none;
      background: transparent;

      &:hover {
        color: ${token.colorPrimary} !important;
        background: rgba(0, 0, 0, 0.04) !important;
      }

      &:focus,
      &:active {
        box-shadow: none !important;
      }
    `,

    rightActions: css`
    display: flex;
    padding: 3px 25.967px 3px 0;
    align-items: center;
    gap: 20px;
    `,
    employerLink: css`
    display: flex;
    height: 20px;
    padding-right: 11.033px;
    align-items: center;
    margin-top: 4px;
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

  &:hover {
    text-decoration: underline; 
    color: ${token.colorPrimary}; 
  }
`,

    avatar: css`
      width: 32px;
      height: 32px;
      // background: ${token.colorPrimary};
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid #f0f0f0;

      &:hover {
        border-color: ${token.colorPrimary};
      }
    `,

    // Dropdown styles
    userHeader: css`
    display: flex;
    background: #f7f7f7;
    align-items: center;
    gap: 12px;
    padding: 12px 0 13px 12px;
    border-bottom: 1px solid #dee2e6;
    border-radius: 8px 8px 0 0;
    margin-bottom: 8px;
  `,
  userHeaderAvatar: css`
    flex-shrink: 0;
  `,
  userHeaderInfo: css`
    flex: 1;
    min-width: 0;
  `,
  userName: css`
    font-size: 16px;
    font-weight: 600;
    color: #000;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  userEmail: css`
    font-size: 13px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  menuItem: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f5f5f5;
    }
  `,
  menuItemIcon: css`
    font-size: 18px;
  `,
  menuDivider: css`
    margin: 8px 0;
    background: #f0f0f0;
  `,
  logoutItem: css`
    color: #ff4d4f;

    &:hover {
      background: #fff1f0;
    }
  `,
  logoutItemIcon: css`
    color: #ff4d4f;
  `,
  };
});

export const useUserDropdownStyles = createStyles(({ css, token }) => {
  return {
    dropdownGroupLabel: css`
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
    `,
    avatar: css`
      width: 40px;
      height: 40px;
    `,
    userDetails: css`
      flex: 1;
    `,
    userName: css`
      font-weight: 600;
    `,
    userEmail: css`
      color: #666;
      font-size: 14px;
    `,
    menuIcon: css`
      font-size: 16px;
    `,
    logoutLabel: css`
      color: #ff4d4f;
    `,
  };
});