/* eslint-disable react/button-has-type */

import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'; // new prop
};

function Button({
  type = 'button',
  children,
  className,
  onClick = () => {},
  size = 'medium',
  variant = 'primary', // set default to 'primary'
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'relative flex cursor-pointer touch-manipulation select-none whitespace-nowrap rounded-xl text-white shadow-lg transition-all duration-300 hover:bg-primary-600 hover:opacity-100 hover:shadow-2xl',
        className,
        { 'px-4 py-1 text-sm': size === 'small' },
        { 'px-6 py-2': size === 'medium' },
        { 'px-8 py-3 text-lg': size === 'large' },
        { 'bg-primary-500 hover:shadow-lg': variant === 'primary' },
        { 'bg-secondary-500 hover:shadow-lg': variant === 'secondary' },
        { 'bg-success-500 hover:shadow-lg': variant === 'success' },
        { 'bg-warning-500 hover:shadow-lg': variant === 'warning' },
        { 'bg-danger-500 hover:shadow-lg': variant === 'danger' },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
