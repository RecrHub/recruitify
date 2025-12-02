'use client';

import { ReactNode } from "react";
import StyleRegistry from "@/layout/GlobalProvider/StyleRegistry";
import AppTheme from "./AppTheme";
import { appEnv } from "@/envs/app";
import AntdV5MonkeyPatch from "./AntdV5MonkeyPatch";

interface GlobalLayoutProps {
  children: ReactNode;
  appearance: string;
  neutralColor?: string;
  primaryColor?: string;
  variants?: string;
}

const GlobalLayout = ({
  children,
  neutralColor,
  primaryColor,
  appearance,
  variants,
}: GlobalLayoutProps) => {
  return (
    <StyleRegistry>
      <AppTheme
        customFontFamily={appEnv.NEXT_PUBLIC_CUSTOM_FONT_FAMILY}
        customFontURL={appEnv.NEXT_PUBLIC_CUSTOM_FONT_URL}
        defaultAppearance={appearance}
        defaultNeutralColor={neutralColor as any}
        defaultPrimaryColor={primaryColor as any}
        globalCDN={appEnv.NEXT_PUBLIC_CDN_USE_GLOBAL}
      >
        {children}
      </AppTheme>
      <AntdV5MonkeyPatch />
    </StyleRegistry>
  );
}

export default GlobalLayout;