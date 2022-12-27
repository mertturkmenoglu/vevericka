import { Footer, LandingAppBar } from '../../components';

function Home(): JSX.Element {
  return (
    <div className="relative h-screen">
      <LandingAppBar className="mt-8" />

      <Footer className="absolute bottom-0 left-0 right-0" />
    </div>
  );
}

export default Home;
