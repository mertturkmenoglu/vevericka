import { LazyImage, TextField } from '../../../components';
import { MeQuery } from '../../../generated/graphql';
import { useFragment } from '../../../generated';
import { updateUserMutationDocument, userFragmentDocument } from '../../../graphql';
import { useUploadcare } from '../../../hooks';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  user: MeQuery;
}

function AccountContainer({ user }: Props): JSX.Element {
  const me = useFragment(userFragmentDocument, user.me);
  const [profileImageUrl, setProfileImageUrl] = useState(me.image);
  const [updateUser] = useMutation(updateUserMutationDocument);

  useUploadcare({
    id: 'profile-image-upload',
    onDataOutput: (event) => {
      const e = event as CustomEvent;
      const images = e.detail.data.map((item: { cdnUrl: string }) => item.cdnUrl);
      const firstImage = images[0];
      setProfileImageUrl(firstImage);
    },
  });

  return (
    <section className="mt-8 w-1/2">
      <TextField
        label="Your User ID"
        disabled
        value={me.id}
      />

      <div className="mt-8 flex items-center space-x-4">
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

      <div id="banner-image-upload" />

      <button
        className="mt-8 w-full rounded bg-midnight text-white"
        onClick={async () => {
          const res = await updateUser({
            variables: {
              payload: {
                image: profileImageUrl,
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

      <ToastContainer />
    </section>
  );
}

export default AccountContainer;
