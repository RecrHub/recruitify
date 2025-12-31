"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  App,
} from "antd";
import FacebookIcon from "@/access/icons/facebook.svg";
import GoogleIcon from "@/access/icons/google.svg";
import LogoRecruitify from "@/access/icons/LogoRecrutifyDark.svg";
import styles from "./SignIn.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { STATS_DATA, statsIcons } from "@/const/register.const";
import { ArrowRight, ChevronLeft,} from "lucide-react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"; 
import Link from "next/link";
import authService from "@/services/authService";
const { Title, Text } = Typography;



export default function LoginForm() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { message } = App.useApp();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setApiError(null);
      setLoginSuccess(false);
      setIsSubmitting(true);
      await authService.login(values.email, values.password);

      setLoginSuccess(true);
      message.success("Đăng nhập thành công! Chào mừng bạn trở lại.");

      // Redirect sau một khoảng ngắn
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        // Xử lý các loại lỗi cụ thể
        if (
          errorMessage.includes("account is deactivated") ||
          errorMessage.includes("deactivated")
        ) {
          setApiError(
            "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên."
          );
        } else if (
          errorMessage.includes("locked") ||
          errorMessage.includes("temporarily locked")
        ) {
          setApiError(
            "Tài khoản của bạn tạm thời bị khóa. Vui lòng thử lại sau."
          );
        } else if (
          errorMessage.includes("invalid credentials") ||
          errorMessage.includes("incorrect password") ||
          errorMessage.includes("user not found")
        ) {
          setApiError("Tên đăng nhập hoặc mật khẩu không đúng.");
        } else {
          // Hiển thị thông báo lỗi từ server
          setApiError(error.message);
        }
      } else {
        setApiError("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = (values: Record<string, unknown>) => {
    handleSubmit(values as any);
  };

  return (
    <div className={styles.container}>
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
                Sign in.
              </Title>
              <Text className={styles.subtitle}>
                Don’t have account? {""}
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
                <Form.Item name="email" className={styles.formItem}>
                  <Input
                    placeholder="Email address"
                    type="email"
                    className={styles.input}
                  />
                </Form.Item>

                <Form.Item name="password" className={styles.formItem}>
                  <Input.Password
                    placeholder="Password"
                    className={styles.passwordInput}
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Link
                  href="/forget-password"
                  style={{ fontWeight: 500, color: "#726e6eff" }}
                >
                  Forget Password
                </Link>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isSubmitting}
                    className={styles.submitButton}
                    icon={<ArrowRight />}
                    iconPosition="end"
                  >
                    Sign In
                  </Button>
                </Form.Item>

                <Divider className={styles.divider}>or</Divider>

                <div className={styles.socialButtonsWrapper}>
                  <Button
                    icon={<FacebookIcon width={20} height={20} />}
                    className={styles.socialButton}
                  >
                    Sign up with Facebook
                  </Button>
                  <Button
                    icon={<GoogleIcon width={20} height={20} />}
                    className={styles.socialButton}
                  >
                    Sign up with Google
                  </Button>
                </div>
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
    </div>
  );
}
