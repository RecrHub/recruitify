"use client";

import { useState } from "react";
import { Layout, theme, Flex, Grid } from "antd";
import EmployerHeader from "@/app/(employer)/components/EmployerHeader";
import { usePathname } from "next/navigation"; 

const { Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const [collapsed, setCollapsed] = useState(isMobile);
  
  const pathname = usePathname();


  const isAuthPage = pathname?.includes("/login"); 
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {!isAuthPage && <EmployerHeader />}
      
      <Flex
        vertical
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
        }}
      >
        <Content
          style={{
            flex: 1,
            padding: isAuthPage ? 0 : token.paddingLG, 
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Flex>
    </Layout>
  );
}