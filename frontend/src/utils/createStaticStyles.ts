import { token2CSSVar } from '@ant-design/cssinjs';
import { css, cx } from 'antd-style';

const cssVarProxy = new Proxy(
  {},
  {
    get: (_target, prop: string) => `var(${token2CSSVar(prop, 'ant')})`,
  },
);

type CssVarMap = Record<string, string>;

interface StyleUtils {
  css: typeof css;
  cssVar: CssVarMap;
}

export const createStaticStyles = <T extends Record<string, unknown>>(
  fn: (utils: StyleUtils) => T,
): { [K in keyof T]: string } => {
  const raw = fn({ css, cssVar: cssVarProxy as CssVarMap });
  const result = {} as Record<string, string>;

  for (const key of Object.keys(raw) as Array<keyof T>) {
    const value = raw[key];
    result[key as string] =
      typeof value === 'string' ? value : cx(value as any);
  }

  return result as { [K in keyof T]: string };
};