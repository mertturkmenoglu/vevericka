import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().trim().min(1).email(),
  password: z.string().trim().min(1),
});

type LoginFormFields = z.infer<typeof schema>;

export function useLoginForm() {
  const form = useForm<LoginFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
}
