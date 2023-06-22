'use client';

import React from 'react';
import { login } from '@/lib/api/login';

function LoginForm() {
  // const [email, handleEmail] = useInput('');
  // const [password, handlePassword] = useInput('');

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await login({ email, password });
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-y-6"
      onSubmit={onLogin}
    >
      <h2 className="py-4 text-4xl font-bold">로그인</h2>
      <input
        type="email"
        name="email"
        className="w-full border p-4"
        placeholder="이메일"
      />
      <input
        type="password"
        name="password"
        className="w-full border p-4"
        placeholder="비밀번호"
      />
      <input
        type="submit"
        className="w-full border bg-secondary-700 p-4 text-white"
        value="로그인"
      />
    </form>
  );
}

export default LoginForm;
