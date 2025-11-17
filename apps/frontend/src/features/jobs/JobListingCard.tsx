"use client";
import React from "react";
import { Card, Typography, Space } from "antd";
import { EnvironmentOutlined, BankOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { Job } from "@/types/job";

const { Title, Text } = Typography;

interface JobListingCardProps {
  job: Job;
  onClick?: (job: Job) => void;
}

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    height: 100%;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: ${token.boxShadowSecondary};
      transform: translateY(-4px);
    }
  `,
  title: css`
    margin-bottom: ${token.marginXS}px !important;
  `,
  iconText: css`
    display: flex;
    align-items: center;
    gap: ${token.marginXS}px;
  `,
}));

export const JobListingCard: React.FC<JobListingCardProps> = ({
  job,
  onClick,
}) => {
  const { styles } = useStyles();

  const handleClick = () => {
    if (onClick) {
      onClick(job);
    }
  };

  return (
    <Card className={styles.card} onClick={handleClick} hoverable>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Title level={4} className={styles.title}>
          {job.title}
        </Title>

        <Text type="secondary" className={styles.iconText}>
          <BankOutlined />
          {job.companyName}
        </Text>

        <Text type="secondary" className={styles.iconText}>
          <EnvironmentOutlined />
          {job.location}
        </Text>
      </Space>
    </Card>
  );
};

export default JobListingCard;

