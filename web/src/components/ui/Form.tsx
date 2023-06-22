/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import clsx from 'clsx';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

function Form({ onSubmit, children, className, ...props }: Props) {
  return (
    <form
      className={clsx('flex w-full flex-col items-center gap-y-6', className)}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
