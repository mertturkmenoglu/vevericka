import { Helmet } from 'react-helmet';
import { MainLayout } from '../../layouts';

function Notifications(): JSX.Element {
  return (
    <MainLayout>
      <div className="mt-8">
        <Helmet>
          <title>Notifications | Vevericka</title>
        </Helmet>
        <h2 className="text-2xl font-medium text-midnight dark:text-white">Notifications</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight dark:border-white dark:bg-white" />
        <div className="mt-4 text-midnight dark:text-white">You don't have any notifications</div>
      </div>
    </MainLayout>
  );
}

export default Notifications;
