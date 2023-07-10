import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IconOutline from '@/components/ui/Icon/IconOutline';
import Button from '@/components/ui/Button';
import ResultPageImage from '$/images/result_page.png';
import RobotImage from '$/images/robot.png';

export default function Home() {
  return (
    <div className="bg-background-500">
      <IconOutline className="-translate-y-1/5 fixed bottom-0 right-0 w-1/4 -translate-x-1/2 stroke-white text-sm" />

      <main className="relative mx-auto w-4/5">
        <div className="flex flex-col gap-y-6 pt-24">
          <Image
            style={{
              position: 'absolute',
              right: '5%',
              height: '400px',
              width: 'fit-content',
            }}
            src={RobotImage}
            alt="로봇"
          />
          <span className="w-fit border-b-4 border-primary-500 pb-4 pr-2 text-5xl font-black text-primary-500">
            한국어 에세이 자동 채점
          </span>
          <span className="mt-6 text-3xl font-bold text-secondary-500">
            E-DA
          </span>
          <span className=" text-xl font-bold text-secondary-500">
            Edu Deeplearning Autoscoring
          </span>
          <p className="mt-6 text-lg leading-loose">
            E-DA는 한국어 에세이 자동 채점 프로그램으로, 학습자의 에세이 답안을
            입력하면 AI 채점 시스템이 인간 채점자와 유사한 채점 결과를
            제공합니다. <br /> 다양한 지표를 통해 결과를 분석하고 학습자의
            답안을 자동으로 평가하고, 학습자의 현재 수준을 파악할 수 있습니다.
            (수정 예정)
          </p>
          <Link href="/writing" className="mt-6 w-fit">
            <Button>시작하기</Button>
          </Link>
          <Image
            src={ResultPageImage}
            style={{
              zIndex: 10,
              margin: '2rem auto',
              boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
              borderRadius: '1rem',
              border: '2px solid #eaeaea',
              width: '80%',
            }}
            alt="결과 화면 미리보기"
          />
        </div>
      </main>
    </div>
  );
}
