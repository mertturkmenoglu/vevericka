import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { nanoid } from 'nanoid';

export interface AuthInputFieldProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  value: string;
  update: Dispatch<SetStateAction<string>>;
  children?: React.ReactNode;
  appendIconClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  appendIconAlt?: string;
  appendIcon?: () => JSX.Element;
  onEnterPressed?: () => void;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  placeholder,
  type,
  value,
  update,
  appendIconAlt,
  appendIconClick,
  appendIcon: AppendIcon,
  onEnterPressed,
}) => {
  const [id, setId] = useState('');

  const showAppendIcon = useMemo(() => {
    return !!AppendIcon || !!appendIconAlt || !!appendIconClick;
  }, [AppendIcon, appendIconAlt, appendIconClick]);

  useEffect(() => {
    setId(nanoid(5));
  }, []);

  if (id === '') {
    return <></>;
  }

  return (
    <div className="relative mt-8 w-full">
      <input
        type={type}
        id={id}
        className="focus:border-deep-orange h-8 w-full rounded-none border-b border-gray-500 bg-white text-black placeholder:text-gray-600 focus:outline-none dark:bg-neutral-800 dark:text-gray-200 dark:placeholder:text-gray-400"
        placeholder={placeholder}
        onChange={(e) => update(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnterPressed) {
            onEnterPressed();
          }
        }}
      />
      {showAppendIcon && (
        <button onClick={appendIconClick} className="absolute top-1.5 right-0">
          <span className="sr-only">{appendIconAlt}</span>
          {AppendIcon && AppendIcon()}
        </button>
      )}
    </div>
  );
};

export default AuthInputField;
