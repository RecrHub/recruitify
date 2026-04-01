declare module 'rtl-detect' {
  export function isRtlLang(lang: string): boolean;
  export function getLangDir(lang: string): 'ltr' | 'rtl';
}
