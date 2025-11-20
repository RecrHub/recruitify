import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => {
  return {
    root: css`
      display: flex;
      align-items: center;
      gap: 20px;
    `,
    // nút Login (outline)
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
      border: var(--stroke-weight-1, 1px) solid #000;
      background: #fff;

      &:hover {
        background: rgba(0, 0, 0, 0.04) !important;
      }

      &:focus,
      &:active {
        box-shadow: none !important;
      }
    `,
    // nút Post Job (filled)
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
      border: var(--stroke-weight-1, 1px) solid #000;

      background: #000;

      &:hover {
        background: #111111 !important;
      }

      &:focus,
      &:active {
        box-shadow: none !important;
      }
    `,

    // responsive nhỏ (tùy chỉnh nếu cần)
    "@media (max-width: 768px)": {
      root: css`
        gap: 12px;
      `,
      login: css`
        padding: 12px 20px !important;
        font-size: 16px;
        min-width: 120px;
      `,
      post: css`
        padding: 12px 20px !important;
        font-size: 16px;
        min-width: 120px;
      `,
    },
  };
});
