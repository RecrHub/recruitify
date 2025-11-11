// src/pages/register.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const RegisterForm = dynamic(() => import('../features/auth/RegisterForm'), { ssr: false });

export default function RegisterPage() {
    return <RegisterForm />;
}

