import React from 'react';
import {
  MegaphoneIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

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

export default function Sidebar() {
  return (
    <div className="col-span-1 row-span-1 flex flex-1 flex-col border-r py-2 text-secondary-600">
      {SIDE_BAR_MENU.map((menu) => {
        const { id, href, name, Icon } = menu;
        const Tag = href.startsWith('/') ? Link : 'a';

        return (
          <div
            key={id}
            className="flex items-center justify-center py-4 hover:scale-105 hover:text-primary-800"
          >
            <Tag href={href} className="flex flex-col items-center gap-y-2 ">
              <Icon className="h-9" />
              {name}
            </Tag>
          </div>
        );
      })}
    </div>
  );
}
