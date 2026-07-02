'use client';

import { Avatar, Card, Flex, Tag, Typography } from 'antd';

import styles from './NewApplications.module.css';

const { Title, Text } = Typography;

const applicants = [
  {
    id: 1,
    name: 'Trần Nguyễn Minh Phi',
    position: 'Frontend Developer',
    initials: 'TP',
    time: '3 hours ago',
    status: 'New',
  },
  {
    id: 2,
    name: 'Dương Thanh Hưng',
    position: 'Backend Developer',
    initials: 'DH',
    time: '5 hours ago',
    status: 'Reviewed',
  },
  {
    id: 3,
    name: 'Nô Phước Thịnh',
    position: 'UI/UX Designer',
    initials: 'NT',
    time: 'Yesterday',
    status: 'New',
  },
  {
    id: 4,
    name: 'Nguyễn Hoàng Nam',
    position: 'DevOps Engineer',
    initials: 'NN',
    time: '2 days ago',
    status: 'Reviewed',
  },
];

export default function NewApplications() {
  return (
    <Card
      className={styles.card}
      bordered={false}
      styles={{
        body: {
          padding: 24,
        },
      }}
    >
      <Title level={5} className={styles.title}>
        New Applications
      </Title>

      <Flex vertical gap={16}>
        {applicants.map((item) => (
          <div key={item.id} className={styles.item}>
            <Avatar
              size={40}
              className={styles.avatar}
            >
              {item.initials}
            </Avatar>

            <div className={styles.info}>
              <Text strong>{item.name}</Text>

              <Text className={styles.position}>
                {item.position}
              </Text>

              <Text className={styles.time}>
                {item.time}
              </Text>
            </div>

            <Tag color={item.status === 'New' ? 'green' : 'blue'}>
              {item.status}
            </Tag>
          </div>
        ))}
      </Flex>
    </Card>
  );
}