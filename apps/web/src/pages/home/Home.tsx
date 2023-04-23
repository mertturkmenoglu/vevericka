import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Banner, Features, Footer, LandingAppBar, LandingHero, Loading } from '../../components';
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
      <Helmet>
        <title>Vevericka</title>
      </Helmet>
      <Banner
        text={'Vevericka stands with Ukraine'}
        isOpen={isBannerOpen}
        setIsOpen={setIsBannerOpen}
      />
      {landingAppBar && <LandingAppBar className="mt-4" />}
      <LandingHero />
      <Features className="mt-16 !max-w-[960px] p-16" />
      <Footer className="mx-auto" />
    </div>
  );
}

export default Home;
