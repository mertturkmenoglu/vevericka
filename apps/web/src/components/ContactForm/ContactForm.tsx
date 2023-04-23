import { ChatBubbleOvalLeftIcon, EnvelopeIcon, PencilIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { TextArea } from '../TextArea';
import { TextField } from '../TextField';
import { useContactForm } from './useContactForm';

export interface ContactFormProps {
  className?: string;
}

function ContactForm({ className }: ContactFormProps) {
  const { register, errors, handleSubmit, onSubmit } = useContactForm();
  return (
    <form
      className={clsx('grid grid-cols-2 gap-4', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full items-end space-x-2">
        <UserIcon className="mb-2 h-5 w-5 text-midnight" />
        <TextField
          label="Full Name"
          className="w-full"
          placeholder="Enter your full name"
          error={errors.fullName}
          {...register('fullName')}
        />
      </div>

      <div className="flex w-full items-end space-x-2">
        <EnvelopeIcon className="mb-2 h-5 w-5 text-midnight" />
        <TextField
          label="Email Address"
          className="w-full"
          placeholder="Enter your email address"
          error={errors.email}
          {...register('email')}
        />
      </div>

      <div className="flex w-full items-end space-x-2">
        <PhoneIcon className="mb-2 h-5 w-5 text-midnight" />
        <TextField
          label="Phone Number"
          className="w-full"
          placeholder="Enter your phone number"
          error={errors.phoneNumber}
          {...register('phoneNumber')}
        />
      </div>

      <div className="flex w-full items-end space-x-2">
        <ChatBubbleOvalLeftIcon className="mb-2 h-5 w-5 text-midnight" />
        <TextField
          label="Subject"
          className="w-full"
          placeholder="What is this about?"
          error={errors.subject}
          {...register('subject')}
        />
      </div>

      <div className="col-span-2 flex w-full items-start space-x-2">
        <PencilIcon className="mt-2 h-5 w-5 text-midnight" />
        <TextArea
          label="Your Message"
          className="w-full"
          placeholder="Enter your message here"
          error={errors.message}
          {...register('message')}
        />
      </div>

      <button className="col-span-2 mx-auto mt-8 rounded bg-midnight px-8 py-2 text-white">Send</button>
    </form>
  );
}

export default ContactForm;
