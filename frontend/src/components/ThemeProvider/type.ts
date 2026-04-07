import type {
  ThemeProviderProps as AntdThemeProviderProps,
  CustomStylishParams,
  CustomTokenParams,
} from 'antd-style';
import type { CSSProperties } from 'react';

import type { NeutralColors, PrimaryColors } from '@/styles';

export interface ThemeProviderProps extends AntdThemeProviderProps<Record<string, unknown>> {
  className?: string;
  customFonts?: string[];
  customStylish?: (theme: CustomStylishParams) => Record<string, unknown>;
  customTheme?: {
    neutralColor?: NeutralColors;
    primaryColor?: PrimaryColors;
  };
  customToken?: (theme: CustomTokenParams) => Record<string, unknown>;
  enableCustomFonts?: boolean;
  enableGlobalStyle?: boolean;
  style?: CSSProperties;
}

export interface MetaProps {
  description?: string;
  title?: string;
  withManifest?: boolean;
}
