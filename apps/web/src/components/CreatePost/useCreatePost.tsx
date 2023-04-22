import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { client } from '../../apollo';
import { createPostDocument, feedQueryDocument } from '../../graphql';

const schema = z.object({
  text: z.string().min(1, 'Cannot leave blank').max(250, 'Too long'),
});

export type FormValues = z.infer<typeof schema>;

export function useCreatePostForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [createPost, { loading }] = useMutation(createPostDocument);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FormValues) => {
    const result = await createPost({
      variables: {
        payload: {
          content: formData.text,
          imageUrls: imageUrls,
          videoUrls: [],
        },
      },
    });

    if (result.errors) {
      toast('Error creating post', {
        type: 'error',
        hideProgressBar: true,
        autoClose: 5000,
      });
    } else {
      toast('Post created', {
        type: 'success',
        hideProgressBar: true,
        autoClose: 5000,
      });
      setValue('text', '');

      await client.refetchQueries({
        include: [feedQueryDocument],
      });
    }
  };

  return {
    loading,
    register,
    handleSubmit,
    errors,
    onSubmit,
    imageUrls,
    setImageUrls,
    setValue,
    getValues,
  };
}
