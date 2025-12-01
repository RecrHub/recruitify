import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  (
    { css, responsive, token },
    { isEmpty, contentMaxWidth }: { contentMaxWidth: number; isEmpty: boolean },
  ) => {
    return {
      root: css`
        grid-area: footer;
        align-self: stretch;
        color: ${token.colorTextDescription};
        border-top: 1px solid #e5e7eb;
        background: #ffffffff;

        ${responsive.mobile} {
          flex-direction: column;
        }
      `,

      footer: css`
        width: 100%;
        font-size: 14px;
        line-height: 1.5;
        color: ${token.colorTextSecondary};
        background-color: #ffffffff;
      `,

      footerContainer: css`
        width: 100%;
        max-width: 1380px;
        margin: 0 auto;
        padding: ${isEmpty ? '0' : '60px 80px 24px'};

        ${responsive.mobile} {
          padding: ${isEmpty ? '0' : '40px 20px 20px'};
        }
      `,

      footerColumns: css`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 40px;
        padding-bottom: 60px;

        ${responsive.tablet} {
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        ${responsive.mobile} {
          grid-template-columns: 1fr;
          gap: 24px;
          padding-bottom: 40px;
        }
      `,

      footerColumn: css`
        display: flex;
        flex-direction: column;
        gap: 12px;
        text-align: start;

        h2 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 8px 0;
        }

        ${responsive.mobile} {
          text-align: center;
        }
      `,

      footerItem: css`
        margin: 12px 0;

        a, span {
          font-size: 14px;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.3s;

          &:hover {
            color: #141414ff;
          }
        }
      `,

      socialIcons: css`
        display: flex;
        gap: 12px;
        margin-top: 4px;

        ${responsive.mobile} {
          justify-content: center;
        }
      `,

      socialIcon: css`
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #111827;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #1e1e1eff;
          transform: translateY(-2px);
        }
      `,

      footerBottom: css`
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 40px;
        border-top: 1px solid #e5e7eb;
        gap: 24px;

        ${responsive.mobile} {
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 24px;
        }
      `,

      brandSection: css`
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 300px;

        ${responsive.mobile} {
          align-items: center;
          max-width: 100%;
        }
      `,

      brandLogo: css`
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 20px;
        font-weight: 600;
        color: #111827;
      `,



      brandDescription: css`
        font-size: 13px;
        color: #6b7280;
        line-height: 1.6;
        margin: 0;
      `,

      copyright: css`
        font-size: 13px;
        color: #9ca3af;
        white-space: nowrap;
        align-self: center;

        ${responsive.mobile} {
          margin-top: 16px;
        }
      `,
    };
  },
);