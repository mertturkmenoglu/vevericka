import { useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import { nanoid } from 'nanoid';
import React from 'react';

export interface AuthInputFieldProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  update: Dispatch<SetStateAction<string>>;
  children?: React.ReactNode;
  appendIconClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  appendIconAlt?: string;
  appendIcon?: () => JSX.Element;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  label,
  placeholder,
  type,
  update,
  appendIconAlt,
  appendIconClick,
  appendIcon: AppendIcon,
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
    <div className="relative w-full mt-8">
      <label
        htmlFor={id}
        className="font-medium text-sm absolute -top-3 left-2 bg-white px-1 dark:bg-neutral-800 text-midnight"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="border border-gray-500 text-black rounded-md h-8 px-4 w-full placeholder:text-gray-600 focus:outline-none focus:border-deep-orange bg-white dark:bg-neutral-800 dark:placeholder:text-gray-400 dark:text-gray-200"
        placeholder={placeholder}
        onChange={(e) => update(e.target.value)}
      />
      {showAppendIcon && (
        <button onClick={appendIconClick} className="absolute top-1.5 right-3">
          <span className="sr-only">{appendIconAlt}</span>
          {AppendIcon && AppendIcon()}
        </button>
      )}
    </div>
  );
};

export default AuthInputField;
