"use client";

import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './ResetPassword.module.css';
import LogoRecruitify from '@/access/icons/LogoRecrutifyDark.svg';

const { Title, Text } = Typography;

function ResetPasswordPage() {
    const [form] = Form.useForm();

    const onFinish = (values: { newPassword: string; confirmPassword: string }) => {
        console.log('Reset password submit:', values);
        // TODO: call reset password API
    };

    return (
        <div className={styles.container}>
            {/* Logo */}
            <div className={styles.logo} suppressHydrationWarning>
                <div className={styles.logoRow} suppressHydrationWarning>
                    <LogoRecruitify />
                    <span className={styles.logoText}>RecruitJob</span>
                </div>
            </div>

            {/* Frame */}
            <div className={styles.frame} suppressHydrationWarning>
                <div className={styles.frameBox} suppressHydrationWarning>
                    <div className={styles.frameInner} suppressHydrationWarning>
                        <Title level={2} className={styles.title}>Reset Password</Title>
                        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} className={styles.form}>
                            <Form.Item name="newPassword" rules={[
                                { required: true, message: 'Please enter new password' },
                                { min: 8, message: 'Password must be at least 8 characters' },
                                { pattern: /(?=.*[a-z])/, message: 'Password must contain a lowercase letter' },
                                { pattern: /(?=.*[A-Z])/, message: 'Password must contain an uppercase letter' },
                                { pattern: /(?=.*\d)/, message: 'Password must contain a digit' },
                                { pattern: /(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?])/, message: 'Password must contain a special character' }
                            ]} className={styles.formItem}>
                                <Input.Password
                                    placeholder="New Password"
                                    size="large"
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="confirmPassword" dependencies={["newPassword"]} className={styles.formItem} rules={[
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
                                    className={styles.input}
                                />
                            </Form.Item>
                            <div className={styles.buttonWrapper} suppressHydrationWarning>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    className={styles.button}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>

                {/* Note */}
                <div className={styles.note} suppressHydrationWarning>
                    <Text>
                        <span className={styles.noteStrong}>Note:</span> Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
