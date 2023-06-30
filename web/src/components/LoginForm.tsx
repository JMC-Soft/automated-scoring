'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input';
import { isEmail } from '@/lib/utils/utils';
import useAuthStore from '@/store/authStore';
import useInput from '@/lib/hooks/useInput';

function LoginForm() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const router = useRouter();

  const logIn = useAuthStore((state) => state.logIn);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    try {
      await logIn({ email, password });
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
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
      <Input type="submit" value="로그인" />
    </Form>
  );
}

export default LoginForm;
