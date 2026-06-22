'use client';

import { Card, Col, Row, Typography, Avatar, theme, Flex, Timeline, Tag } from 'antd';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

const { Title, Text } = Typography;

export default function AdminDashboard() {
  const { token } = theme.useToken();

  const stats = [
    {
      title: 'Tin tuyển dụng',
      value: '12',
      description: '+3 tin mới tuần này',
      icon: <DollarSign style={{ color: token.colorTextSecondary }} />,
    },
    {
      title: 'Ứng viên',
      value: '256',
      description: '+48 ứng viên mới',
      icon: <Users style={{ color: token.colorTextSecondary }} />,
    },
    {
      title: 'Phỏng vấn',
      value: '8',
      description: '3 phỏng vấn hôm nay',
      icon: <CreditCard style={{ color: token.colorTextSecondary }} />,
    },
    {
      title: 'Đã tuyển',
      value: '5',
      description: '+2 so với tháng trước',
      icon: <Activity style={{ color: token.colorTextSecondary }} />,
    },
  ];

  const recentSales = [
    { name: 'Nguyễn Văn A', email: 'nva@email.com', position: 'Frontend Developer', initials: 'NA' },
    { name: 'Trần Thị B', email: 'ttb@email.com', position: 'Backend Developer', initials: 'TB' },
    { name: 'Lê Văn C', email: 'lvc@email.com', position: 'UI/UX Designer', initials: 'LC' },
    { name: 'Phạm Thị D', email: 'ptd@email.com', position: 'Project Manager', initials: 'PD' },
    { name: 'Hoàng Văn E', email: 'hve@email.com', position: 'DevOps Engineer', initials: 'HE' },
  ];

  const timelineItems = [
    {
      color: 'green' as const,
      content: (
        <Flex vertical gap={4}>
          <Text strong>09:00 · Phỏng vấn Frontend</Text>
          <Text type="secondary">Nguyễn Văn A - Vị trí Senior React Developer</Text>
        </Flex>
      ),
    },
    {
      color: 'blue' as const,
      content: (
        <Flex vertical gap={4}>
          <Text strong>10:30 · Đăng tin mới</Text>
          <Text type="secondary">Tuyển dụng DevOps Engineer - Phòng Kỹ thuật</Text>
        </Flex>
      ),
    },
    {
      color: 'gold' as const,
      content: (
        <Flex vertical gap={4}>
          <Text strong>14:00 · Đánh giá CV</Text>
          <Text type="secondary">Sàng lọc 15 ứng viên cho vị trí Backend Developer</Text>
        </Flex>
      ),
    },
    {
      color: 'red' as const,
      content: (
        <Flex vertical gap={4}>
          <Text strong>16:00 · Họp tuyển dụng</Text>
          <Text type="secondary">Review tiến độ tuyển dụng Q2 với ban lãnh đạo</Text>
        </Flex>
      ),
    },
  ];

  const cardHoverStyle = {
    ['--dash-card-hover-border' as string]: token.colorPrimaryBorderHover,
  };

  return (
    <Flex vertical gap={token.marginLG}>
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <Card
              style={cardHoverStyle}
              styles={{ body: { padding: token.paddingLG } }}
              hoverable
            >
              <Flex justify="space-between" align="center" style={{ marginBottom: token.marginXS }}>
                <Text strong style={{ fontSize: token.fontSizeSM }}>
                  {stat.title}
                </Text>
                {stat.icon}
              </Flex>
              <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>{stat.value}</div>
              <Text ellipsis type="secondary" style={{ fontSize: token.fontSizeSM }}>
                {stat.description}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card
            style={{ height: '100%' }}
            title={
              <Flex align="center" gap={token.marginSM}>
                <Title level={5} style={{ margin: 0 }}>
                  Hoạt động hôm nay
                </Title>
                <Tag color="processing">
                  Hôm nay
                </Tag>
              </Flex>
            }
          >
            <Timeline items={timelineItems} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card
            style={{ height: '100%' }}
            title={
              <Title level={5} style={{ margin: 0 }}>
                Ứng viên gần đây
              </Title>
            }
          >
            <Flex vertical>
              {recentSales.map((item) => (
                <Flex
                  key={item.email}
                  align="center"
                  justify="space-between"
                  style={{
                    padding: `${token.paddingXS}px ${token.paddingSM}px`,
                    borderRadius: token.borderRadius,
                  }}
                >
                  <Flex align="center" gap={token.marginSM} style={{ minWidth: 0 }}>
                    <Avatar
                      size={40}
                      shape="circle"
                      style={{
                        flexShrink: 0,
                        backgroundColor: token.colorFillSecondary,
                        color: token.colorTextSecondary,
                        fontWeight: 600,
                        fontSize: token.fontSizeSM,
                      }}
                    >
                      {item.initials}
                    </Avatar>
                    <Flex vertical style={{ minWidth: 0 }}>
                      <Text strong style={{ fontSize: token.fontSizeSM, lineHeight: 1 }}>
                        {item.name}
                      </Text>
                      <Text type="secondary" style={{ fontSize: token.fontSizeSM }} ellipsis>
                        {item.position}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
}
