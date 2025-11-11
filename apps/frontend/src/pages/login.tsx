import React from 'react';
import dynamic from 'next/dynamic';

// Import LoginForm dynamically to avoid SSR issues with 'use client' component
const LoginForm = dynamic(() => import('../features/auth/LoginForm'), { ssr: false });

export default function LoginPage() {
  return <LoginForm />;
}

