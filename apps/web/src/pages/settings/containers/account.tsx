import { useMutation } from '@apollo/client';

import * as Separator from '@radix-ui/react-separator';
import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyImage, TextField } from '../../../components';
import { useFragment } from '../../../generated';
import { MeQuery } from '../../../generated/graphql';
import { updateUserMutationDocument, UserFragment } from '../../../graphql';
import { useUploadcare } from '../../../hooks';

interface Props {
  user: MeQuery;
}

function AccountContainer({ user }: Props): JSX.Element {
  const me = useFragment(UserFragment, user.me);
  const [profileImageUrl, setProfileImageUrl] = useState(me.image);
  const [bannerImageUrl, setBannerImageUrl] = useState(me.bannerImage);
  const [updateUser] = useMutation(updateUserMutationDocument);

  useUploadcare({
    id: 'profile-image-upload',
    contextName: 'profile-image-upload',
    onDataOutput: (event) => {
      const e = event as CustomEvent;
      const images = e.detail.data.map((item: { cdnUrl: string }) => item.cdnUrl);
      const firstImage = images[0];
      setProfileImageUrl(firstImage);
    },
  });

  useUploadcare({
    id: 'banner-image-upload',
    contextName: 'banner-image-upload',
    onDataOutput: (event) => {
      const e = event as CustomEvent;
      const images = e.detail.data.map((item: { cdnUrl: string }) => item.cdnUrl);
      const firstImage = images[0];
      setBannerImageUrl(firstImage);
    },
  });

  return (
    <section className="mt-8 w-1/2">
      <TextField
        label="Your User ID"
        disabled
        value={me.id}
      />

      <p className="mt-8 text-xl font-medium text-midnight dark:text-white">Profile Image</p>

      <div className="mt-2 flex items-center space-x-4">
        <LazyImage
          src={profileImageUrl}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-32 min-w-32 h-32 w-32 rounded-full"
        />

        <div
          id="profile-image-upload"
          className=""
        />
      </div>

      <Separator.Root
        className="mt-4 h-[1px] w-full bg-neutral-200"
        decorative
        orientation="horizontal"
      />

      <div className="mt-8 flex items-center space-x-4">
        <LazyImage
          src={bannerImageUrl}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="aspect-video h-32 rounded"
        />

        <div
          id="banner-image-upload"
          className=""
        />
      </div>

      <button
        className="mt-8 w-full rounded bg-midnight py-1 text-white dark:bg-neutral-800"
        onClick={async () => {
          const res = await updateUser({
            variables: {
              payload: {
                image: profileImageUrl,
                bannerImage: bannerImageUrl,
              },
            },
          });

          if (res.errors) {
            toast.error('Something went wrong', {
              type: 'error',
              autoClose: 3000,
            });
          } else {
            toast.success('Profile updated', {
              type: 'success',
              autoClose: 3000,
            });
          }
        }}
      >
        Save
      </button>
    </section>
  );
}

export default AccountContainer;
