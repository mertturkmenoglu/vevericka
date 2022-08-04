import React, { useMemo } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import type { AppearanceType, TextFieldType } from '../common';
import {
  helperTextColorMapping,
  inputBorderColorMapping,
  inputClasses,
  inputTextColorMapping,
  labelClasses,
} from './TextField.variant';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  appearance: AppearanceType;
  type: TextFieldType;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  helper?: JSX.Element;
  appendIcon?: JSX.Element;
  onAppendIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  inputClassName?: string;
}

const Component = (
  {
    appearance,
    type,
    value,
    setValue,
    label,
    helper,
    appendIcon,
    onAppendIconClick,
    inputClassName = '',
    className: cs,
    name,
    ...rest
  }: React.PropsWithChildren<Props>,
  ref: React.ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  const uid = useMemo(() => {
    return name ? name : 'name' + nanoid();
  }, [name]);

  const calcInputBorderColor = useMemo(() => {
    return inputBorderColorMapping[appearance];
  }, [appearance]);

  const calcInputTextColor = useMemo(() => {
    return inputTextColorMapping[appearance];
  }, [appearance]);

  const calcHelperTextColor = useMemo(() => {
    return clsx('mt-2 text-sm', helperTextColorMapping[appearance]);
  }, [appearance]);

  const inputClassNameCalc = clsx(
    inputClasses,
    calcInputBorderColor,
    calcInputTextColor,
    {
      'pr-6': appendIcon !== undefined,
    },
    inputClassName,
  );

  const labelClassName = clsx(labelClasses, calcInputTextColor, `peer-focus:${calcInputTextColor}`);

  return (
    <div className={clsx('group relative z-0 mb-6 w-full', cs)}>
      <input
        type={type}
        name={uid}
        className={inputClassNameCalc}
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            return;
          }
        }}
        {...rest}
        ref={ref}
      />
      <label htmlFor={uid} className={labelClassName}>
        {label}
      </label>
      {appendIcon !== undefined && (
        <button className="absolute right-0 top-4 z-10" onClick={onAppendIconClick}>
          {appendIcon}
        </button>
      )}
      <p className={calcHelperTextColor}>{helper}</p>
    </div>
  );
};

const TextField = React.forwardRef<HTMLInputElement, Props>(Component);

export default TextField;
