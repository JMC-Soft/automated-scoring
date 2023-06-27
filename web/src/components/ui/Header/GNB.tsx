'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import koreaIcon from '$/images/flags/korea.jpg';
import useAuthStore from '@/store/authStore';

function GNB() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logOut = useAuthStore((state) => state.logOut);

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
        alt="태극기"
      />
      {isLoggedIn ? (
        <button
          onClick={logOut}
          className="rounded-lg  p-2 px-6 text-lg"
          type="button"
        >
          로그아웃
        </button>
      ) : (
        <>
          <Link href="/signin" className="rounded-lg  p-2 px-6 text-lg">
            로그인
          </Link>
          <Link href="/signup" className="rounded-lg  p-2 px-6 text-lg">
            회원가입
          </Link>
        </>
      )}
    </>
  );
}

export default GNB;
