import { useLoaderData } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { GetProfileByIdQuery } from '../../generated/graphql';
import { useFragment } from '../../generated';
import { profileFragmentDocument } from '../../graphql';
import { LazyImage } from '../../components';
import { BeakerIcon, CheckBadgeIcon, PlusIcon } from '@heroicons/react/24/outline';

function User(): JSX.Element {
  const data = useLoaderData() as GetProfileByIdQuery;
  const user = useFragment(profileFragmentDocument, data.profile);

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
              <span className="text-neutral-600">{user._count.followers} Followers</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-600">{user._count.following} Following</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center rounded bg-midnight px-4 py-2 text-white transition ease-in-out hover:bg-midnight/90">
              <PlusIcon className="h-5 w-5 text-white" />
              <span className="ml-2">Follow</span>
            </button>
            <button className="rounded bg-neutral-200 px-4 py-2 text-neutral-600 transition ease-in-out hover:bg-neutral-200/60">
              Message
            </button>
          </div>
        </div>

        <div className="mt-32 flex w-full items-center justify-center text-4xl">
          <div className="flex items-end space-x-4">
            <BeakerIcon className="h-10 w-10 text-midnight" />
            <span className="mt-2 block">WIP</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default User;
