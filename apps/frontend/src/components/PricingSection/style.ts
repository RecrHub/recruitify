import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, responsive }) => ({
  pricingWrapper: css`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding-block: 96px;
    padding-inline: 24px;

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
    width: 100%;
    max-width: 1120px;
    padding: 96px 24px;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
  `,

  content: css`
    display: flex;
    padding: 96px;
    flex-direction: column;
    align-items: center;
    gap: 96px;
    align-self: stretch;
    border-radius: 32px;
    border: 1px solid #c8c8c8;
    background: #fff;
  `,

  header: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100%;
  `,

  heading: css`
    display: flex;
    max-width: 560px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,

  headingContent: css`
    width: 100%;
    max-width: 646px;
    color: #0f0f0f;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    line-height: 44px;
  `,

  description: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  descriptionJoin: css`
    max-width: 472px;
    color: #4f4945;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,

  descriptionGet: css`
    max-width: 180px;
    color: #4f4945;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,

  ButtonSecondary: css`
    display: flex;
    padding: 10px 22px;
    justify-content: center;
    align-items: center;
  `,

  LogoWrap: css`
    display: flex;
    padding: 16px;
    align-items: center;
    border-radius: 16px;
    background: #00aa6c;
  `,

  BackgroundIcon: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    bottom: 0;
  `,

  BackgroundSVG: css`
    flex-shrink: 0;
    opacity: 1;
  `,

  LineLeftEnd: css`
    width: 899px;
    height: 524px;
    stroke-width: 1px;
    stroke: #d2ccc9;
    opacity: 1;
  `,

  LineRightEnd: css`
    width: 406px;
    height: 150px;
    stroke-width: 1px;
    stroke: #d2ccc9;
    opacity: 1;
  `,
}));