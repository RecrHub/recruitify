import 'antd-style';

import { RecrCustomStylish } from './customStylish';
import { RecrCustomToken } from './customToken';

declare module 'antd-style' {
  export interface CustomToken extends RecrCustomToken {} // eslint-disable-line @typescript-eslint/no-empty-object-type
  export interface CustomStylish extends RecrCustomStylish {} // eslint-disable-line @typescript-eslint/no-empty-object-type
}

declare module 'rtl-detect' {
  export function isRtlLang(lang: string): boolean;
}
