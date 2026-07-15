"use client";

import Link from "next/link";
import { BriefcaseBusiness, Home, MonitorPlay, Users } from "lucide-react";

import Header from "@/components/NavHeader";
import Logo from "@/components/brand/LogoRecruitify/Logo";
import NavMenu, { type NavMenuItem } from "@/components/NavMenu";

import EmployerActions from "../EmployerActions";
import EmployerMobileActions from "../EmployerMobileActions";
import EmployerMobileSidebar from "../EmployerMobileSidebar";



// Sửa menu điều hướng của employer tại đây
const navItems: NavMenuItem[] = [
  { key: "/employer", label: "Home", icon: <Home size={20} /> },
  {
    key: "/employer/jobs",
    label: "Jobs",
    href: "/employer/jobs",
    icon: <BriefcaseBusiness size={20} />,
  },
  {
    key: "/employer/matches",
    label: "Matches",
    href: "/employer/matches",
    icon: <Users size={20} />,
  },
  {
    key: "/employer/screening",
    label: "Screening",
    href: "/employer/screening",
    icon: <MonitorPlay size={20} />,
  },
];

export default function EmployerHeader() {
  return (
    <Header
      actions={<EmployerActions />}
      mobileActions={({ toggleRightNav }) => (
        <EmployerMobileActions toggleRightNav={toggleRightNav} />
      )}
      mobileRightNavContent={(close) => (
        <EmployerMobileSidebar onClose={close} />
      )}
      logo={
        <Link href="/">
          <Logo />
        </Link>
      }
      nav={
        <nav aria-label="Main navigation">
          <NavMenu items={navItems} />
        </nav>
      }
    />
  );
}
