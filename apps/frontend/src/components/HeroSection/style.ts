import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, token, responsive }) => ({
  heroWrapper: css`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding-block: 160px;
    padding-inline: 24px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    ${responsive.tablet} {
      padding-block: 120px;
      max-width: 960px;
    }

    ${responsive.mobile} {
      padding-block: 80px;
      padding-inline: 16px;
    }
  `,

  container: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    width: 100%;

    h1 {
      font-size: 96px;
      font-weight: 400;
      max-width: 1079px;
      line-height: 120px;
      color: ${token.colorTextHeading};
      margin: 0;
      white-space: normal;

      ${responsive.tablet} {
        font-size: 64px;
        line-height: 80px;
      }

      ${responsive.mobile} {
        font-size: 36px;
        line-height: 48px;
      }
    }

    p {
      font-size: 20px;
      line-height: 32px;
      margin: 0;
      color: ${token.colorTextSecondary};

      ${responsive.mobile} {
        font-size: 16px;
        line-height: 26px;
      }
    }
  `,

  searchWrapper: css`
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border-radius: 6px;
    padding: 12px;
    max-width: 768px;
    border: 1px solid #e4e5e8;
    background: #fff;
    box-shadow: 0 12px 40px 0 rgba(0, 44, 109, 0.04);

    ${responsive.mobile} {
      flex-direction: column;
      padding: 16px;
    }
  `,

  searchBox: css`
    display: flex;
    justify-content: center;
    align-items: center;

    ${responsive.mobile} {
      flex-direction: column;
    }
  `,

  input: css`
    padding: 0;
    height: 25px;
    color: #9199a3;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    .ant-input {
      background: transparent;

      &::placeholder {
        color: #8c8c8c;
      }

      &:focus {
        box-shadow: none;
      }
    }

    .ant-input-prefix {
      font-size: 16px;
      color: #8c8c8c;
    }
  `,

  divider: css`
    width: 1px;
    height: 40px;
    background: #e4e5e8;
    flex-shrink: 0;

    ${responsive.mobile} {
      width: 100%;
      height: 1px;
    }
  `,

  button: css`
    height: 56px;
    padding: 16px 40px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    text-transform: capitalize;
    border-radius: 6px;
    background: #212121;
    border-color: #000000ff;
    flex-shrink: 0;

    &:hover {
      background: #1f2132 !important;
      border-color: #1f2132 !important;
    }

    ${responsive.mobile} {
      width: 100%;
    }
  `,

  inputWrapper: css`
    display: flex;
    height: 56px;
    padding: 16px 70px 16px 18px;
    align-items: flex-start;
    gap: 12px;

    ${responsive.mobile} {
      width: 100%;
    }
  `,

  suggestions: css`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 80px;

    .label {
      color: #9ca3af;
    }

    .keyword {
      color: #10b981;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .normal {
      color: ${token.colorText};
    }
  `,

  statsGrid: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
    margin-top: 40px;

    ${responsive.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }

    ${responsive.mobile} {
      grid-template-columns: 1fr;
    }
  `,

  statCard: css`
    border-radius: 6px;
    border: 1px solid #e4e5e8;

    background: #fff;
    .ant-card-body {
      display: flex;
      padding: 20px;
      align-items: center;
      gap: 20px;
    }
  `,

  iconBox: css`
    display: flex;
    padding: 16px;
    align-items: flex-start;
    gap: 10px;

    &.default {
      border-radius: 4px;
      background: #fff;
    }

    &.green {
      background: #059669;
      color: white;
      border-radius: 4px;
    }

    svg {
      width: 40px;
      height: 40px;
    }
  `,

  statContent: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    .number {
      color: var(--Gray-900, #18191c);
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px; /* 133.333% */ s
    }

    .label {
      color: var(--Gray-500, #767F8C);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
  `,
}));