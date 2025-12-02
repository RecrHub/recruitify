"use client";
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function Reset_Password() {
    const [form] = Form.useForm();

    const onFinish = (values: { newPassword: string; confirmPassword: string }) => {
        console.log('Reset password submit:', values);
        // TODO: call reset password API
    };

    return (
        <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48 }} suppressHydrationWarning>
            {/* Logo */}
            <div style={{ width: '100%', maxWidth: 620, padding: '0 24px', marginBottom: 56 }} suppressHydrationWarning>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} suppressHydrationWarning>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24" fill="none">
                        <path d="M12.042 10V23H0.5V10H12.042Z" fill="black" stroke="black" />
                        <path d="M29.7648 16.2664L29.5861 16.1169L21.2247 9.11694L21.0851 8.99976H13.0421V0.666748H24.8829L39.2169 14.3796V22.9998H29.7648V16.2664Z" fill="black" stroke="black" />
                    </svg>
                    <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', color: '#000' }}>RecruitJob</span>
                </div>
            </div>

            {/* Frame */}
            <div style={{ width: '100%', maxWidth: 620, padding: '0 24px' }} suppressHydrationWarning>
                <div style={{ border: '1px dashed #c9c9c9', padding: '32px 0 0', position: 'relative' }} suppressHydrationWarning>
                    <div style={{ padding: '0 32px 32px' }} suppressHydrationWarning>
                        <Title level={2} style={{ textAlign: 'center', fontWeight: 600, marginBottom: 32 }}>Reset Password</Title>
                        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} style={{ margin: 0 }}>
                            <Form.Item name="newPassword" rules={[
                                { required: true, message: 'Please enter new password' },
                                { min: 8, message: 'Password must be at least 8 characters' },
                                { pattern: /(?=.*[a-z])/, message: 'Password must contain a lowercase letter' },
                                { pattern: /(?=.*[A-Z])/, message: 'Password must contain an uppercase letter' },
                                { pattern: /(?=.*\d)/, message: 'Password must contain a digit' },
                                { pattern: /(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?])/, message: 'Password must contain a special character' }
                            ]} style={{ marginBottom: 16 }}>
                                <Input.Password
                                    placeholder="New Password"
                                    size="large"
                                    style={{
                                        borderRadius: '6px',
                                        height: 44,
                                        border: '1px solid #e5e5e5',
                                        background: '#fff'
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name="confirmPassword" dependencies={["newPassword"]} style={{ marginBottom: 24 }} rules={[
                                { required: true, message: 'Please confirm password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                                        return Promise.reject(new Error('Passwords do not match'));
                                    }
                                })
                            ]}>
                                <Input.Password
                                    placeholder="Confirm Password"
                                    size="large"
                                    style={{
                                        borderRadius: '6px',
                                        height: 44,
                                        border: '1px solid #e5e5e5',
                                        background: '#fff'
                                    }}
                                />
                            </Form.Item>
                            <div style={{ marginTop: 8 }} suppressHydrationWarning>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    style={{
                                        background: '#000',
                                        borderColor: '#000',
                                        height: 56,
                                        fontSize: 15,
                                        fontWeight: 500,
                                        borderRadius: 0
                                    }}
                                    icon={<ArrowRightOutlined />}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>

                {/* Note */}
                <div style={{ maxWidth: 620, padding: '24px 24px 0' }} suppressHydrationWarning>
                    <Text style={{ display: 'block', fontSize: 12, lineHeight: 1.5 }}>
                        <span style={{ fontWeight: 600 }}>Note:</span> Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default Reset_Password;
