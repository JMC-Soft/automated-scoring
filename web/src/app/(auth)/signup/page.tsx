'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useSignupStore from '@/store/signupStore';
import { isEmail } from '@/lib/utils/utils';
import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input';
import useAuthStore from '@/store/authStore';
import useCheckUser from '@/lib/hooks/useCheckUser';

function SignUp() {
  useCheckUser();

  const {
    nickname,
    email,
    password,
    isUnique,
    lastCheckedEmail,
    status,
    onChangeEmail,
    onChangeNickname,
    onChangePassword,
    fetchCheckDuplicateEmail,
    setLastCheckedEmail,
    fetchSignUp,
  } = useSignupStore();
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleCheckDuplicateEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    try {
      await fetchCheckDuplicateEmail(email);
      alert('사용 가능한 이메일입니다.');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    } finally {
      setLastCheckedEmail(email);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUnique || email !== lastCheckedEmail) {
      alert('중복 확인을 해주세요.');
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    try {
      const userResponse = await fetchSignUp({ nickname, email, password });
      alert(`${userResponse.nickname}님, 회원가입을 축하드립니다!`);
      setUser(userResponse);
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSignup}>
      <h2 className="py-4 text-4xl font-bold">회원가입</h2>
      <Input
        value={nickname}
        onChange={onChangeNickname}
        placeholder="닉네임"
        required
      />
      <div className="w-full">
        <div className="relative flex w-full items-center">
          <Input
            placeholder="이메일"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
          <button
            type="button"
            className="absolute right-5 text-lg font-bold text-secondary-500"
            onClick={handleCheckDuplicateEmail}
          >
            중복 확인
          </button>
        </div>
      </div>
      <Input
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호"
        type="password"
        autoComplete="off"
        required
      />
      <Input
        type="submit"
        value="회원가입"
        disabled={
          !nickname ||
          !email ||
          !password ||
          email !== lastCheckedEmail ||
          status === 'pending'
        }
      />
    </Form>
  );
}

export default SignUp;
