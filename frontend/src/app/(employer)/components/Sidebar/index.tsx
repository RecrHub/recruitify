'use client';

import { Menu, Layout, theme, Flex, Grid, Drawer, Button, Avatar, Dropdown, Typography } from 'antd';
import { useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Home,
  PanelLeft,
  FileText,
  Users,
  Calendar,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import type { MenuProps } from 'antd';
import './sidebar.css';

const { Sider } = Layout;
const { Text } = Typography;

interface MenuItem {
  key: string;
  label: string;
  icon: LucideIcon;
  path: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: Home, path: '/employer' },
  { key: 'jobs', label: 'Tin tuyển dụng', icon: FileText, path: '/employer/jobs' },
  { key: 'candidates', label: 'Ứng viên', icon: Users, path: '/employer/candidates' },
  { key: 'interviews', label: 'Phỏng vấn', icon: Calendar, path: '/employer/interviews' },
  { key: 'settings', label: 'Cài đặt', icon: Settings, path: '/employer/settings' },
];

function buildAntdItems(items: MenuItem[], iconSize: number): NonNullable<MenuProps['items']> {
  return items.map((item) => ({
    key: item.key,
    label: item.label,
    icon: <item.icon size={iconSize} />,
    children: item.children ? buildAntdItems(item.children, iconSize) : undefined,
  }));
}

function findKeyByPath(items: MenuItem[], pathname: string): string | undefined {
  for (const item of items) {
    if (item.path === pathname) return item.key;
    if (item.children) {
      const found = findKeyByPath(item.children, pathname);
      if (found) return found;
    }
  }
  return undefined;
}

function findPathByKey(items: MenuItem[], key: string): string | undefined {
  for (const item of items) {
    if (item.key === key) return item.path;
    if (item.children) {
      const found = findPathByKey(item.children, key);
      if (found) return found;
    }
  }
  return undefined;
}

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;

  const selectedKey = useMemo(() => findKeyByPath(menuItems, pathname) ?? 'dashboard', [pathname]);
  const antdItems = useMemo(() => buildAntdItems(menuItems, token.size), [token.size]);

  const handleMenuClick = ({ key }: { key: string }) => {
    const path = findPathByKey(menuItems, key);
    if (path) {
      router.push(path);
      if (isMobile) onCollapsedChange(true);
    }
  };

  const brandExpanded = (
    <Flex
      align="center"
      gap={token.marginSM}
      style={{
        paddingInline: token.paddingXS,
        minHeight: 40,
      }}
    >
      <div className="sidebar-brand-logo">R</div>
      <div className="sidebar-brand-text">Recruitify HR</div>
      <Button
        type="text"
        size="small"
        onClick={() => onCollapsedChange(true)}
        icon={<PanelLeft size={token.size} />}
        aria-label="Collapse sidebar"
        style={{ flexShrink: 0, marginLeft: 'auto' }}
      />
    </Flex>
  );

  const brandCollapsed = (
    <div className="sidebar-collapsed-brand">
      <div className="sidebar-collapsed-brand__logoLayer">
        <div className="sidebar-brand-logo">R</div>
      </div>
      <div className="sidebar-collapsed-brand__toggleLayer">
        <Button
          type="text"
          size="small"
          className="sidebar-collapsed-brand__toggle"
          onClick={() => onCollapsedChange(false)}
          icon={<PanelLeft size={token.size} />}
          aria-label="Expand sidebar"
        />
      </div>
    </div>
  );

  const sidebarContent = (
    <Flex vertical style={{ height: '100%', width: '100%' }}>
      <Flex
        vertical
        justify="center"
        align={collapsed ? 'center' : 'stretch'}
        style={{
          paddingBlock: token.paddingSM,
          paddingInline: collapsed ? token.paddingXXS : token.paddingSM,
          minHeight: 64,
          flexShrink: 0,
        }}
      >
        {collapsed ? brandCollapsed : brandExpanded}
      </Flex>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={antdItems}
        onClick={handleMenuClick}
        inlineCollapsed={isMobile ? false : collapsed}
        style={{
          borderRight: 'none',
          flex: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          background: 'transparent',
        }}
      />

      <div style={{ padding: token.paddingXS, margin: token.marginXS }}>
        <Dropdown
          menu={{
            items: [
              {
                key: 'logout',
                icon: <LogOut size={token.fontSize} />,
                label: 'Đăng xuất',
                danger: true,
                onClick: () => router.push('/login'),
              },
            ],
          }}
          trigger={['click']}
        >
          <Flex
            align="center"
            gap={collapsed ? 0 : token.marginSM}
            justify={collapsed ? 'center' : 'flex-start'}
            style={{
              cursor: 'pointer',
              borderRadius: token.borderRadius,
              padding: token.paddingXS,
            }}
          >
            <Avatar size={32}>A</Avatar>
            {!collapsed && (
              <Flex vertical style={{ minWidth: 0, flex: 1 }} gap={2}>
                <Text ellipsis style={{ lineHeight: 1 }}>Admin</Text>
                <Text
                  ellipsis
                  style={{ lineHeight: 1, fontSize: token.fontSizeSM, color: token.colorTextQuaternary }}
                >
                  admin@recruitify.com
                </Text>
              </Flex>
            )}
          </Flex>
        </Dropdown>
      </div>
    </Flex>
  );

  if (isMobile) {
    return (
      <Drawer
        open={!collapsed}
        placement="left"
        onClose={() => onCollapsedChange(true)}
        width={280}
        styles={{
          body: { padding: 0, background: token.colorBgLayout, overflow: 'hidden' },
          header: { display: 'none' },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={240}
      collapsedWidth={64}
      style={{
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        background: token.colorBgLayout,
        alignSelf: 'stretch',
        minHeight: '100vh',
        overflow: 'visible',
      }}
    >
      {sidebarContent}
    </Sider>
  );
}
