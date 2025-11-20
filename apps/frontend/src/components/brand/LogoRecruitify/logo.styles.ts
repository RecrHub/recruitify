import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token }) => {
  return {
    logo: css`
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
      height: 48px;

      svg {
        display: block;
        flex: 0 0 auto;
      }
    `,
    logoText: css`
      color: #000;
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 100% */
      text-transform: capitalize;
      height: 17.5px;
    `,

    "@media (max-width: 480px)": {
      logo: css`
        gap: 8px;
      `,
      logoText: css`
        font-size: 16px;
      `,
    },
  };
});
