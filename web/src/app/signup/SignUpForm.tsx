'use client';

import React, { useState } from 'react';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import useAuthStore from '@/store/authStore';
import useInput from '@/lib/hooks/useInput';

function SignUpForm() {
  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const [lastCheckedUsername, setLastCheckedUsername] = useState<string | null>(
    null,
  );

  const signUp = useAuthStore((state) => state.signUp);
  const checkDuplicateEmail = useAuthStore(
    (state) => state.checkDuplicateEmail,
  );

  const handleCheckDuplicateID = async (e: React.MouseEvent) => {
    e.preventDefault();

    const unique = await checkDuplicateEmail(email);
    setIsUnique(unique);
    setLastCheckedUsername(email);
    if (!unique) alert('중복된 아이디입니다.');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== lastCheckedUsername) {
      alert('이메일 중복 확인을 해주세요.');
    } else if (isUnique) {
      signUp({ nickname, email, password });
    } else {
      alert('이메일 중복 확인을 해주세요.');
    }
  };

  return (
    <Form onSubmit={handleSignUp}>
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
            value={email}
            onChange={onChangeEmail}
            required
          />
          <button
            type="button"
            className="absolute right-5 text-lg font-bold text-secondary-500"
            onClick={handleCheckDuplicateID}
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
        required
      />
      <Input type="submit" value="회원가입" />
    </Form>
  );
}

export default SignUpForm;
