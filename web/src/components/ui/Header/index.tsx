import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import inhaLogo from '$/images/logos/inhaLogo.png';
import GNB from '@/components/ui/Header/GNB';

export default function Header() {
  return (
    <header className="col-span-2 row-span-1 flex h-24 items-center gap-x-8 border-b px-12 py-4 font-bold">
      <Link href="/" className="h-full">
        <Image
          src={inhaLogo}
          alt="인하대학교 로고"
          style={{ height: '100%', width: 'fit-content', objectFit: 'contain' }}
        />
      </Link>
      <span className="text-xl ">한국어 에세이 자동채점</span>
      <GNB />
    </header>
  );
}
