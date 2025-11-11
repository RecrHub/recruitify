'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Divider, Space, message } from 'antd';
import { ArrowRightOutlined, FacebookFilled, LeftOutlined } from '@ant-design/icons';
import * as yup from 'yup';

const { Title, Text } = Typography;

function Register() {
    const [form] = Form.useForm();

    // Yup validation schema (authoritative source of validation)
    const validationSchema = yup.object().shape({
        username: yup.string()
            .trim()
            .min(3, 'At least 3 characters')
            .max(30, 'Max 30 characters')
            .matches(/^[a-zA-Z0-9._]+$/, 'Only letters, numbers, dot and underscore allowed')
            .notOneOf(['admin', 'root'], 'This username is reserved')
            .required('Please input your username!'),
        email: yup.string().email('Please enter a valid email!').required('Please input your email!'),
        // Match backend: min 8, at least one upper, one lower, one digit and one special char
        password: yup.string()
            .min(8, 'Password must be at least 8 characters!')
            .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
            .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
            .matches(/(?=.*\d)/, 'Password must contain a digit')
            .matches(/(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?])/, 'Password must contain a special character')
            .required('Please input your password!'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match!').required('Please confirm your password!'),
        agree: yup.boolean().oneOf([true], 'Please accept the Terms of Services')
    });

    // Map Yup validation errors to antd Form fields and set them
    const validateWithYup = async (values: Record<string, unknown>) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            return true;
        } catch (err: unknown) {
            // Narrow to Yup's ValidationError for proper typing
            if (err instanceof yup.ValidationError) {
                const fields = err.inner.reduce((acc: { name: string[]; errors: string[] }[], curr) => {
                    if (curr.path) acc.push({ name: [curr.path], errors: [curr.message] });
                    return acc;
                }, []);
                if (fields.length) form.setFields(fields);
            } else {
                // Unexpected error: surface to console and show a toast so devs/users know
                // (do not expose internal error details to users)
                console.error('Unexpected validation error', err);
                message.error('Unexpected validation error. Please try again.');
            }
            return false;
        }
    };

    // Validate a single field as user types (uses Yup.validateAt)
    const validateFieldWithYup = async (field: string, values: Record<string, unknown>) => {
        try {
            // validateAt throws if the field is invalid
            await validationSchema.validateAt(field, values);
            // clear field error if present
            form.setFields([{ name: [field], errors: [] }]);
            return true;
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                form.setFields([{ name: [field], errors: [err.message] }]);
            } else {
                console.error('Unexpected validation error', err);
            }
            return false;
        }
    };

    const onFinish = async (values: Record<string, unknown>) => {
        // Run Yup validation before actual submit
        const ok = await validateWithYup(values);
        if (!ok) return;
        message.success('Validation passed — ready to submit');
        console.log('Form values:', values);
        // Xử lý đăng ký ở đây (gọi API...)
    };

    // THÊM statsData VÀO ĐÂY
    const statsData = [
        { number: '1,75,324', label: 'Live Job' },
        { number: '97,354', label: 'Companies' },
        { number: '7,532', label: 'New Jobs' }
    ];

    // Debounced email uniqueness check (only check email, not username)
    const emailCheckTimer = useRef<number | null>(null);
    const runEmailCheck = (email: string) => {
        // clear previous timer
        if (emailCheckTimer.current) {
            clearTimeout(emailCheckTimer.current);
        }
        // debounce 500ms
        emailCheckTimer.current = window.setTimeout(async () => {
            try {
                const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
                if (!res.ok) return;
                const json = await res.json();
                // if email exists, set field error; otherwise clear it (only if value unchanged)
                const current = form.getFieldValue('email');
                if (current === email) {
                    if (json.exists) {
                        form.setFields([{ name: ['email'], errors: ['This email is already registered'] }]);
                    } else {
                        form.setFields([{ name: ['email'], errors: [] }]);
                    }
                }
            } catch (err) {
                console.error('Email check failed', err);
            }
        }, 500) as unknown as number;
    };

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            background: '#ffffff', // Sửa thành #ffffff
            margin: '0 auto', // Sửa thành 0 auto
            position: 'relative',
        }}>
            <Row style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
                {/* Diagonal divider: bigger and centered so it reaches bottom corner (match Login) */}
                <div
                    style={{
                        position: 'absolute',
                        left: '48%',
                        top: '2%',
                        height: '300vh',
                        width: '280px',
                        transform: 'translate(-50%, -50%) rotate(6.5deg)',
                        background: 'linear-gradient(to right, transparent 0%, #fff 52%, #fff 100%)',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                />

                {/* --- Cột bên trái: Form --- */}
                <Col
                    span={12}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '24px',
                        background: '#FFF',
                        position: 'relative',
                        height: '100vh'
                    }}
                >
                    {/* Back button - đưa lên trên cùng */}
                    <Button
                        type="text"
                        icon={<LeftOutlined />}
                        style={{
                            padding: 0,
                            marginBottom: '20px',
                            color: '#666',
                            alignSelf: 'flex-start',
                            height: 'auto'
                        }}
                    >
                        Back to home
                    </Button>

                    {/* Phần form căn giữa */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginTop: '10px'
                    }}>
                        <div style={{ width: '100%', maxWidth: 380 }}>
                            {/* Logo */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24" fill="none">
                                        <path d="M12.042 10V23H0.5V10H12.042Z" fill="black" stroke="black" />
                                        <path d="M29.7648 16.2664L29.5861 16.1169L21.2247 9.11694L21.0851 8.99976H13.0421V0.666748H24.8829L39.2169 14.3796V22.9998H29.7648V16.2664Z" fill="black" stroke="black" />
                                    </svg>
                                    <span style={{
                                        fontSize: '20px',
                                        fontWeight: 700,
                                        color: '#000',
                                        letterSpacing: '-0.5px'
                                    }}>
                                        RecruitJob
                                    </span>
                                </div>
                            </div>

                            {/* Header */}
                            <Title level={2} style={{ marginBottom: 8, fontWeight: 600 }}>
                                Create account.
                            </Title>
                            <Text type="secondary" style={{ fontSize: '14px' }}>
                                Already have account{'? '}
                                <a href="#" style={{ fontWeight: 500, color: '#000' }}>Log In</a>
                            </Text>

                            {/* Form */}
                            <Form
                                form={form}
                                layout="vertical"
                                style={{ marginTop: 16 }}
                                onFinish={onFinish}
                                requiredMark={false}
                                onValuesChange={async (changedValues, allValues) => {
                                    // Run per-field validation as user types (immediate feedback)
                                    const keys = Object.keys(changedValues);
                                    const all = allValues as Record<string, unknown>;
                                    for (const k of keys) {
                                        // validate the changed field
                                        const valid = await validateFieldWithYup(k, all);
                                        // if user changed password, also revalidate confirmPassword so mismatch shows immediately
                                        if (k === 'password' && all['confirmPassword']) {
                                            await validateFieldWithYup('confirmPassword', all);
                                        }
                                        // If the changed field is email and passes format validation, run uniqueness check (debounced)
                                        if (k === 'email' && valid) {
                                            const emailVal = String(all['email'] ?? '');
                                            if (emailVal) runEmailCheck(emailVal);
                                        }
                                    }
                                }}
                            >
                                {/* Validation handled by Yup schema (see validationSchema) */}
                                <Form.Item name="username">
                                    <Input
                                        placeholder="Username"
                                        size="large"
                                        style={{ borderRadius: '6px', height: 36 }}
                                    />
                                </Form.Item>

                                <Form.Item name="email">
                                    <Input
                                        placeholder="Email address"
                                        size="large"
                                        style={{ borderRadius: '6px' }}
                                    />
                                </Form.Item>

                                <Form.Item name="password">
                                    <Input.Password
                                        placeholder="Password"
                                        size="middle"
                                        style={{ borderRadius: '6px', height: 36 }}
                                    />
                                </Form.Item>

                                <Form.Item name="confirmPassword">
                                    <Input.Password
                                        placeholder="Confirm Password"
                                        size="middle"
                                        style={{ borderRadius: '6px', height: 36 }}
                                    />
                                </Form.Item>

                                <Form.Item name="agree" valuePropName="checked">
                                    <Checkbox style={{ fontSize: '14px' }}>
                                        I have read and agree with your{' '}
                                        <a href="#" style={{ fontWeight: 500 }}>Terms of Services</a>
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        size="middle"
                                        style={{
                                            background: '#000',
                                            borderColor: '#000',
                                            marginBottom: 12,
                                            height: 36,
                                            fontSize: 14,
                                            fontWeight: 500,
                                            borderRadius: '6px'
                                        }}
                                        icon={<ArrowRightOutlined />}
                                    >
                                        Create account
                                    </Button>
                                </Form.Item>

                                <Divider style={{ color: '#d9d9d9', fontSize: '14px' }}>or</Divider>

                                <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }} size={16}>
                                    <Button
                                        icon={<FacebookFilled style={{ color: '#1877F2' }} />}
                                        size="middle"
                                        style={{ height: 40, fontSize: 14, borderRadius: '6px', flex: 1 }}
                                    >
                                        Sign up with Facebook
                                    </Button>
                                    <Button
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <g clipPath="url(#clip0_1071_3397)">
                                                    <path d="M4.43242 12.0863L3.73625 14.6852L1.19176 14.739C0.431328 13.3286 0 11.7149 0 10C0 8.34179 0.403281 6.77804 1.11812 5.40112H1.11867L3.38398 5.81644L4.37633 8.06815C4.16863 8.67366 4.05543 9.32366 4.05543 10C4.05551 10.7341 4.18848 11.4374 4.43242 12.0863Z" fill="#FBBB00" />
                                                    <path d="M19.8252 8.13184C19.94 8.73676 19.9999 9.36148 19.9999 9.99996C19.9999 10.7159 19.9246 11.4143 19.7812 12.0879C19.2944 14.3802 18.0224 16.3818 16.2604 17.7983L16.2598 17.7978L13.4065 17.6522L13.0027 15.1313C14.1719 14.4456 15.0857 13.3725 15.567 12.0879H10.2197V8.13184H15.645H19.8252Z" fill="#518EF8" />
                                                    <path d="M16.26 17.7977L16.2606 17.7983C14.5469 19.1757 12.3699 19.9999 10.0001 19.9999C6.19189 19.9999 2.88092 17.8713 1.19189 14.7389L4.43256 12.0862C5.27705 14.34 7.45123 15.9444 10.0001 15.9444C11.0957 15.9444 12.1221 15.6483 13.0029 15.1312L16.26 17.7977Z" fill="#28B446" />
                                                    <path d="M16.383 2.30219L13.1434 4.95437C12.2319 4.38461 11.1544 4.05547 10 4.05547C7.39344 4.05547 5.17859 5.73348 4.37641 8.06812L1.11871 5.40109H1.11816C2.78246 2.1923 6.13519 0 10 0C12.4264 0 14.6511 0.864297 16.383 2.30219Z" fill="#F14336" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1071_3397">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        }
                                        size="middle"
                                        style={{ height: 40, fontSize: 14, borderRadius: '6px', flex: 1 }}
                                    >
                                        Sign up with Google
                                    </Button>
                                </Space>
                            </Form>
                        </div>
                    </div>
                </Col>

                {/* --- Cột bên phải: Background Image + text --- */}
                <Col
                    span={12}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff',
                        padding: '24px',
                        textAlign: 'center',
                        position: 'relative',
                        height: '100vh',
                        overflow: 'hidden'
                    }}
                >
                    {/* Background Image with gradient overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(180deg, rgba(13, 60, 4, 0.45) 0%, rgba(4, 60, 17, 0.90) 100%), url('/bg.jpg') lightgray 50% / cover no-repeat",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 0
                    }}></div>

                    <div style={{ width: '100%', position: 'relative', zIndex: 2, paddingTop: '300px' }}>
                        {/* Title aligned to the left (near divider) and slightly smaller */}
                        <div style={{ paddingLeft: '120px', marginBottom: '40px', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ maxWidth: '420px' }}>
                                <Title level={1} style={{
                                    color: '#fff',
                                    fontSize: '28px',
                                    margin: 0,
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    letterSpacing: '-0.02em',
                                    textAlign: 'left'
                                }}>
                                    Over 1,75,324 candidates<br />
                                    waiting for good employees.
                                </Title>
                            </div>
                        </div>

                        {/* Icons aligned to the same left edge as the title */}
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ paddingLeft: '120px', maxWidth: '600px', width: '100%' }}>
                                <Row gutter={[40, 0]} style={{ maxWidth: '600px' }}>
                                    {statsData.map((stat, index) => (
                                        <Col key={index} span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <div
                                                style={{
                                                    width: 72,
                                                    height: 72,
                                                    borderRadius: 22,
                                                    border: '1px solid rgba(255,255,255,0.16)',
                                                    background: 'linear-gradient(140deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: 14,
                                                    boxShadow: '0 18px 32px rgba(0,0,0,0.25)',
                                                    backdropFilter: 'blur(10px)'
                                                }}
                                            >
                                                {index === 0 ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none">
                                                        <g clipPath="url(#clip0_136_1349)">
                                                            <path opacity="0.2" d="M16 18.9999C11.7872 19.0066 7.64764 17.8991 4.00098 15.7897V25.9999C4.00098 26.1313 4.02684 26.2613 4.0771 26.3826C4.12735 26.504 4.20101 26.6142 4.29387 26.7071C4.38673 26.7999 4.49697 26.8736 4.61829 26.9238C4.73962 26.9741 4.86965 26.9999 5.00098 26.9999H27.001C27.1323 26.9999 27.2623 26.9741 27.3837 26.9238C27.505 26.8736 27.6152 26.7999 27.7081 26.7071C27.8009 26.6142 27.8746 26.504 27.9249 26.3826C27.9751 26.2613 28.001 26.1313 28.001 25.9999V15.7886C24.3539 17.8987 20.2135 19.0066 16 18.9999Z" fill="white" />
                                                            <path d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M28.001 15.7886C24.3539 17.8986 20.2136 19.0066 16 18.9999C11.7872 19.0066 7.64755 17.899 4.00085 15.7896" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M14.5 15H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_136_1349">
                                                                <rect width="32" height="32" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                ) : index === 1 ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
                                                        <g clipPath="url(#clip0_136_1361)">
                                                            <path opacity="0.2" d="M17.9993 26.9978V4.9978C17.9993 4.73259 17.8939 4.47823 17.7064 4.2907C17.5188 4.10316 17.2645 3.9978 16.9993 3.9978H4.99927C4.73405 3.9978 4.4797 4.10316 4.29216 4.2907C4.10462 4.47823 3.99927 4.73259 3.99927 4.9978V26.9978" fill="white" />
                                                            <path d="M2 26.9978H30" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M17.9993 26.9978V4.9978C17.9993 4.73259 17.8939 4.47823 17.7064 4.2907C17.5188 4.10316 17.2645 3.9978 16.9993 3.9978H4.99927C4.73405 3.9978 4.4797 4.10316 4.29216 4.2907C4.10462 4.47823 3.99927 4.73259 3.99927 4.9978V26.9978" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M27.9993 26.9978V12.9978C27.9993 12.7326 27.8939 12.4782 27.7064 12.2907C27.5188 12.1032 27.2645 11.9978 26.9993 11.9978H17.9993" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M7.99927 8.9978H11.9993" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M9.99927 16.9978H13.9993" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M7.99927 21.9978H11.9993" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M21.9993 21.9978H23.9993" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M21.9993 16.9978H23.9993" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_136_1361">
                                                                <rect width="32" height="32" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                ) : (
                                                    <Image
                                                        src="/file.svg"
                                                        width={22}
                                                        height={22}
                                                        alt="stat icon"
                                                        style={{ filter: 'brightness(0) invert(1)' }}
                                                    />
                                                )}
                                            </div>
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: '18px',
                                                display: 'block',
                                                marginBottom: 6,
                                                fontWeight: 600,
                                                lineHeight: 1.2,
                                                textAlign: 'left'
                                            }}>
                                                {stat.number}
                                            </Text>
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                opacity: 0.7,
                                                textAlign: 'left'
                                            }}>
                                                {stat.label}
                                            </Text>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Register;
