import React from 'react';
import { Helmet } from 'react-helmet';
import { MainLayout } from '../../layouts';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <MainLayout>
      <div className="flex w-full flex-col">
        <Helmet>
          <title>Search | Vevericka</title>
        </Helmet>
        {children}
      </div>
    </MainLayout>
  );
}

export default Layout;
