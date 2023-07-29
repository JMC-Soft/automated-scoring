'use client';

/* eslint-disable react/button-has-type */

import React, { forwardRef } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'transparent';
  round?: boolean;
  shadow?: boolean;
};

const Button = forwardRef(
  (
    {
      type = 'button',
      children,
      className,
      onClick = () => {},
      size = 'medium',
      variant = 'primary',
      round = false,
      shadow = true,
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'cursor-pointer touch-manipulation select-none whitespace-nowrap tracking-wider transition-all duration-300 hover:opacity-100',
          className,
          { 'px-4 py-1 text-sm': size === 'small' },
          { 'px-6 py-2': size === 'medium' },
          { 'px-8 py-3 text-lg': size === 'large' },
          {
            'bg-primary-500 hover:bg-primary-600 hover:shadow-lg':
              variant === 'primary',
          },
          {
            'bg-secondary-500 hover:shadow-lg': variant === 'secondary',
          },
          { 'bg-success-500 hover:shadow-lg': variant === 'success' },
          { 'bg-warning-500 hover:shadow-lg': variant === 'warning' },
          { 'bg-danger-500 hover:shadow-lg': variant === 'danger' },
          {
            'bg-transparent font-semibold hover:bg-background-500':
              variant === 'transparent',
          },
          { 'text-white': variant !== 'transparent' },
          { 'shadow-lg': shadow },
          { rounded: round },
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);
export default Button;
