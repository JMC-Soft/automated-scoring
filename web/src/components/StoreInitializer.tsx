'use client';

import { useRef } from 'react';
import useAuthStore from '@/store/authStore';
import { User } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants/constants';

export default function StoreInitializer({ user }: { user: User | null }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useAuthStore.setState({ user, isLoggedIn: !!user });
    if (!user) {
      fetch(`${API_BASE_URL}/verify/idToken`).catch((e) => {
        console.log(e);
      });
    }

    initialized.current = true;
  }

  return null;
}
