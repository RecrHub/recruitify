import { ReactNode } from 'react';
import GlobalLayout from '@/layout/GlobalProvider';
import { AuthProvider } from '@/context/AuthContext';
interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html dir="ltr" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <GlobalLayout appearance={'light'}>
            {children}
          </GlobalLayout>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;