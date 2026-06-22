'use client';

import { ProCard } from '@ant-design/pro-components';
import { Form, Input, Button, message, Tabs } from 'antd';
import { useUserStore } from '@/stores/useUserStore';

export default function AdminSettings() {
  const { user } = useUserStore();

  const handleSave = () => {
    message.success('Đã lưu cài đặt');
  };

  return (
    <div style={{ padding: 24 }}>
      <Tabs
        items={[
          {
            key: 'profile',
            label: 'Thông tin cá nhân',
            children: (
              <ProCard>
                <Form
                  layout="vertical"
                  initialValues={{
                    fullName: user?.fullName || '',
                    email: user?.email || '',
                  }}
                  onFinish={handleSave}
                >
                  <Form.Item label="Họ tên" name="fullName">
                    <Input placeholder="Nhập họ tên" />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Lưu thay đổi
                    </Button>
                  </Form.Item>
                </Form>
              </ProCard>
            ),
          },
          {
            key: 'company',
            label: 'Thông tin công ty',
            children: (
              <ProCard>
                <Form layout="vertical">
                  <Form.Item label="Tên công ty" name="companyName">
                    <Input placeholder="Nhập tên công ty" />
                  </Form.Item>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input placeholder="Nhập địa chỉ" />
                  </Form.Item>
                  <Form.Item label="Website" name="website">
                    <Input placeholder="https://example.com" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={handleSave}>
                      Lưu thay đổi
                    </Button>
                  </Form.Item>
                </Form>
              </ProCard>
            ),
          },
          {
            key: 'notifications',
            label: 'Thông báo',
            children: (
              <ProCard>
                <p>Cài đặt thông báo sẽ được cập nhật trong phiên bản sau.</p>
              </ProCard>
            ),
          },
        ]}
      />
    </div>
  );
}
