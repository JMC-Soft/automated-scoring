/* eslint-disable react/button-has-type */

import React from 'react';
import clsx from 'clsx';
import { HeroIconComponent } from '@/lib/types';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  iconClassName?: string;
  Icon?: HeroIconComponent;
};

function Button({
  type = 'button',
  children,
  className,
  onClick,
  iconClassName,
  Icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'flex h-10 items-center border-2 border-secondary-600 bg-white text-xl font-semibold',
        className,
      )}
      onClick={onClick}
    >
      {children}
      {Icon && (
        <Icon
          className={clsx(
            'h-6 stroke-2 text-secondary-600 transition-all duration-500',
            iconClassName,
          )}
        />
      )}
    </button>
  );
}
export default Button;
