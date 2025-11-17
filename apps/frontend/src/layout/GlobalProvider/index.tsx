import { ReactNode } from "react";
import StyleRegistry from "@/layout/GlobalProvider/StyleRegistry";
import AppTheme from "./AppTheme";
import { appEnv } from "@/envs/app";
import AntdV5MonkeyPatch from "./AntdV5MonkeyPatch";
interface GlobalLayoutProps {
  children: ReactNode; // nội dung chính của layout
  appearance: string;
  // locale: string; // ngôn ngữ có thể update về sau anh / việt
  neutralColor?: string;  //theme màu
  primaryColor?: string; // màu chính
  variants?: string; // phân nhánh a/b testing hoặc segment
}
const GlobalLayout = async ({
  children,
  neutralColor,
  primaryColor,
  appearance,
  variants,
}: GlobalLayoutProps) => {
  return(
  <StyleRegistry>
    <AppTheme
      customFontFamily={appEnv.CUSTOM_FONT_FAMILY}
      customFontURL={appEnv.CUSTOM_FONT_URL}
      defaultAppearance={appearance}
      defaultNeutralColor={neutralColor as any}
      defaultPrimaryColor={primaryColor as any}
      globalCDN={appEnv.CDN_USE_GLOBAL}
    >
      {children}
    </AppTheme>
    <AntdV5MonkeyPatch />
  </StyleRegistry>
  );
}

export default GlobalLayout;