/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import clsx from 'clsx';

type Props = {
  type?: 'text' | 'password' | 'submit' | 'email';
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
};

function Input({
  type = 'text',
  placeholder = '',
  className = '',
  disabled = false,
  ...props
}: Props) {
  const { register } = props;

  return (
    <input
      type={type}
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
      {...props}
    />
  );
}

export default Input;
