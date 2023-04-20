import { Helmet } from 'react-helmet';
import { MainLayout } from '../../layouts';

function Explore(): JSX.Element {
  return (
    <MainLayout>
      <div className="mt-8">
        <Helmet>
          <title>Explore | Vevericka</title>
        </Helmet>
        <h2 className="text-2xl font-medium">Explore</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight" />
        <div className="mt-4">WIP</div>
      </div>
    </MainLayout>
  );
}

export default Explore;
