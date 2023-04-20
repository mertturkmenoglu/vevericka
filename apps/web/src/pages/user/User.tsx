import { useLoaderData } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { GetProfileDataQuery } from '../../generated/graphql';
import { PostCard } from '../../components';
import { useFragment } from '../../generated';
import { postFragmentDocument, profileFragmentDocument } from '../../graphql';
import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import UserPrimaryInfo from './components/UserPrimaryInfo';
import UserActions from './components/UserActions';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import About from './components/About';
import * as Separator from '@radix-ui/react-separator';
import { Helmet } from 'react-helmet';

function User(): JSX.Element {
  const data = useLoaderData() as GetProfileDataQuery;
  const user = useFragment(profileFragmentDocument, data.profile);
  const posts = useFragment(postFragmentDocument, data.posts);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const el = document.getElementById('app-bar-page-name');
    if (el) {
      el.innerText = user.name;
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="w-full">
        <Helmet>
          <title>{user.name} | Vevericka</title>
        </Helmet>
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

        <Separator.Root
          className="mt-2 h-[1px] w-full bg-neutral-200"
          decorative
          orientation="horizontal"
        />

        <div className="mx-auto mt-8 flex w-1/2">
          <div className="w-full divide-y-2 divide-neutral-100 [&>*]:py-2">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                post={post as any}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default User;
