'use client';

import React from 'react';
import login from '@/lib/api/login';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';

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
    <Form onSubmit={onLogin}>
      <h2 className="py-4 text-4xl font-bold">로그인</h2>
      <Input type="email" name="email" placeholder="이메일" />
      <Input type="password" name="password" placeholder="비밀번호" />
      <Input type="submit" value="로그인" />
    </Form>
  );
}

export default LoginForm;
