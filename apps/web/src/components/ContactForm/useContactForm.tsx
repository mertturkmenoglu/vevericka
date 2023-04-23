import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email().min(1).max(100),
  phoneNumber: z.string().min(1).max(32),
  subject: z.string().min(1).max(100),
  message: z.string().min(1).max(5000),
});

type ContactInput = z.infer<typeof contactSchema>;

export function useContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactInput) => {
    const mailToAddress = 'contactvevericka@gmail.com';
    const mailBody = `Name: ${data.fullName} \nEmail: ${data.email} \nPhone: ${data.phoneNumber} \nMessage: ${data.message}`;
    window.location.href = `mailto:${mailToAddress}?subject=${data.subject}&body=${mailBody}`;
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
