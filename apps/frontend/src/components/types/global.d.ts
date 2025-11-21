import 'antd-style';

import { RecrCustomStylish } from './customStylish';
import { RecrCustomToken } from './customToken';

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends RecrCustomToken {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomStylish extends RecrCustomStylish {}
}
