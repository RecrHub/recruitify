"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { STATS_DATA, statsIcons } from "@/const/register.const";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import styles from "./ForgetPassword.module.css";
import { useRouter } from "next/navigation";
const { Title, Text } = Typography;
import LogoRecruitify from "@/access/icons/LogoRecrutifyDark.svg";

export default function ForgetPasswordPage() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: { email: string }) => {
    console.log("Reset password values:", values);
    // TODO: integrate reset password API
  };

  return (
    <Row className={styles.row}>
      <div className={styles.diagonalDivider} />
      {/* LEFT COLUMN */}
      <Col span={12} className={styles.leftColumn}>
        <div className={styles.formWrapper}>
          <Button
            type="text"
            icon={<ChevronLeft />}
            className={styles.backButton}
            onClick={() => router.push("/")}
          >
            Back to home
          </Button>
          <div className={styles.formContainer}>
            {/* Logo */}
            <div className={styles.logo}>
              <LogoRecruitify />
              <span className={styles.logoText}>RecruitJob</span>
            </div>

            <Title level={2} className={styles.title}>
              Forget Password
            </Title>
            <Text className={styles.subtitle}>
              Go to back{" "}
              <Link href="/login" style={{ fontWeight: 500, color: "#18191c" }}>
                Sign In
              </Link>
            </Text>
            <Text className={styles.subtitle}>
              Don&apos;t have account?{" "}
              <Link
                href="/signup"
                style={{ fontWeight: 500, color: "#18191c" }}
              >
                Create Account
              </Link>
            </Text>

            <Form
              form={form}
              layout="vertical"
              className={styles.form}
              onFinish={onFinish}
              requiredMark={false}
            >
              <Form.Item
                name="email"
                className={styles.formItem}
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  placeholder="Email address"
                  type="email"
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className={styles.submitButton}
                  icon={<ArrowRight />}
                  iconPosition="end"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>

      {/* RIGHT COLUMN */}
      <Col span={12} className={styles.rightColumn}>
        <div className={styles.bgImage} />
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.heroTitle}>
              Over 1,75,324 candidates
              <br />
              waiting for good employees.
            </div>
          </div>
          <div className={styles.statsWrapper}>
            <div className={styles.statsContainer}>
              {STATS_DATA.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statCard}>{statsIcons[index]}</div>
                  <Text className={styles.statNumber}>{stat.number}</Text>
                  <Text className={styles.statLabel}>{stat.label}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

