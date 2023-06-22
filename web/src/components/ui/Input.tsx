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
  [key: string]: any;
};

function Input({
  type = 'text',
  name = '',
  placeholder = '',
  className = '',
  required = false,
  ...props
}: Props) {
  return (
    <input
      type={type}
      name={name}
      className={clsx(
        'w-full border p-4',
        {
          'cursor-pointer bg-secondary-700 text-white': type === 'submit',
        },
        className,
      )}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  );
}

export default Input;
