'use client';

import Layout from '@/components/Layout';
import { Flexbox } from 'react-layout-kit';
import Header from '@/components/Header';
import Actions from '@/components/NavAction';
import Logo from '@/components/brand/LogoRecruitify/Logo';
import FindJobForm from '@/features/job/FindJobForm';
import { createStyles } from 'antd-style';
import Tabs from '@/components/Tabs';

export default function FindJobPage() {
  return (
    <Layout>
      <FindJobForm />
    </Layout>
  );
}
