import type { AppearanceType } from '../common';
import { TextFieldType } from '../common/TextField.type.ts';
import clsx from 'clsx';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import {
  helperTextColorMapping,
  inputBorderColorMapping,
  inputClasses,
  inputTextColorMapping,
  labelClasses,
} from './TextField.variant';

export interface TextFieldAtomicProps {
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

export type TextFieldProps = Exclude<React.ComponentProps<'input'>, 'type'> & TextFieldAtomicProps;

const TextField: React.FC<TextFieldProps> = ({
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
  ...rest
}) => {
  const uid = useMemo(() => {
    return 'name' + nanoid();
  }, []);

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
    inputClassName
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

export default TextField;
