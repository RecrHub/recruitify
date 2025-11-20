import { createStyles } from 'antd-style';

export const LOGO_3D = {
  path: '/RecruitifyLogo.svg',
  pkg: '@recruify/public-logo',
  version: '1.2.0',
};

export const useStyles = createStyles(({ css }) => {
  return {
    extraTitle: css`
      font-weight: 300;
      white-space: nowrap;
    `,
  };
});
