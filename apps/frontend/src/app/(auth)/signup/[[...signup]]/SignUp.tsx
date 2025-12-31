"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FacebookIcon from "@/access/icons/facebook.svg";
import GoogleIcon from "@/access/icons/google.svg";
import styles from "./SignIn.module.css";
import LogoRecruitify from "@/access/icons/LogoRecrutifyDark.svg";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Divider,
  App,
} from "antd";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { RegisterRequest } from "@shared/auth";
import { STATS_DATA, statsIcons } from "@/const/register.const";
const { Title, Text, Link } = Typography;



// ===== VALIDATION SCHEMA =====
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "At least 3 characters")
    .max(30, "Max 30 characters")
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "Only letters, numbers, dot and underscore allowed"
    )
    .notOneOf(["admin", "root"], "This username is reserved")
    .required("Please input your username!"),
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Please input your email!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters!")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .matches(/(?=.*\d)/, "Password must contain a digit")
    .matches(
      /(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?])/,
      "Password must contain a special character"
    )
    .required("Please input your password!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match!")
    .required("Please confirm your password!"),
  agree: yup.boolean().oneOf([true], "Please accept the Terms of Services"),
});

// ===== MAIN COMPONENT =====
function SignUpPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { register } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { message } = App.useApp();
  const handleSubmit = async (
    values: Omit<RegisterRequest, "roles"> & {
      confirmPassword: string;
      agree: boolean;
    }
  ) => {
    try {
      setApiError(null);
      setRegistrationSuccess(false);

      // Loại bỏ confirmPassword và agree khỏi data gửi lên API
      const { confirmPassword, agree, ...registerData } = values;

      const response = await register(registerData);

      if (response.success) {
        setRegistrationSuccess(true);
        message.success("Đăng ký thành công!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setApiError(response.message ?? "Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      if (error instanceof Error) {
        setApiError(error.message ?? "Đăng ký thất bại");
      } else {
        setApiError("Đã xảy ra lỗi không mong muốn");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateWithYup = async (values: Record<string, unknown>) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return true;
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        const fields = err.inner.reduce(
          (acc: { name: string[]; errors: string[] }[], curr) => {
            if (curr.path)
              acc.push({ name: [curr.path], errors: [curr.message] });
            return acc;
          },
          []
        );
        if (fields.length) form.setFields(fields);
      }
      return false;
    }
  };

  const validateFieldWithYup = async (
    field: string,
    values: Record<string, unknown>
  ) => {
    try {
      await validationSchema.validateAt(field, values);
      return true;
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        // Chỉ set error khi có lỗi
        form.setFields([{ name: [field], errors: [err.message] }]);
      } else {
        console.error("Unexpected validation error", err);
      }
      return false;
    }
  };

  const onFinish = async (values: Record<string, unknown>) => {
    const ok = await validateWithYup(values);
    if (!ok) return;
    await handleSubmit(values as any);
  };

  const onValuesChange = async (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    const keys = Object.keys(changedValues);

    for (const k of keys) {
      if (k === "password" && allValues["confirmPassword"]) {
        await validateFieldWithYup("confirmPassword", allValues);
      }
    }
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
                Create account.
              </Title>
              <Text className={styles.subtitle}>
                Already have account?{" "}
                <Link
                  href="/login"
                  style={{ fontWeight: 500, color: "#18191c" }}
                >
                  Sign In
                </Link>
              </Text>

              <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
                requiredMark={false}
              >
                <Form.Item name="username" className={styles.formItem}>
                  <Input placeholder="Username" className={styles.input} />
                </Form.Item>

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

                <Form.Item name="confirmPassword" className={styles.formItem}>
                  <Input.Password
                    placeholder="Confirm Password"
                    className={styles.passwordInput}
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  className={styles.formItem}
                >
                  <Checkbox className={styles.checkbox}>
                    I've read and agree with your{" "}
                    <Link href="/terms">Terms of Services</Link>
                  </Checkbox>
                </Form.Item>

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
                    Create Account
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

export default SignUpPage;
