'use client';

import {
  Col,
  Row,
  Typography,
  Avatar,
  Flex,
  Input,
  Button,
  Table,
  Tag,
  Badge,
} from 'antd';

import {
  Briefcase,
  Users,
  CheckCircle,
  Search,
  FileText,
  Headphones,
  UserX,
  Home,
  Heart,
  ClipboardList,
  Calendar,
  Mail,
  Bell,
  MapPin,
  MoreHorizontal,
  Layers,
} from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const { Title, Text } = Typography;

const CHART_COLOR = '#134d22';
const BORDER_COLOR = 'rgba(0, 0, 0, 0.15)';

const monthFull: Record<string, string> = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April',
  May: 'May', Jun: 'June', Jul: 'July', Aug: 'August',
  Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 12,
        padding: '10px 14px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        border: '1px solid #f0f0f0',
      }}
    >
      <div style={{ fontSize: 13, color: CHART_COLOR, fontWeight: 500, marginBottom: 2 }}>
        {monthFull[label] ?? label}
      </div>
      <div style={{ fontSize: 15, color: '#1a1a2e', fontWeight: 700 }}>
        {payload[0].value} appli.
      </div>
    </div>
  );
};

const navItems = [
  { label: 'Home', icon: <Home size={18} />, active: true },
  { label: 'Jobs', icon: <Briefcase size={18} /> },
  { label: 'Matches', icon: <Heart size={18} /> },
  { label: 'Screening', icon: <ClipboardList size={18} /> },
];

const stats = [
  { title: 'Total Job Openings Available', value: '367', icon: <Briefcase size={16} />, bg: '#ede9ff', color: '#5B4CF0' },
  { title: 'Total Number of Applications', value: '12,045', icon: <FileText size={16} />, bg: '#dbeafe', color: '#3b82f6' },
  { title: 'Primary Shortlist Candidates', value: '2,628', icon: <Users size={16} />, bg: '#fef9c3', color: '#ca8a04' },
  { title: 'Candidates Interviewed', value: '2,042', icon: <Headphones size={16} />, bg: '#ffedd5', color: '#ea580c' },
  { title: 'Applicants Rejected', value: '8,234', icon: <UserX size={16} />, bg: '#fee2e2', color: '#ef4444' },
  { title: 'Candidates Hired', value: '9,369', icon: <CheckCircle size={16} />, bg: '#dcfce7', color: '#16a34a' },
];

const chartData = [
  { month: 'Jan', value: 145 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 178 },
  { month: 'Apr', value: 165 },
  { month: 'May', value: 215 },
  { month: 'Jun', value: 235 },
  { month: 'Jul', value: 250 },
  { month: 'Aug', value: 255 },
  { month: 'Sep', value: 322 },
  { month: 'Oct', value: 280 },
  { month: 'Nov', value: 205 },
  { month: 'Dec', value: 220 },
];

const scheduleItems = [
   {
     time: '10:30 AM',
     label: 'Interview with Rafiqur Rahman',
     dotColor: '#3b82f6',
     pillBg: '#dbeafe',
     pillColor: '#1d4ed8',
     initials: ['R', 'M'],
     avatarColors: ['#5B4CF0', '#a78bfa'],
   },
   {
     time: '12:00 PM',
     label: 'HR Team Meeting',
     dotColor: '#16a34a',
     pillBg: '#166534',
     pillColor: '#dcfce7',
     initials: ['A', 'B'],
     avatarColors: ['#22c55e', '#86efac'],
   },
   {
     time: '01:00 PM',
     label: 'Job Post – Design Lead...',
     dotColor: '#ef4444',
     pillBg: '#ef4444',
     pillColor: '#ffffff',
     initials: ['D'],
     avatarColors: ['#fca5a5'],
   },
   {
     time: '05:00 PM',
     label: 'First Call with Jawaid...',
     dotColor: '#c4b5fd',
     pillBg: '#ede9ff',
     pillColor: '#7c3aed',
     initials: ['J'],
     avatarColors: ['#8b5cf6'],
   },
   {
     time: '06:30 PM',
     label: 'Interview with Le Thi Mai',
     dotColor: '#f59e0b',
     pillBg: '#fef3c7',
     pillColor: '#b45309',
     initials: ['L', 'M'],
     avatarColors: ['#f59e0b', '#fcd34d'],
   },
   {
     time: '08:00 PM',
     label: 'Sync with Pham Quoc Bao',
     dotColor: '#06b6d4',
     pillBg: '#cffafe',
     pillColor: '#0e7490',
     initials: ['P', 'B'],
     avatarColors: ['#06b6d4', '#67e8f9'],
   },
  ];

interface JobRecord {
  key: number;
  company: string;
  job: string;
  category: string;
  location: string;
  salary: string;
  applied: number;
}

const jobs: JobRecord[] = [
  { key: 1, company: 'Microsoft', job: 'Personal Assistant', category: 'Administrative', location: 'India', salary: '$80K – $100K', applied: 154 },
  { key: 2, company: 'Microsoft', job: 'Personal Assistant', category: 'Sales', location: 'USA', salary: '$80K – $100K', applied: 540 },
  { key: 3, company: 'Microsoft', job: 'Personal Assistant', category: 'Marketing', location: 'UK', salary: '$80K – $100K', applied: 883 },
  { key: 4, company: 'Microsoft', job: 'Personal Assistant', category: 'Design', location: 'France', salary: '$80K – $100K', applied: 738 },
];

const applicants = [
  { name: 'Tran Vuong Hung', position: 'Design Lead positions', initials: 'TH', color: '#f59e0b', time: '3 hours ago' },
  { name: 'Tran Tri Vi', position: 'iOS Developer', initials: 'TV', color: '#06b6d4', time: '5 hours ago' },
  { name: 'Nguyen Hoang Nam', position: 'Product Designer', initials: 'NH', color: '#8b5cf6', time: 'Yesterday' },
  { name: 'Tran Nguyen Minh Phi', position: 'iOS Developer', initials: 'PT', color: '#10b981', time: '3 Jun, 2023' },
  { name: 'Duong Thanh Hao', position: 'Product Backlog', initials: 'HT', color: '#FFD1DC', time: '3 Jun, 2023' },
];

const columns = [
  {
    title: 'Job Title',
    dataIndex: 'job',
    render: (text: string, record: JobRecord) => (
      <div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>{record.company}</div>
        <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 13 }}>{text}</div>
      </div>
    ),
  },
  { title: 'Category', dataIndex: 'category', render: (t: string) => <span style={{ fontSize: 13, color: '#374151' }}>{t}</span> },
  {
    title: 'Location',
    dataIndex: 'location',
    render: (t: string) => (
      <Flex align="center" gap={4}>
        <MapPin size={13} color="#9ca3af" />
        <span style={{ fontSize: 13, color: '#374151' }}>{t}</span>
      </Flex>
    ),
  },
  { title: 'Salary', dataIndex: 'salary', render: (t: string) => <span style={{ fontSize: 13, color: '#374151' }}>{t}</span> },
  { title: 'Applied', dataIndex: 'applied', render: (t: number) => <span style={{ fontSize: 13, color: '#374151' }}>{t}</span> },
  {
    title: '',
    render: () => (
      <span style={{ color: '#d1d5db', fontSize: 16, letterSpacing: 2, cursor: 'pointer' }}>···</span>
    ),
  },
];

export default function EmployerDashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh', background: 'rgb(163, 109, 189)', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>


      {/* Main */}
      <div
  style={{
    flex: 1,
    padding: 24,
    overflowY: 'auto',
    background: '#f8f9fc',
  }}
>     

        {/* Content */}
        <div style={{ flex: 1, padding: 20 }}>
          {/* Dashboard Header */}
<Flex
  justify="space-between"
  align="center"
  style={{ marginBottom: 24 }}
>
  <div>
    <Title level={2} style={{ margin: 0 }}>
      Overview
    </Title>  
  </div>

  <Flex gap={12}>
    <Button
      icon={<Layers size={16} />}
      style={{
        height: 42,
        borderRadius: 10,
      }}
    >
      Customize
    </Button>

    <Button
      icon={<Calendar size={16} />}
      style={{
        height: 42,
        borderRadius: 10,
      }}
    >
      Jun 1, 2025 - Jun 30, 2026
    </Button>
   
  </Flex>
</Flex>
          {/* Stats */}
<div
  style={{
    marginBottom: 20,
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: 16,
    overflow: 'hidden',
    background: 'white',
  }}
>
  <Row gutter={0}>
    {stats.map((item, idx) => (
      <Col
        key={item.title}
        xs={12}
        md={8}
        lg={4}
        style={{
          padding: 16,
          borderRight: idx === stats.length - 1 ? 'none' : `1px solid ${BORDER_COLOR}`,
        }}
      >
        <div style={{ width: 34, height: 34, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, marginBottom: 10 }}>
          {item.icon}
        </div>
        <Text style={{ display: 'block', fontSize: 12, color: '#9ca3af', fontWeight: 500, marginBottom: 4 }}>{item.title}</Text>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>{item.value}</div>
      </Col>
    ))}
  </Row>
</div>

          {/* Chart + Schedule */}
          <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
            <Col xs={24} lg={16}>
              <Flex justify="space-between" align="center" style={{ marginBottom: 16, padding: '0 4px' }}>
                <Text strong style={{ fontSize: 16, fontWeight: 600, color: '#1a1a2e' }}>Application Received Time</Text>
                <Flex gap={4} style={{ background: '#f5f5f5', borderRadius: 8, padding: 3 }}>
                  {['12 months', '30 days', '7 Days'].map((label, i) => (
                    <div
                      key={label}
                      style={{
                        padding: '4px 12px',
                        fontSize: 12,
                        borderRadius: 6,
                        cursor: 'pointer',
                        background: i === 0 ? 'white' : 'none',
                        color: i === 0 ? CHART_COLOR : '#6b7280',
                        fontWeight: i === 0 ? 600 : 400,
                        boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </Flex>
              </Flex>
              <div
                style={{
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: 16,
                  background: 'white',
                  padding: 18,
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#eef0f4" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      axisLine={false}
                      tickLine={false}
                      dy={8}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={v => `${v}k`}
                      domain={[0, 350]}
                      ticks={[50, 100, 150, 200, 250, 300, 350]}
                      width={44}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#c7c9d9', strokeWidth: 1 }} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={CHART_COLOR}
                      strokeWidth={2.5}
                      fill="url(#colorVal)"
                      dot={false}
                      activeDot={{ r: 6, fill: CHART_COLOR, stroke: 'white', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Col>

            <Col xs={24} lg={8}>
              <div style={{ height: '100%', marginTop: 12 }}>
                <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
                  <Text strong style={{ fontSize: 14, color: '#1a1a2e' }}>Today's Schedule</Text>
                  <div style={{ background: '#3D816a', color: 'white', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20 }}>6</div>
                </Flex>
                <Flex vertical gap={12}>
                  {scheduleItems.map(item => (
                    <Flex key={item.time} align="center" gap={10}>
                      <Text style={{ fontSize: 12, color: '#9ca3af', width: 52, flexShrink: 0 }}>{item.time}</Text>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dotColor, flexShrink: 0 }} />
                      <div style={{
                        flex: 1,
                        padding: '7px 12px',
                        borderRadius: 10,
                        background: item.pillBg,
                        color: item.pillColor,
                        fontSize: 12,
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}>
                        <Flex style={{ marginRight: 2 }}>
                          {item.initials.map((ini, idx) => (
                            <div
                              key={idx}
                              style={{
                                width: 20, height: 20, borderRadius: '50%',
                                border: '1.5px solid white',
                                marginLeft: idx === 0 ? 0 : -6,
                                background: item.avatarColors[idx],
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 8, fontWeight: 600, color: 'white',
                              }}
                            >
                              {ini}
                            </div>
                          ))}
                        </Flex>
                        {item.label}
                      </div>
                    </Flex>
                  ))}
                </Flex>
                <div style={{ textAlign: 'center', marginTop: 14 }}>
                  <span style={{ fontSize: 13, color: '#3D816a', fontWeight: 500, cursor: 'pointer' }}>View Calendar</span>
                </div>
              </div>
            </Col>
          </Row>

          {/* Table + Applications */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <div>
                <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                  <Text strong style={{ fontSize: 14, color: '#1a1a2e' }}>Current Openings</Text>
                  <span style={{ fontSize: 12, color: '#3D816a', fontWeight: 500, cursor: 'pointer' }}>View All</span>
                </Flex>
                <Table
                  pagination={false}
                  columns={columns}
                  dataSource={jobs}
                  size="small"
                  style={{ fontSize: 13 }}
                />
              </div>
            </Col>

            <Col xs={24} lg={8}>
              <div>
                <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                  <Text strong style={{ fontSize: 14, color: '#1a1a2e' }}>New Applications</Text>
                  <span style={{ fontSize: 12, color: '#22483c', fontWeight: 500, cursor: 'pointer' }}>View All</span>
                </Flex>
                <Flex vertical gap={16}>
                  {applicants.map(item => (
                    <Flex key={item.name} align="center" gap={10}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: item.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 600, color: 'white', flexShrink: 0,
                      }}>
                        {item.initials}
                      </div>
                      <Flex vertical style={{ flex: 1 }}>
                        <Text strong style={{ fontSize: 13, color: '#1a1a2e' }}>{item.name}</Text>
                        <Text style={{ fontSize: 12, color: '#9ca3af' }}>Applied for {item.position}</Text>
                      </Flex>
                      <Text style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' }}>{item.time}</Text>
                    </Flex>
                  ))}
                </Flex>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
