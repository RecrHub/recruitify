import { RouteVariants } from '@/utils/routeVariants.base';

import { type DynamicLayoutProps } from '@/types/next';

export {
  DEFAULT_LANG,
  DEFAULT_VARIANTS,
  type IRouteVariants,
  LOBE_LOCALE_COOKIE,
  LOBE_THEME_APPEARANCE,
  type Locales,
  locales,
} from '@/utils/routeVariants.base';

class NextRouteVariants extends RouteVariants {
  static getVariantsFromProps = async (props: DynamicLayoutProps) => {
    const { variants } = await props.params;
    return super.deserializeVariants(variants as string);
  };
  static getIsMobile = async (props: DynamicLayoutProps) => {
    const { variants } = await props.params;
    const { isMobile } = super.deserializeVariants(variants as string);
    return isMobile;
  };
  static getLocale = async (props: DynamicLayoutProps) => {
    const { variants } = await props.params;
    const { locale } = super.deserializeVariants(variants as string);
    return locale;
  };
}

export { NextRouteVariants as RouteVariants };
