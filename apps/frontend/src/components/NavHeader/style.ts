import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, responsive, token }) => ({
  left: css`
    z-index: 10;
  `,
  right: css`
    z-index: 10;

    &-aside {
      display: flex;
      align-items: center;

      ${responsive.mobile} {
        justify-content: center;

        margin-block: 8px;
        margin-inline: 16px;
        padding-block-start: 24px;

        border-block-start: 1px solid ${token.colorBorder};
      }
    }
  `,
  root: css`
  width: 100vw !important;
  margin-left: calc(50% - 50vw) !important;
  margin-right: calc(50% - 50vw) !important;

  height: 80px;
  padding: 0 30px;
  background-color: ${rgba(token.colorBgLayout, 0.4)};
  border-bottom: var(--stroke-weight-1, 1px) solid #D9D9D9;
  ${responsive.mobile} {
    padding: 0 12px;
  `,
}));
