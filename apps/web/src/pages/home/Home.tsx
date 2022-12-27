import { Banner, Footer, LandingAppBar, LandingHero } from '../../components';
import { useState } from 'react';

function Home(): JSX.Element {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  return (
    <div className="relative flex h-screen flex-col items-center">
      <Banner
        text={'Vevericka stands with Ukraine'}
        isOpen={isBannerOpen}
        setIsOpen={setIsBannerOpen}
      />

      <LandingAppBar className="mt-4" />

      <LandingHero />

      <Footer className="absolute bottom-0 left-0 right-0" />
    </div>
  );
}

export default Home;
