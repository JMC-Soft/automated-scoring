import React from 'react';
import Image from 'next/image';
import inhaLogo from '$/images/logos/inhaLogo.png';
import koreaIcon from '$/images/flags/korea.jpg';

function Header() {
  return (
    <header className="col-span-2 row-span-1 flex h-24 items-center gap-x-8 border-b px-12 py-4">
      <Image
        src={inhaLogo}
        alt="인하대학교 로고"
        style={{ height: '100%', width: 'fit-content', objectFit: 'contain' }}
      />
      <span className="text-xl font-bold">한국어 에세이 자동채점</span>
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
      <button
        className="rounded-lg bg-primary-500 p-2 px-6 text-lg text-white"
        type="button"
      >
        로그인 / 회원가입
      </button>
    </header>
  );
}

export default Header;
