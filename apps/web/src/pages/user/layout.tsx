import React from 'react';
import { Helmet } from 'react-helmet';
import { MainLayout } from '../../layouts';

export interface LayoutProps {
  children: React.ReactNode;
  name: string;
}

function Layout({ children, name }: LayoutProps): JSX.Element {
  return (
    <MainLayout>
      <div className="w-full">
        <Helmet>
          <title>{name} | Vevericka</title>
        </Helmet>
        {children}
      </div>
    </MainLayout>
  );
}

export default Layout;
