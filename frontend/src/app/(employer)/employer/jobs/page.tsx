'use client';

import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { Button, Tag, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  status: 'active' | 'closed' | 'draft';
  applications: number;
  createdAt: string;
}

const columns: ProColumns<JobPosting>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 60,
  },
  {
    title: 'Vị trí',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Địa điểm',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      const colorMap = { active: 'green', closed: 'red', draft: 'default' };
      const labelMap = { active: 'Đang tuyển', closed: 'Đã đóng', draft: 'Nháp' };
      return <Tag color={colorMap[record.status]}>{labelMap[record.status]}</Tag>;
    },
  },
  {
    title: 'Ứng viên',
    dataIndex: 'applications',
    key: 'applications',
    sorter: true,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    valueType: 'date',
  },
  {
    title: 'Thao tác',
    key: 'actions',
    render: () => (
      <Space>
        <a>Sửa</a>
        <a style={{ color: '#ff4d4f' }}>Xóa</a>
      </Space>
    ),
  },
];

export default function AdminJobs() {
  return (
    <ProTable<JobPosting>
      columns={columns}
      dataSource={[]}
      rowKey="id"
      headerTitle="Quản lý tin tuyển dụng"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      toolBarRender={() => [
        <Button key="add" type="primary" icon={<PlusOutlined />}>
          Thêm tin mới
        </Button>,
      ]}
    />
  );
}
