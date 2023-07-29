'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background-500">
      <div className="flex w-4/5 flex-col border bg-white px-20 py-10 shadow laptop:w-3/5 desktopWide:w-2/5">
        {children}
      </div>
    </div>
  );
}

export default Layout;
