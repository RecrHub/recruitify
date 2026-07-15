'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useAdminStore } from '@/stores/admin/useAdminStore';

interface EmployerGuardProps {
  children: React.ReactNode;
}

export default function EmployerGuard({ children }: EmployerGuardProps) {
  const router = useRouter();
  const { adminInfo, isAuthenticated } = useAdminStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(useAdminStore.persist.hasHydrated());
    const unsubFinishHydration = useAdminStore.persist.onFinishHydration(() => setHasHydrated(true));
    return () => {
      if (unsubFinishHydration) unsubFinishHydration();
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) return; // Wait until Zustand loads state from localStorage

    // Check if the user is authenticated and has an appropriate role
    if (!isAuthenticated) {
      router.replace('/employer/login');
      return;
    }

    // Role check (assuming employer role is EMPLOYER or CUSTOMER_ADMIN etc. Adjust if needed)
    if (adminInfo?.role !== 'EMPLOYER' && adminInfo?.role !== 'CUSTOMER_ADMIN' && adminInfo?.role !== 'HR') {
       // Optional: router.replace('/');
    }
    
  }, [isAuthenticated, adminInfo?.role, router, hasHydrated]);

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
