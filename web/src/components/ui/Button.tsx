/* eslint-disable react/button-has-type */

import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function Button({
  type = 'button',
  children,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'flex h-10 items-center rounded-lg border-2 border-secondary-600 px-4 text-xl font-semibold',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Button;
