'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import useAuthStore from '@/store/authStore';

function StartButton() {
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const onClick = () => {
    if (user) {
      router.push('/writing');
      return;
    }

    router.prefetch('/writing');
    const isLogin = window.confirm(
      '로그인을 하면 채점 결과를 저장할 수 있습니다.\n로그인하시겠습니까?',
    );
    router.push(isLogin ? '/signin?redirect=/writing' : '/writing');
  };

  return (
    <Button className="w-fit" onClick={onClick}>
      시작하기
    </Button>
  );
}

export default StartButton;
