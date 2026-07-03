"use client";

import { Card, Table, Typography, Button, Flex } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

import styles from "./CurrentOpenings.module.css";

const { Title } = Typography;

const data = [
  {
    key: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    applicants: 85,
    salary: "$2,500 - $3,200",
    status: "Open",
  },
  {
    key: 2,
    title: "Backend Engineer",
    department: "Engineering",
    location: "HCM",
    applicants: 62,
    salary: "$2,200 - $2,900",
    status: "Open",
  },
  {
    key: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Ha Noi",
    applicants: 41,
    salary: "$1,800 - $2,400",
    status: "Closed",
  },
  {
    key: 4,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    applicants: 29,
    salary: "$2,800 - $3,600",
    status: "Open",
  },
  {
    key: 5,
    title: "Data Analyst",
    department: "Data & Analytics",
    location: "HCM",
    applicants: 15,
    salary: "$1,600 - $2,100",
    status: "Hold",
  },
];

const columns = [
  {
    title: "Job Title",
    dataIndex: "title",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Salary",
    dataIndex: "salary",
  },
  {
    title: "Applied",
    dataIndex: "applicants",
  },
  {
    title: "",
    render: () => (
      <Button type="text" shape="circle" icon={<EllipsisOutlined size={20} />} />
    ),
  },
];

export default function CurrentOpenings() {
  return (
    <Card
      variant="borderless"
      styles={{
        body: { padding: 24, background: "transparent" },
      }}
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <Flex align="center" justify="space-between">
        <Title
          level={5}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#1a1a2e",
            margin: 0,
            marginTop: -8,
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Current Openings
        </Title>
        <Button
          type="link"
          style={{
            color: "#707070",
            fontSize: 13,
            fontWeight: 600,
            padding: 0,
          }}
        >
          View all
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className={styles.table}
      />
    </Card>
  );
}
