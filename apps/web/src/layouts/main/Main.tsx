import clsx from 'clsx';
import { AppBar } from '../../components';

export interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  mainClassName?: string;
  appBarClassName?: string;
}

function MainLayout({ mainClassName, appBarClassName, className, children, ...props }: MainLayoutProps): JSX.Element {
  return (
    <main className={clsx('mx-auto max-w-5xl', mainClassName)}>
      <AppBar className={clsx('sm:mt-4', appBarClassName)} />
      <div
        className={clsx('mt-8 flex w-full items-start justify-between', className)}
        {...props}
      >
        {children}
      </div>
    </main>
  );
}

export default MainLayout;
