'use client';

/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import isEmail from '@/lib/utils/isEmail';
import Form from '@/components/ui/Form/Form';
import useAuthStore from '@/store/authStore';

import { SignUpRequest } from '@/lib/types/request';
import fetchCheckDuplicateEmail from '@/lib/utils/api/auth/fetchCheckDuplicateEmail';
import fetchSignUp from '@/lib/utils/api/auth/fetchSignUp';
import { Status } from '@/lib/types';

function SignUp() {
  const [lastCheckedEmail, setLastCheckedEmail] = useState<string | null>(null);
  const [signUpStatus, setSignUpStatus] = useState<Status>('idle');
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<SignUpRequest>();

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
      alert('사용 가능한 이메일입니다.');
    } catch (err) {
      if (err instanceof Error) {
        setError('email', { message: err.message });
      }
      setLastCheckedEmail(null);
    }
  };

  const onSignUp = handleSubmit(async (data) => {
    try {
      setSignUpStatus('pending');
      const user = await fetchSignUp(data);
      alert(`${user.nickname}님, 회원가입을 축하합니다!`);
      setUser(user);
      setSignUpStatus('success');
    } catch (err) {
      if (err instanceof Error) {
        setError('root', { message: err.message });
      }
      setSignUpStatus('error');
    }
  });

  return (
    <Form onSubmit={onSignUp}>
      <h2 className="py-4 text-4xl font-bold">회원가입</h2>
      <div className="flex w-full flex-col gap-y-1">
        <input
          className="w-full border p-4"
          type="nickname"
          placeholder="닉네임"
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
            placeholder="이메일"
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
          placeholder="비밀번호
          "
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
      <div className="flex w-full items-center gap-x-4">
        <span className="text-lg font-semibold">학교 : </span>
        <label htmlFor="schoolName" className="flex-1 border">
          <input
            {...register('schoolName', {
              required: { value: true, message: '학교를 입력해주세요.' },
            })}
            type="text"
            name="schoolName"
            className="h-full w-full p-4"
          />
        </label>
        {errors.schoolName && (
          <span className="px-4 text-warning-500">
            {errors.schoolName.message}
          </span>
        )}
      </div>
      <div className="flex w-full items-center gap-x-4">
        <span className="text-lg font-semibold">성별 : </span>
        <label htmlFor="male" className="flex items-center gap-x-2">
          <input
            {...register('gender', {
              required: { value: true, message: '성별을 선택해주세요.' },
            })}
            type="radio"
            value="M"
            id="male"
          />
          남자
        </label>{' '}
        <label htmlFor="female" className="flex items-center gap-x-2">
          <input
            {...register('gender', {
              required: { value: true, message: '성별을 선택해주세요.' },
            })}
            type="radio"
            value="F"
            id="female"
          />
          여자
        </label>
        {errors.gender && (
          <span className="px-4 text-warning-500">{errors.gender.message}</span>
        )}
      </div>

      <div className="w-full">
        <input
          className={clsx('w-full border p-4 text-white', {
            'cursor-default bg-secondary-700/70': signUpStatus === 'pending',
            'cursor-pointer bg-secondary-700': signUpStatus !== 'pending',
          })}
          type="submit"
          disabled={signUpStatus === 'pending'}
        />
        {errors.root && (
          <span className="px-4 text-warning-500">{errors.root.message}</span>
        )}
      </div>
    </Form>
  );
}

export default SignUp;
