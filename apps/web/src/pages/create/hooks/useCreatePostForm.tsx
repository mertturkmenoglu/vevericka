import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { createPostDocument } from '../../../graphql';

const schema = z.object({
  text: z.string().min(1, 'Cannot leave blank').max(250, 'Too long'),
});

export type FormValues = z.infer<typeof schema>;

export function useCreatePostForm() {
  const [createPost, { loading }] = useMutation(createPostDocument);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FormValues) => {
    const result = await createPost({
      variables: {
        payload: {
          content: formData.text,
          imageUrls: [],
          videoUrls: [],
        },
      },
    });

    if (result.errors) {
      toast('Error creating post', {
        theme: 'dark',
        type: 'error',
        hideProgressBar: true,
        autoClose: 5000,
      });
    } else {
      toast('Post created', {
        theme: 'dark',
        type: 'success',
        hideProgressBar: true,
        autoClose: 5000,
      });
      setValue('text', '');
    }
  };

  return {
    loading,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
