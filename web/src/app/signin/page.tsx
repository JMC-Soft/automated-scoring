import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

function Page() {
  return (
    <div className="flex w-1/3 flex-col self-center justify-self-center text-xl">
      <LoginForm />
      <div className="mt-6 flex w-full justify-between">
        <Link href="/signup">회원가입</Link>
        <Link href="/findid">아이디 / 비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default Page;
