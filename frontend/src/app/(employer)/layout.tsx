"use client";

import { Layout, theme, Flex } from "antd";
import EmployerHeader from "./components/EmployerHeader";

const { Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = theme.useToken();

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
        <Content
          style={{
            flex: 1,
            padding: token.paddingLG,
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
