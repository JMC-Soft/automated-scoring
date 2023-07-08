'use client';

import React from 'react';
import {
  MegaphoneIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const SIDE_BAR_MENU = [
  {
    id: 1,
    name: '글쓰기',
    Icon: PencilSquareIcon,
    href: '/',
  },
  {
    id: 2,
    name: '내 정보',
    Icon: UserCircleIcon,
    href: '/profile',
  },
  {
    id: 3,
    name: '문의하기',
    Icon: MegaphoneIcon,
    href: 'mailto:jmcsoft.org@gmail.com?subject=한국어 에세이 자동채점 관련 문의입니다.',
  },
  {
    id: 4,
    name: '결과(임시)',
    Icon: MegaphoneIcon,
    href: '/result',
  },
];

export default function TapBar() {
  const pathname = usePathname();

  return (
    <div className="col-span-1 row-span-1 flex flex-col bg-white px-2">
      {SIDE_BAR_MENU.map((menu) => {
        const { id, href, name, Icon } = menu;
        const Tag = href.startsWith('/') ? Link : 'a';
        const isActive = pathname === href;

        return (
          <Tag
            href={href}
            key={id}
            className={clsx(
              'z-10 mt-4 flex aspect-square flex-col items-center justify-center gap-y-2 rounded-full bg-white text-sm transition-transform duration-700 ease-out hover:text-primary-500',
              {
                'translate-x-[40%] font-black text-primary-500': isActive,
              },
            )}
          >
            <Icon
              className={clsx('h-8', {
                'stroke-2': isActive,
              })}
            />
            {name}
          </Tag>
        );
      })}
    </div>
  );
}
