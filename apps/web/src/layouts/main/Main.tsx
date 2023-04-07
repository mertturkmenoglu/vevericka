import clsx from 'clsx';
import { AppBar } from '../../components';

export interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  mainClassName?: string;
  appBarClassName?: string;
}

function MainLayout({ mainClassName, appBarClassName, className, children, ...props }: MainLayoutProps): JSX.Element {
  return (
    <main className={clsx('mx-auto', mainClassName)}>
      <AppBar className={clsx('py-2 px-8', appBarClassName)} />
      <div
        className={clsx('mx-auto mt-8 flex max-w-5xl items-start justify-between', className)}
        {...props}
      >
        {children}
      </div>
    </main>
  );
}

export default MainLayout;
