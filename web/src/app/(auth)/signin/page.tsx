'use client';

/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import isEmail from '@/lib/utils/isEmail';

import { SignInRequest } from '@/lib/types/request';
import fetchSignIn from '@/lib/utils/api/auth/fetchSignIn';
import { Status } from '@/lib/types';

function Page() {
  const [signInStatus, setSignInStatus] = useState<Status>('idle');
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const redirect = useSearchParams().get('redirect');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInRequest>();

  const onLogin = handleSubmit(async (data) => {
    try {
      setSignInStatus('pending');
      const user = await fetchSignIn(data);
      setUser(user);
      router.push(redirect || '/');
      setSignInStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { message: error.message });
      }
      setSignInStatus('error');
    }
  });

  return (
    <div>
      <form
        className="flex w-full flex-col items-center gap-y-4"
        onSubmit={onLogin}
      >
        <h2 className="py-4 text-4xl font-bold">로그인</h2>
        <div className="flex w-full flex-col gap-y-1">
          <input
            className="w-full border p-4"
            type="email"
            {...register('email', {
              required: { value: true, message: '이메일을 입력해주세요.' },
              validate: (value) => {
                if (!isEmail(value)) {
                  return '이메일 형식이 올바르지 않습니다.';
                }
                return true;
              },
            })}
          />
          {errors.email && (
            <span className="px-4 text-warning-500">
              {errors.email.message}
            </span>
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
              'cursor-default bg-secondary-700/70': signInStatus === 'pending',
              'cursor-pointer bg-secondary-700': signInStatus !== 'pending',
            })}
            value="로그인"
            type="submit"
            disabled={signInStatus === 'pending'}
          />
          {errors.root && (
            <span className="px-4 text-warning-500">{errors.root.message}</span>
          )}
        </div>
      </form>
      <div className="mt-6 flex w-full justify-between">
        <Link href="/signup">회원가입</Link>
        <Link href="/findid">아이디 / 비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default Page;
