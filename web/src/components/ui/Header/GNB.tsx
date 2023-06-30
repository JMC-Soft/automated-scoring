'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import koreaIcon from '$/images/flags/korea.svg';
import useAuthStore from '@/store/authStore';

function GNB() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);

  const router = useRouter();

  return (
    <>
      <Image
        style={{
          border: '1px solid black',
          height: '60%',
          width: 'fit-content',
          objectFit: 'contain',
          marginLeft: 'auto',
        }}
        src={koreaIcon}
        loading="eager"
        alt="태극기"
      />
      <button
        type="button"
        onClick={isLoggedIn ? logOut : () => router.push('/signin')}
        className="rounded-lg  p-2 px-6 text-lg"
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
      <button
        type="button"
        onClick={() => router.push(isLoggedIn ? '/signup' : '/signup')}
        className="rounded-lg  p-2 px-6 text-lg"
      >
        {isLoggedIn ? user!.nickname : '회원가입'}
      </button>
    </>
  );
}

export default GNB;
