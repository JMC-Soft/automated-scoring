'use client';

/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import useSignupStore from '@/store/signupStore';
import isEmail from '@/lib/utils/isEmail';
import Form from '@/components/ui/Form/Form';
import useAuthStore from '@/store/authStore';
import { SignUpRequest } from '@/lib/types';

function SignUp() {
  const [lastCheckedEmail, setLastCheckedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<SignUpRequest>();

  const { status, fetchCheckDuplicateEmail, fetchSignUp } = useSignupStore();
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleCheckDuplicateEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email = getValues('email');
    if (!isEmail(email)) {
      setError('email', { message: '이메일 형식이 올바르지 않습니다.' });
      return;
    }

    try {
      await fetchCheckDuplicateEmail(email);
      setLastCheckedEmail(email);
      setError('email', { message: '' });
    } catch (err) {
      if (err instanceof Error) {
        setError('email', { message: err.message });
      }
      setLastCheckedEmail(null);
    }
  };

  const onSignUp = handleSubmit(async (data) => {
    const { nickname, email, password } = data;

    try {
      const user = await fetchSignUp({ nickname, email, password });
      alert(`${user.nickname}님, 회원가입을 축하합니다!`);
      setUser(user);
      router.push('/');
      return;
    } catch (err) {
      if (err instanceof Error) {
        setError('root', { message: err.message });
      }
    }
  });

  return (
    <Form onSubmit={onSignUp}>
      <h2 className="py-4 text-4xl font-bold">회원가입</h2>
      <div className="flex w-full flex-col gap-y-1">
        <input
          className="w-full border p-4"
          type="nickname"
          {...register('nickname', {
            required: { value: true, message: '닉네임을 입력해주세요.' },
          })}
        />
        {errors.nickname && (
          <span className="px-4 text-warning-500">
            {errors.nickname.message}
          </span>
        )}
      </div>
      <div className="flex w-full flex-col gap-y-1">
        <div className="relative w-full">
          <input
            className="w-full border p-4"
            type="email"
            {...register('email', {
              required: { value: true, message: '이메일을 입력해주세요.' },
              validate: (value) => {
                if (!isEmail(value)) {
                  return '이메일 형식이 올바르지 않습니다.';
                }
                if (value !== lastCheckedEmail) {
                  return '이메일 중복 확인을 해주세요.';
                }
                return true;
              },
            })}
          />
          <button
            className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-primary-500"
            type="button"
            onClick={handleCheckDuplicateEmail}
          >
            중복 확인
          </button>
        </div>

        {errors.email && (
          <span className="px-4 text-warning-500">{errors.email.message}</span>
        )}
      </div>
      <div className="w-full">
        <input
          className="w-full border p-4"
          type="password"
          {...register('password', {
            required: { value: true, message: '비밀번호를 입력해주세요.' },
            validate: (value) => {
              if (value.length < 6) {
                return '비밀번호는 6자 이상이어야 합니다.';
              }
              return true;
            },
          })}
        />
        {errors.password && (
          <span className="px-4 text-warning-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="w-full">
        <input
          className={clsx('w-full border p-4 text-white', {
            'cursor-default bg-secondary-700/70': status === 'pending',
            'cursor-pointer bg-secondary-700': status !== 'pending',
          })}
          type="submit"
          disabled={status === 'pending'}
        />
        {errors.root && (
          <span className="px-4 text-warning-500">{errors.root.message}</span>
        )}
      </div>
    </Form>
  );
}

export default SignUp;
