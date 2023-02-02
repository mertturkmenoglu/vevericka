import { AppBar, Footer } from '../../components';
import Content from './components/Content';

function Settings(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      <main className="container mx-auto">
        <AppBar className="sm:mt-4" />
        <div className="mt-4 flex rounded">
          <Content />
        </div>
      </main>
      <Footer className="absolute bottom-0 right-0 left-0 mx-auto" />
    </div>
  );
}

export default Settings;
