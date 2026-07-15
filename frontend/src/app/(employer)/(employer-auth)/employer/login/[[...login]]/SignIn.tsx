"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  App,
} from "antd";
import LogoRecruitify from "@/access/icons/LogoRecrutifyDark.svg";
import styles from "./SignIn.module.css";
import { useRouter } from "next/navigation";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Link from "next/link";
import adminAuthService from "@/services/apiAdmin/adminAuthService";
import { useAdminStore } from "@/stores/admin/useAdminStore";
import Alert from "@/components/Alert";
import Silk from "@/components/Silk";
const { Title } = Typography;

interface LoginFormProps {
  sessionExpired?: boolean;
}

export default function LoginForm({ sessionExpired = false }: LoginFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [sessionWarning, setSessionWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0); // For handling API 429 Rate Limit (60s lock)
  const { message } = App.useApp();

  const setAdminAuth = useAdminStore((state) => state.setAdminAuth);

  // Show session expired message when redirected with ?session=expired
  useEffect(() => {
    if (sessionExpired) {
      setSessionWarning("Your session has expired. Please sign in again.");
    }
  }, [sessionExpired]);

  // Auto-clear session warning after 5 seconds
  useEffect(() => {
    if (sessionWarning) {
      const timer = setTimeout(() => setSessionWarning(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [sessionWarning]);

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      form.setFieldsValue({
        email: savedEmail,
        remember: true,
      });
    }
  }, [form]);

  // Rate Limit Countdown Timer
  useEffect(() => {
    if (lockCountdown > 0) {
      const timer = setTimeout(() => setLockCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockCountdown]);

  // Auto-clear API errors after 5 seconds
  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => setApiError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const handleSubmit = async (values: { email: string; password: string; remember?: boolean }) => {
    try {
      setApiError(null);
      setIsSubmitting(true);

      const response: any = await adminAuthService.login(values.email, values.password);

      const adminInfo = {
        id: response.id,
        email: response.email,
        role: response.role
      };

      setAdminAuth(
        adminInfo,
        response.accessToken,
        response.refreshToken || "",
        response.tokenType || "Bearer"
      );

      if (values.remember) {
        localStorage.setItem("remembered_email", values.email);
      } else {
        localStorage.removeItem("remembered_email");
      }

      message.success("Login successful! Welcome back.");

      setTimeout(() => {
        window.location.href = "/employer";
      }, 1500);

    } catch (error: any) {
      console.error("Login error:", error);

      const errorMessage = error?.message?.toLowerCase() || "";
      const errorStatus = error?.status || error?.response?.status;

      if (errorStatus === 429 || errorMessage.includes("too many attempts") || errorMessage.includes("429")) {
        setApiError("Too many login attempts. Please try again later.");
        setLockCountdown(60);
        return;
      }

      if (
        errorStatus === 401 ||
        errorMessage.includes("invalid") ||
        errorMessage.includes("incorrect") ||
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("not found")
      ) {
        setApiError("Incorrect email/password or your account is not registered as an HR account.");
      }
      // Xử lý lỗi 403: Account is deactivated (theo đúng mô tả Swagger)
      else if (errorStatus === 403 || errorMessage.includes("deactivated") || errorMessage.includes("disabled")) {
        setApiError("Your account has been deactivated. Please contact the administrator.");
      } else {
        setApiError(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = (values: Record<string, unknown>) => {
    handleSubmit(values as { email: string; password: string; remember?: boolean });
  };

  return (
    <div className={styles.container}>
      {(apiError || sessionWarning) && (
        <div
          className={styles.alertPopup}
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            minWidth: 320,
            maxWidth: 420,
          }}
        >
          {apiError && (
            <Alert
              type="error"
              description={apiError}
              showIcon
              closable
              afterClose={() => setApiError(null)}
            />
          )}
          {sessionWarning && (
            <Alert
              type="warning"
              description={sessionWarning}
              showIcon
              closable
              afterClose={() => setSessionWarning(null)}
            />
          )}
        </div>
      )}

      <div className={styles.langSwitch}>
        <span>EN</span> | <span>VI</span>
      </div>

      <div className={styles.row}>
        {/* LEFT COLUMN: HERO IMAGE */}
        <div className={styles.leftColumn}>
          <Silk
            color="#428E72"
            speed={5}
            scale={1.2}
            noiseIntensity={1.5}
          />
        </div>

        {/* RIGHT COLUMN: LOGIN FORM */}
        <div className={styles.rightColumn}>
          <div className={styles.formWrapper}>
            <div className={styles.formContainer}>

              <div className={styles.logoContainer}>
                <div className={styles.logo}>
                  <LogoRecruitify />
                  <span className={styles.logoText}>Recruitify</span>
                </div>
                <span className={styles.adminTag}>CUSTOMER ADMIN SITE</span>
              </div>

              <Title level={2} className={styles.title}>
                Welcome to Recruitify Customer
              </Title>

              <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onFinish={onFinish}
                requiredMark={false}
                disabled={isSubmitting || lockCountdown > 0}
              >
                {/* FRONTEND VALIDATION: USERNAME / EMAIL */}
                <Form.Item
                  name="email"
                  className={styles.formItem}
                  validateTrigger={["onBlur", "onChange"]}
                  rules={[
                    { required: true, message: "Please input your username" },
                    { min: 3, message: "Username must be at least 3 characters" },
                    { max: 50, message: "Username cannot exceed 50 characters" }
                  ]}
                >
                  <Input
                    placeholder="Email or Username"
                    className={styles.input}
                    autoFocus
                  />
                </Form.Item>

                {/* FRONTEND VALIDATION: PASSWORD */}
                <Form.Item
                  name="password"
                  className={styles.formItem}
                  validateTrigger={["onBlur", "onChange"]}
                  rules={[
                    { required: true, message: "Please input your password" },
                    { min: 6, message: "Password must be at least 6 characters" },
                    { max: 100, message: "Password cannot exceed 100 characters" }
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className={styles.passwordInput}
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <div className={styles.formOptions}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className={styles.checkbox}>Remember me</Checkbox>
                  </Form.Item>
                  <Link href="/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>

                <p className={styles.termsText}>
                  By signing in, you agree to Recr's{" "}
                  <Link href="/terms">Terms & Conditions</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link> in relation to your privacy information.
                </p>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isSubmitting}
                    disabled={lockCountdown > 0}
                    className={styles.submitButton}
                  >
                    {lockCountdown > 0 ? `Try again in ${lockCountdown}s` : "Sign in"}
                  </Button>
                  <div className={styles.divider}></div>
                </Form.Item>
              </Form>

              <div className={styles.footerContact}>
                <p>Don't have a customer account yet? Contact us at:</p>
                <ul>
                  <li>📞 Ho Chi Minh: (+84) 113 114 115</li>
                  <li>📞 Ha Noi: (+84) 113 114 115</li>
                  <li>✉️ Email: love@recruitify.com</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}