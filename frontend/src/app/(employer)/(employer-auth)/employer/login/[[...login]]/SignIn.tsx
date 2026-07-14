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
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Link from "next/link";
import authService from "@/services/authService";
import Alert from "@/components/Alert";

const { Title, Text } = Typography;

export default function LoginForm() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0);
  const { message } = App.useApp();

  // Auto-fill username if "Remember me" was previously checked
  useEffect(() => {
    const savedUsername = localStorage.getItem("remembered_username");
    if (savedUsername) {
      form.setFieldsValue({
        username: savedUsername,
        remember: true,
      });
    }
  }, [form]);

  useEffect(() => {
    if (lockCountdown > 0) {
      const timer = setTimeout(() => setLockCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockCountdown]);

  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => setApiError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const handleSubmit = async (values: { username: string; password: string; remember?: boolean }) => {
    try {
      setApiError(null);
      setIsSubmitting(true);
      
      const response = await authService.login(values.username, values.password);

      if (values.remember) {
        localStorage.setItem("remembered_username", values.username);
      } else {
        localStorage.removeItem("remembered_username");
      }

      message.success("Login successful! Welcome back.");

      setTimeout(() => {
        const res = response as any;
        const userRole = res?.role || res?.user?.role || res?.data?.role;
        
        if (userRole === "EMPLOYER" || userRole === "CUSTOMER_ADMIN") {
          router.push("/employer"); 
        } else {
          router.push("/");
        }
      }, 1500);
    } catch (error: any) {
      console.error("Login error:", error);

      if (error?.status === 429 || error?.response?.status === 429) {
        setApiError("Too many failed login attempts. Please try again later.");
        setLockCountdown(60);
        return;
      }

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("account is deactivated") || errorMessage.includes("deactivated")) {
          setApiError("Your account has been deactivated. Please contact the administrator.");
        } else if (errorMessage.includes("locked") || errorMessage.includes("temporarily locked")) {
          setApiError("Your account is temporarily locked. Please try again later.");
        } else if (errorMessage.includes("invalid credentials") || errorMessage.includes("incorrect password") || errorMessage.includes("user not found")) {
          setApiError("Incorrect username or password.");
        } else {
          setApiError(error.message);
        }
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = (values: Record<string, unknown>) => {
    handleSubmit(values as { username: string; password: string; remember?: boolean });
  };

  return (
    <div className={styles.container}>
      {apiError && (
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
          <Alert
            type="error"
            description={apiError}
            showIcon
            closable
            afterClose={() => setApiError(null)}
          />
        </div>
      )}
      
      <div className={styles.langSwitch}>
        <span>EN</span> | <span>VI</span>
      </div>

      <div className={styles.row}>
        {/* LEFT COLUMN: IMAGE */}
        <div className={styles.leftColumn}>
          <div className={styles.imageContainer}>
            <img
              src="/employer-bg.jpg"
              alt="Recruitify Recruitment"
              className={styles.heroImage}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
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

              <h2 className={styles.title}>
                Welcome to Recruitify Customer
              </h2>

              <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onFinish={onFinish}
                requiredMark={false}
                disabled={isSubmitting || lockCountdown > 0}
              >
                {/* USERNAME FIELD */}
                <Form.Item 
                  name="username" 
                  className={styles.formItem}
                  rules={[
                    { required: true, message: "Please input your username!" },
                    { min: 3, message: "Username must be at least 3 characters!" },
                    { max: 50, message: "Username cannot exceed 50 characters!" }
                  ]}
                >
                  <Input
                    placeholder="Username"
                    className={styles.input}
                    autoFocus
                  />
                </Form.Item>

                {/* PASSWORD FIELD */}
                <Form.Item 
                  name="password" 
                  className={styles.formItem}
                  rules={[
                    { required: true, message: "Please input your password!" },
                    { min: 6, message: "Password must be at least 6 characters!" },
                    { max: 100, message: "Password cannot exceed 100 characters!" }
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
                  <Link href="/forget-password" className={styles.forgotLink}>
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