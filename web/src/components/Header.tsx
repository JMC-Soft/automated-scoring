'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import koreaIcon from '$/images/flags/korea.svg';
import useAuthStore from '@/store/authStore';
import EBALogo from '$/images/logos/logo/logo(H)_text_tag(KR)_2.svg';
import Button from '@/components/ui/Button';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const onClickLogout = async () => {
    try {
      await logout();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  return (
    <header className="z-10 col-span-2 row-span-1 flex h-20 w-full justify-center bg-white shadow">
      <div className="flex h-full w-4/5 items-center justify-between">
        <Link className="flex h-full items-center gap-x-6" href="/">
          <Image
            src={EBALogo}
            alt="인하대학교 로고"
            style={{
              height: '60%',
              width: 'fit-content',
              objectFit: 'contain',
            }}
            loading="eager"
          />
        </Link>
        <div className="flex h-full items-center gap-x-8">
          <Image
            style={{
              border: '1px solid black',
              height: '40%',
              width: 'fit-content',
              objectFit: 'contain',
            }}
            src={koreaIcon}
            loading="eager"
            alt="태극기"
          />
          {user ? (
            <>
              <Link
                href="/profile"
                className="rounded-lg p-2 px-6 text-lg
          "
              >
                {user.nickname}
              </Link>
              <Link
                href="/"
                onClick={onClickLogout}
                className="rounded-lg  p-2 px-6 text-lg"
              >
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button>로그인</Button>
              </Link>
              <Link href="/signup">
                <Button>회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
