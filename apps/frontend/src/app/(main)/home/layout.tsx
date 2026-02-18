import LandingLayout from '../../(landing)/LandingLayout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingLayout>{children}</LandingLayout>;
}
