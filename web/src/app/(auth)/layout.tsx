import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <div className="flex w-1/3 flex-col self-center justify-self-center text-xl">
      {children}
    </div>
  );
}
