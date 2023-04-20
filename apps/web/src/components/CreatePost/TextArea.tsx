import clsx from 'clsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import TextAreaAutosize from 'react-textarea-autosize';

export interface TextAreaProps {
  errors: FieldErrors<{
    text: string;
  }>;
  register: UseFormRegister<{
    text: string;
  }>;
}

function TextArea({ errors, register }: TextAreaProps): JSX.Element {
  return (
    <>
      <TextAreaAutosize
        autoComplete="off"
        minRows={1}
        maxRows={3}
        className={clsx(
          'border-b border-midnight',
          {
            'border-red-500': errors.text?.type,
            'focus:border-primary': !errors.text?.type,
          },
          'py-2 text-sm font-medium text-midnight',
          'outline-none',
          'placeholder:text-sm placeholder:font-light',
          'disabled:text-neutral-500'
        )}
        placeholder="What is on your mind?"
        {...register('text')}
      />

      <span className="mt-2 text-sm font-medium text-red-500">{errors.text?.message}</span>
    </>
  );
}

export default TextArea;
