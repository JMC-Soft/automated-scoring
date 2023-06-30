'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import useStore from '@/lib/hooks/useStore';

function Page() {
  const [loading, setLoading] = useState(true);
  const user = useStore(useAuthStore, (state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
    setLoading(true);
  }, [user, router]);

  if (loading) {
    return null;
  }

  return <div>Profile Page</div>;
}

export default Page;
