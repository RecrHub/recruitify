import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => {
  const bookmarkCls = 'bookmark-icon';

  return {
    jobWrapper: css`
      width: 100%;
      padding: 23px;
      height: 271px;
      border-radius: 8px;
      border: 1px solid #CCC;
      background: #FFFFFF;
      box-shadow: 0 12px 48px 0 rgba(0, 44, 109, 0.1);
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: 0.3s;

      &:hover {
        border-color: #838383ff;

        .${bookmarkCls} {
          opacity: 1;
          visibility: visible;
        }
      }
    `,

    companyIcon: css`
      width: 56px;
      height: 56px;
      padding: 16px;
      background: linear-gradient(135deg, #ec4899 0%, #ef4444 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 28px;
      flex-shrink: 0;
    `,

    bookmarkIcon: css`
      position: absolute;
      top: 32px;
      right: 32px;
      cursor: pointer;

      opacity: 0;
      visibility: hidden;
      transition: 0.25s ease;

      svg {
        width: 24px;
        height: 24px;
      }

      &:hover {
        opacity: 0.7;
      }
    `,

    header: css`
      color: #09090b;
      font-size: 20px;
      padding: 19px 0px 20px 0px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px;
      margin: 0;
    `,

    overview: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      color: #aaa;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 30.6px;
      letter-spacing: -0.36px;
    `,
  };
});
