import { useLoaderData } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { GetProfileDataQuery } from '../../generated/graphql';
import { PostCard } from '../../components';
import { useFragment } from '../../generated';
import { postFragmentDocument, profileFragmentDocument } from '../../graphql';
import { useEffect } from 'react';
import Banner from './components/Banner';
import UserPrimaryInfo from './components/UserPrimaryInfo';
import UserActions from './components/UserActions';

function User(): JSX.Element {
  const data = useLoaderData() as GetProfileDataQuery;
  const user = useFragment(profileFragmentDocument, data.profile);
  const posts = useFragment(postFragmentDocument, data.posts);

  useEffect(() => {
    const el = document.getElementById('app-bar-page-name');
    if (el) {
      el.innerText = user.name;
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="w-full">
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
