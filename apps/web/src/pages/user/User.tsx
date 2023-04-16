import { Link, useLoaderData } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { GetProfileDataQuery } from '../../generated/graphql';
import { LazyImage, PostCard } from '../../components';
import { CheckBadgeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useFragment } from '../../generated';
import { postFragmentDocument, profileFragmentDocument } from '../../graphql';
import { useAppStore } from '../../stores';
import { useEffect } from 'react';

function User(): JSX.Element {
  const appUser = useAppStore((state) => state.user);
  const data = useLoaderData() as GetProfileDataQuery;
  const user = useFragment(profileFragmentDocument, data.profile);
  const posts = useFragment(postFragmentDocument, data.posts);

  const isThisUser = appUser?.id === user.id;

  useEffect(() => {
    const el = document.getElementById('app-bar-page-name');
    if (el) {
      el.innerText = user.name;
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="w-full">
        <div
          className="relative aspect-video h-72 w-full rounded bg-cover"
          style={{
            backgroundImage:
              'url(https://fastly.picsum.photos/id/665/1920/1080.jpg?hmac=_x3qHpZENUn_A2ced5pAXIFL5ZSN2KELFFsTagg-13A)',
          }}
        >
          <LazyImage
            src={user.image}
            alt="User image"
            placeholderSrc="/user.jpg"
            placeholderAlt="Loading"
            className="min-h-32 min-w-32 absolute -bottom-16 left-16 h-32 w-32 rounded-full border-4 border-white"
          />
        </div>

        <div className="mt-20 flex items-start justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <h2 className="text-4xl font-medium">{user.name}</h2>
              <CheckBadgeIcon className="inline h-5 w-5 text-midnight" />
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <span className="text-neutral-600">{user._count.posts} Posts</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-600">{user._count.followers} Followers</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-600">{user._count.following} Following</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isThisUser && (
              <>
                <button className="flex items-center rounded bg-midnight px-4 py-2 text-white transition ease-in-out hover:bg-midnight/90">
                  <PlusIcon className="h-5 w-5 text-white" />
                  <span className="ml-2">Follow</span>
                </button>

                <button className="rounded bg-neutral-200 px-4 py-2 text-neutral-600 transition ease-in-out hover:bg-neutral-200/60">
                  Message
                </button>
              </>
            )}
            {isThisUser && (
              <Link
                to={'/settings'}
                className="rounded bg-neutral-200 px-4 py-2 text-neutral-600 transition ease-in-out hover:bg-neutral-200/60"
              >
                Settings
              </Link>
            )}
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-1/2">
          <div className="divide-y-2 divide-neutral-100 [&>*]:py-2">
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
