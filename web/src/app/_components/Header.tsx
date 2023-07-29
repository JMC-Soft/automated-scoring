'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import useAuthStore from '@/store/authStore';
import EBALogo from '$/images/logos/logo/logo(H)_text_tag(KR)_2.svg';
import Button from '@/components/ui/Button';
import fetchSignOut from '@/lib/utils/api/auth/fetchSignOut';
import useOutsideClick from '@/lib/hooks/useOnClickOutside';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const signOut = async () => {
    try {
      await fetchSignOut();
      setUser(null);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  const handleToggle = () => setIsOpen(!isOpen);

  useOutsideClick(buttonRef, () => setIsOpen(false));

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full justify-center bg-white shadow">
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
        {user ? (
          <div className="relative flex h-full items-center gap-x-8">
            <Button
              ref={buttonRef}
              className="flex items-center gap-x-2"
              shadow={false}
              onClick={handleToggle}
              variant="transparent"
            >
              {user.nickname}
              <ChevronUpIcon
                className={clsx('h-5 transition-transform duration-300', {
                  'rotate-180': !isOpen,
                })}
              />
              {isOpen && (
                <div className="absolute left-0 top-16 w-52 bg-white text-left shadow-lg">
                  <ul className="flex flex-col">
                    <Link
                      href="/profile"
                      className="block px-4 py-4 hover:bg-gray-100"
                    >
                      마이페이지
                    </Link>
                    <Link
                      href="/history"
                      className="block px-4 py-4 hover:bg-gray-100"
                    >
                      채점 이력
                    </Link>
                  </ul>
                </div>
              )}
            </Button>
            <Button onClick={signOut}>로그아웃</Button>
          </div>
        ) : (
          <div className="flex h-full items-center gap-x-8">
            <Link href="/signin">
              <Button>로그인</Button>
            </Link>
            <Link href="/signup">
              <Button>회원가입</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
