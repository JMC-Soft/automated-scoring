'use client';

import { useRef } from 'react';
import useAuthStore from '@/store/authStore';
import { User } from '@/lib/types';

export default function StoreInitializer({
  user,
  isLoggedIn,
}: {
  user: User | null;
  isLoggedIn: boolean;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useAuthStore.setState({ user, isLoggedIn });
    initialized.current = true;
  }

  return null;
}
