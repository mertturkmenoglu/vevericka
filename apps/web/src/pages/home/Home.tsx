import { Banner, Footer, LandingAppBar, LandingHero, Loading } from '../../components';
import { useState } from 'react';
import { useAuth, useFlags } from '../../hooks';

function Home(): JSX.Element {
  const { loading } = useAuth();
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const { landingAppBar } = useFlags();

  if (loading) {
    return (
      <div className="flex h-[100vh] w-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative flex h-screen flex-col items-center">
      <Banner
        text={'Vevericka stands with Ukraine'}
        isOpen={isBannerOpen}
        setIsOpen={setIsBannerOpen}
      />

      {landingAppBar && <LandingAppBar className="mt-4" />}

      <LandingHero />

      <Footer className="absolute bottom-0 left-0 right-0 mx-auto" />
    </div>
  );
}

export default Home;
