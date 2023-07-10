import React from 'react';
import Image from 'next/image';
import Logo from '$/images/logos/logo/logo(H)_text_tag(KR)_2.svg';

export default function Footer() {
  return (
    <footer className="mx-auto flex w-4/5 flex-col gap-y-1 py-12 text-gray-500">
      <div className="h-10 py-1">
        <Image
          src={Logo}
          style={{
            height: '100%',
            width: 'fit-content',
          }}
          alt="로고"
        />
      </div>
      <p>INHA UNIVERSITY, 100 Inha-ro, Michuhol-gu, Incheon 22212, KOREA</p>
      <p>Tel: +82-32-860-7873 </p>
      <p>Mail: yong21c@gmail.com</p>
      <p>Copyright(C) 2022 by EBA Center. ALL RIGHTS RESERVED</p>
    </footer>
  );
}
