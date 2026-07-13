'use client';

import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { Tag, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'rejected';
  appliedAt: string;
}

const columns: ProColumns<Candidate>[] = [
  {
    title: 'Ứng viên',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => (
      <Space>
        <Avatar icon={<UserOutlined />} />
        <div>
          <div>{record.name}</div>
          <div style={{ fontSize: 12, color: '#999' }}>{record.email}</div>
        </div>
      </Space>
    ),
  },
  {
    title: 'Vị trí ứng tuyển',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      const colorMap = {
        new: 'blue',
        screening: 'orange',
        interview: 'purple',
        offer: 'green',
        rejected: 'red',
      };
      const labelMap = {
        new: 'Mới',
        screening: 'Sàng lọc',
        interview: 'Phỏng vấn',
        offer: 'Đề nghị',
        rejected: 'Từ chối',
      };
      return <Tag color={colorMap[record.status]}>{labelMap[record.status]}</Tag>;
    },
  },
  {
    title: 'Ngày ứng tuyển',
    dataIndex: 'appliedAt',
    key: 'appliedAt',
    valueType: 'date',
  },
  {
    title: 'Thao tác',
    key: 'actions',
    render: () => (
      <Space>
        <a>Xem CV</a>
        <a>Lịch sử</a>
      </Space>
    ),
  },
];

export default function AdminCandidates() {
  return (
    <ProTable<Candidate>
      columns={columns}
      dataSource={[]}
      rowKey="id"
      headerTitle="Quản lý ứng viên"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
    />
  );
}
