'use client';

import { Avatar, Button, Card, Flex, Typography } from 'antd';

import styles from './NewApplications.module.css';

const { Title, Text } = Typography;

const applicants = [
  {
    id: 1,
    name: 'Trần Nguyễn Minh Phi',
    position: 'Applied for Frontend Developer',
    initials: 'TP',
    time: '3 hours ago',
  },
  {
    id: 2,
    name: 'Dương Thanh Hưng',
    position: ' Applied for Backend Developer',
    initials: 'DH',
    time: '5 hours ago',
  },
  {
    id: 3,
    name: 'Nô Phước Thịnh',
    position: 'Applied for UI/UX Designer',
    initials: 'NT',
    time: 'Yesterday',
  },
  {
    id: 4,
    name: 'Nguyễn Hoàng Nam',
    position: 'Applied for DevOps Engineer',
    initials: 'NN',
    time: '2 days ago',
  },
];

export default function NewApplications() {
  return (
    <Card
      bordered={false}
      styles={{
        body: { padding: 24 },
      }}
      style={{
        background: 'transparent',
        boxShadow: 'none',
        borderRadius: 20,
        height: '100%',
        position: 'relative',
        top: -2,
      }}
    >
      <Flex align="center" justify="space-between" style={{ marginBottom: 16, marginTop: -8 }}>
        <Title
          level={5}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#1a1a2e',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          New Applications
        </Title>
        <Button
          type="link"
          style={{
            color: '#166534',
            fontSize: 13,
            fontWeight: 600,
            padding: 0,
          }}
        >
          View all
        </Button>
      </Flex>

      <Flex vertical gap={16}>
        {applicants.map((item) => (
          <div key={item.id} className={styles.item}>
            <Avatar
              size={40}
              style={{ background: '#244838', color: '#e9e9e9', fontWeight: 600, flexShrink: 0 }}
            >
              {item.initials}
            </Avatar>

            <div className={styles.info}>
              <Text strong>{item.name}</Text>
              <Text className={styles.position}>{item.position}</Text>
            </div>

            <Text className={styles.time}>{item.time}</Text>
          </div>
        ))}
      </Flex>
    </Card>
  );
}
