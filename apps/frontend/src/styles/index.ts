import { css, cx } from 'antd-style';

export * from './customTheme';
export { generateCustomStylish as lobeCustomStylish } from './theme/customStylish';
export { generateCustomToken as lobeCustomToken } from './theme/customToken';
export { generateColorNeutralPalette, generateColorPalette } from './theme/generateColorPalette';

export const lobeStaticStylish = {
  blur: cx(css`
    backdrop-filter: saturate(150%) blur(10px);
  `),
};
