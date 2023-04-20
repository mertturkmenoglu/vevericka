import { Helmet } from 'react-helmet';
import { Footer } from '../../components';
import { useAuth } from '../../hooks';
import { MainLayout } from '../../layouts';
import Content from './components/Content';

function Settings(): JSX.Element {
  const { data } = useAuth();

  if (!data) {
    return <></>;
  }

  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>Settings | Vevericka</title>
      </Helmet>
      <MainLayout>
        <Content user={data} />
      </MainLayout>
      <Footer className="absolute bottom-0 left-0 right-0 mx-auto" />
    </div>
  );
}

export default Settings;
