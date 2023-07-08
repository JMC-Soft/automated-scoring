/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import clsx from 'clsx';

type Props = {
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  [key: string]: any;
};

function Input({
  type = 'text',
  name = '',
  placeholder = '',
  className = '',
  required = false,
  disabled = false,
  ...props
}: Props) {
  return (
    <input
      type={type}
      name={name}
      className={clsx(
        'w-full border p-4',
        {
          'bg-secondary-700 text-white': type === 'submit',
          'cursor-default bg-secondary-700/70': type === 'submit' && disabled,
          'cursor-pointer bg-secondary-700': type === 'submit' && !disabled,
        },
        className,
      )}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  );
}

export default Input;
