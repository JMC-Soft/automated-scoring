'use client';

import React, { useState } from 'react';
import checkEmailAvailability from '@/lib/api/checkEmailAvailability';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { EMAIL_REG_EXP } from '@/lib/api/const';
import signup from '@/lib/api/signup';

type FormValues = {
  nickname: string;
  email: string;
  password: string;
};

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailValidation, setEmailValidation] = useState(false);

  const handleEmailCheck = async () => {
    if (!EMAIL_REG_EXP.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return;
    }

    const result = await checkEmailAvailability(email);
    if (result.result === 'error') {
      setEmailError(result.status.msg);
    } else {
      setEmailError(null);
      setEmailValidation(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailValidation) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formValues: FormValues = {
      nickname: formData.get('nickname') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    await signup(formValues);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailValidation(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="py-4 text-4xl font-bold">회원가입</h2>
      <Input name="nickname" placeholder="닉네임" required />
      <div className="w-full">
        <div className="relative flex w-full items-center">
          <Input
            name="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button
            type="button"
            className="absolute right-5 text-lg font-bold text-secondary-500"
            onClick={handleEmailCheck}
          >
            중복 확인
          </button>
        </div>
        {emailError && <p className="self-start text-red-500">{emailError}</p>}
      </div>
      <Input name="password" placeholder="비밀번호" type="password" required />
      <Input type="submit" value="회원가입" />
    </Form>
  );
}

export default SignUpForm;
