'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useInput from '@/lib/hooks/useInput';
import { isEmail } from '@/lib/utils/utils';
import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input';
import useAuthStore from '@/store/authStore';

function Page() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loginState, setLoginState] = useState('idle');
  const login = useAuthStore((state) => state.login);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    try {
      setLoginState('pending');
      const user = await login({ email, password });
      setUser(user);
      router.push('/');
    } catch (error) {
      setLoginState('idle');
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Form onSubmit={onLogin}>
        <h2 className="py-4 text-4xl font-bold">로그인</h2>
        <Input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
          required
        />
        <Input
          type="submit"
          value="로그인"
          disabled={loginState === 'pending'}
        />
      </Form>
      <div className="mt-6 flex w-full justify-between">
        <Link href="/signup">회원가입</Link>
        <Link href="/findid">아이디 / 비밀번호 찾기</Link>
      </div>
    </>
  );
}

export default Page;
