import { Footer } from '../../components';
import { MainLayout } from '../../layouts';
import Content from './components/Content';

function Settings(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      <MainLayout>
        <Content />
      </MainLayout>
      <Footer className="absolute bottom-0 right-0 left-0 mx-auto" />
    </div>
  );
}

export default Settings;
