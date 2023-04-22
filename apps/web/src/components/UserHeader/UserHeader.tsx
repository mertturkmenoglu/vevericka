import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { ProfileItemFragment } from '../../generated/graphql';
import About from './About';
import Banner from './Banner';
import UserActions from './UserActions';
import UserPrimaryInfo from './UserPrimaryInfo';

export interface UserHeaderProps {
  user: ProfileItemFragment;
}

function UserHeader({ user }: UserHeaderProps): JSX.Element {
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const el = document.getElementById('app-bar-page-name');
    if (el) {
      el.innerText = user.name;
    }
  }, [user]);

  return (
    <>
      <Banner
        bannerImage={user.bannerImage}
        image={user.image}
      />

      <div className="mt-20 flex items-start justify-between">
        <UserPrimaryInfo user={user} />

        <div className="flex items-center space-x-4">
          <UserActions user={user} />
        </div>
      </div>

      <div className="mt-4">
        <button
          className="-ml-2 flex items-center justify-center space-x-2 rounded px-2 py-2 transition duration-200 ease-in-out hover:bg-midnight/10"
          onClick={() => setShowAbout((prev) => !prev)}
        >
          <span className="text-lg font-medium">About</span>
          {showAbout ? (
            <ChevronUpIcon className="h-5 w-5 text-midnight" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-midnight" />
          )}
        </button>

        {showAbout && <About user={user} />}
      </div>
    </>
  );
}

export default UserHeader;
