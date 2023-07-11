'use client';

import React from 'react';
import useCheckUser from '@/lib/hooks/useCheckUser';

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  useCheckUser();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background-500">
      <div className="flex w-2/5 flex-col border bg-white px-20 py-10 shadow">
        {children}
      </div>
    </div>
  );
}
