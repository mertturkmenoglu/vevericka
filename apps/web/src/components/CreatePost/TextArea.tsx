import clsx from 'clsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import TextAreaAutosize from 'react-textarea-autosize';

export interface TextAreaProps {
  className?: string;
  errors: FieldErrors<{
    text: string;
  }>;
  register: UseFormRegister<{
    text: string;
  }>;
}

function TextArea({ errors, register, className }: TextAreaProps): JSX.Element {
  return (
    <>
      <TextAreaAutosize
        autoComplete="off"
        minRows={2}
        maxRows={3}
        className={clsx(
          'whitespace-pre bg-transparent',
          'border-b border-midnight dark:border-neutral-400',
          {
            'border-red-base': errors.text?.type,
            'focus:border-primary': !errors.text?.type,
          },
          'py-2 text-sm font-medium text-midnight dark:text-white',
          'outline-none',
          'placeholder:text-sm placeholder:font-light',
          'disabled:text-neutral-500',
          className
        )}
        placeholder="What is on your mind?"
        {...register('text')}
      />

      <span className="mt-2 text-sm font-medium text-red-base">{errors.text?.message}</span>
    </>
  );
}

export default TextArea;
