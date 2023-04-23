import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useFragment } from '../../../generated';
import { MeQuery } from '../../../generated/graphql';
import { updateUserMutationDocument, UserFragment } from '../../../graphql';

const profileSchema = z.object({
  name: z.string().min(1).max(64),
  job: z.string().max(64).optional(),
  twitterHandle: z.string().max(64).optional(),
  school: z.string().max(64).optional(),
  website: z.string().max(255).optional(),
  description: z.string().max(255).optional(),
  protected: z.boolean().optional(),
  city: z.string().max(64).optional(),
  country: z.string().max(64).optional(),
  gender: z.string().max(32).optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

export function useProfile(user: MeQuery) {
  const me = useFragment(UserFragment, user.me);
  const [updateUser] = useMutation(updateUserMutationDocument);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      city: me.city || '',
      country: me.country || '',
      description: me.description || '',
      job: me.job || '',
      name: me.name || '',
      protected: me.protected || false,
      school: me.school || '',
      twitterHandle: me.twitterHandle || '',
      website: me.website || '',
      gender: me.gender || '',
    },
  });

  const onSubmit: SubmitHandler<ProfileInput> = async (values) => {
    const resp = await updateUser({
      variables: {
        payload: {
          city: values.city,
          country: values.country,
          description: values.description,
          job: values.job,
          name: values.name,
          protected: values.protected,
          school: values.school,
          twitterHandle: values.twitterHandle,
          website: values.website,
          gender: values.gender,
        },
      },
    });

    if (resp.errors) {
      toast('Error updating profile', {
        theme: 'dark',
        type: 'error',
        hideProgressBar: true,
        autoClose: 5000,
      });
    } else {
      window.location.reload();
    }
  };

  return {
    onSubmit,
    register,
    errors,
    handleSubmit,
  };
}
