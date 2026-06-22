'use client';

import { Layout, Button, Flex, Breadcrumb, Grid, Divider, theme } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { Home, PanelLeft, FileText, Users, Calendar, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const { Header: AntHeader } = Layout;

const PATH_LABEL: Record<string, { label: string; icon: LucideIcon }> = {
  employer: { label: 'Dashboard', icon: Home },
  jobs: { label: 'Tin tuyển dụng', icon: FileText },
  candidates: { label: 'Ứng viên', icon: Users },
  interviews: { label: 'Phỏng vấn', icon: Calendar },
  settings: { label: 'Cài đặt', icon: Settings },
};

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.replace(/^\/employer\/?/, '').split('/').filter(Boolean);
  const leafKey = segments[0] ?? 'employer';
  const leaf = PATH_LABEL[leafKey] ?? { label: leafKey, icon: Home };
  const LeafIcon = leaf.icon;

  const breadcrumbItems = [
    {
      title: (
        <Flex align="center" gap={token.marginXS} style={{ cursor: 'pointer' }} onClick={() => router.push('/employer')}>
          <Home size={token.fontSize} style={{ opacity: 0.88 }} />
          <span>Dashboard</span>
        </Flex>
      ),
    },
  ];

  if (leafKey !== 'employer') {
    breadcrumbItems.push({
      title: (
        <Flex align="center" gap={token.marginXS}>
          <LeafIcon size={token.fontSize} style={{ opacity: 0.88 }} />
          <span>{leaf.label}</span>
        </Flex>
      ),
    });
  }

  return (
    <AntHeader
      style={{
        background: 'transparent',
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: `0 ${token.padding}px`,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Flex align="center" flex={1} style={{ minWidth: 0 }}>
        {isMobile && (
          <>
            <Button
              type="text"
              size="small"
              onClick={onToggleSidebar}
              icon={<PanelLeft size={token.size} />}
              aria-label="Toggle sidebar"
            />
            <Divider type="vertical" />
          </>
        )}
        <Breadcrumb items={breadcrumbItems} />
      </Flex>
    </AntHeader>
  );
}
