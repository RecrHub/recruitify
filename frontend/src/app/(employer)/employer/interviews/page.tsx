'use client';

import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { Button, Tag, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Interview {
  id: number;
  candidateName: string;
  position: string;
  scheduledAt: string;
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'online' | 'onsite';
}

const columns: ProColumns<Interview>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 60,
  },
  {
    title: 'Ứng viên',
    dataIndex: 'candidateName',
    key: 'candidateName',
  },
  {
    title: 'Vị trí',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Thời gian',
    dataIndex: 'scheduledAt',
    key: 'scheduledAt',
    valueType: 'dateTime',
    sorter: true,
  },
  {
    title: 'Người phỏng vấn',
    dataIndex: 'interviewer',
    key: 'interviewer',
  },
  {
    title: 'Hình thức',
    dataIndex: 'type',
    key: 'type',
    render: (_, record) => (
      <Tag color={record.type === 'online' ? 'blue' : 'default'}>
        {record.type === 'online' ? 'Trực tuyến' : 'Tại văn phòng'}
      </Tag>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      const colorMap = { scheduled: 'blue', completed: 'green', cancelled: 'red' };
      const labelMap = { scheduled: 'Đã lên lịch', completed: 'Hoàn thành', cancelled: 'Đã hủy' };
      return <Tag color={colorMap[record.status]}>{labelMap[record.status]}</Tag>;
    },
  },
  {
    title: 'Thao tác',
    key: 'actions',
    render: () => (
      <Space>
        <a>Chi tiết</a>
        <a style={{ color: '#ff4d4f' }}>Hủy</a>
      </Space>
    ),
  },
];

export default function AdminInterviews() {
  return (
    <ProTable<Interview>
      columns={columns}
      dataSource={[]}
      rowKey="id"
      headerTitle="Quản lý phỏng vấn"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      toolBarRender={() => [
        <Button key="add" type="primary" icon={<PlusOutlined />}>
          Lên lịch phỏng vấn
        </Button>,
      ]}
    />
  );
}
