"use client";

import { useState } from "react";
import { Layout, theme, Flex, Grid } from "antd";
import { AdminHeader } from "./components/Header";
import EmployerHeader from "./components/EmployerHeader";

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <EmployerHeader />
      <Flex
        vertical
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
        }}
      >
        <AdminHeader onToggleSidebar={() => setCollapsed(!collapsed)} />
        <Content
          style={{
            flex: 1,
            padding: token.paddingLG,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Flex>
    </Layout>
  );
}
