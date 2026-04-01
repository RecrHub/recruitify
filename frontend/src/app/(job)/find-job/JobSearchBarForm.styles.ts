import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
    container: css`
    /* Container wrapper */
  `,

    heroBanner: css`
    background-image: url(/layoutfindjob.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 24px 32px;
    height: 174px;
    border-radius: 8px;
    color: white;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  `,

    heroOverlay: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(16, 185, 129, 0.1);
    border-radius: 8px;
    z-index: 0;
  `,

    heroContent: css`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
  `,

    heroTitle: css`
    color: #FFF;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.3;
    margin: 0;
    text-align: left;
  `,

    heroDescription: css`
    color: rgba(255, 255, 255, 0.80);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5;
    margin: 0;
    max-width: 90%;
    text-align: left;
  `,

    searchWrapper: css`
    display: flex;
    gap: 12px;
    color: #F5F5F5;
    align-items: center;

    @media (max-width: 640px) {
      flex-direction: column;
      gap: 8px;
    }
  `,

    searchInput: css`
    height: 48px;
    border-radius: 8px;
    flex: 1;

    & . ant-input {
      font-size: 14px;
    }

    & .ant-input::placeholder {
      color: #9ca3af;
    }

    &:hover,
    &:focus,
    &. ant-input-affix-wrapper-focused {
      border-color: #10b981;
    }

    @media (max-width: 640px) {
      width: 100%;
    }
  `,

    searchButton: css`
    display: flex;
    width: 113px;
    height: 48px;
    padding: 16px 32px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    background: #489B79;

    &:hover {
      background-color: #059669 !important;
    }

    &:active {
      transform: translateY(0);
    }

    @media (max-width: 640px) {
      width: 100%;
    }
  `,
}));