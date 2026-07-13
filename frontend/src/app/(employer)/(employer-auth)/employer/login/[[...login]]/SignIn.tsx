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
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { message } = App.useApp();

  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => setApiError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setApiError(null);
      setLoginSuccess(false);
      setIsSubmitting(true);
      
      const response = await authService.login(values.email, values.password);

      setLoginSuccess(true);
      message.success("Đăng nhập thành công! Chào mừng bạn trở lại.");

      setTimeout(() => {
        const res = response as any;
        const userRole = res?.role || res?.user?.role || res?.data?.role;
        
        if (userRole === "EMPLOYER" || userRole === "CUSTOMER_ADMIN") {
          router.push("/employer"); 
        } else {
          router.push("/");
        }
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("account is deactivated") || errorMessage.includes("deactivated")) {
          setApiError("Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.");
        } else if (errorMessage.includes("locked") || errorMessage.includes("temporarily locked")) {
          setApiError("Tài khoản của bạn tạm thời bị khóa. Vui lòng thử lại sau.");
        } else if (errorMessage.includes("invalid credentials") || errorMessage.includes("incorrect password") || errorMessage.includes("user not found")) {
          setApiError("Tên đăng nhập hoặc mật khẩu không đúng.");
        } else {
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
    handleSubmit(values as { email: string; password: string });
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
              >
                <Form.Item 
                  name="email" 
                  className={styles.formItem}
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    className={styles.input}
                  />
                </Form.Item>

                <Form.Item 
                  name="password" 
                  className={styles.formItem}
                  rules={[{ required: true, message: 'Please input your password!' }]}
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
                    className={styles.submitButton}
                  >
                    Sign in
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