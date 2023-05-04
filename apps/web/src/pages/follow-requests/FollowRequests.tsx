import { Helmet } from 'react-helmet';
import { MainLayout } from '../../layouts';

function FollowRequests(): JSX.Element {
  return (
    <MainLayout>
      <div className="mt-8">
        <Helmet>
          <title>FollowRequests | Vevericka</title>
        </Helmet>
        <h2 className="text-2xl font-medium text-midnight dark:text-white">Follow Requests</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight dark:border-white dark:bg-white" />
        <div className="mt-4 text-midnight dark:text-white">WIP</div>
      </div>
    </MainLayout>
  );
}

export default FollowRequests;
