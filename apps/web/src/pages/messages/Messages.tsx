import { Helmet } from 'react-helmet';
import { MainLayout } from '../../layouts';

function Messages(): JSX.Element {
  return (
    <MainLayout>
      <div className="mt-8">
        <Helmet>
          <title>Messages | Vevericka</title>
        </Helmet>
        <h2 className="text-2xl font-medium text-midnight dark:text-white">Messages</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight dark:border-white dark:bg-white" />
        <div className="mt-4 text-midnight dark:text-white">Messages</div>
      </div>
    </MainLayout>
  );
}

export default Messages;
