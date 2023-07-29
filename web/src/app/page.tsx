import React from 'react';
import Image from 'next/image';
import SymbolOutline from '@/components/ui/Logo/SymbolOutline';
import ResultPageImage from '$/images/result_page.png';
import RobotImage from '$/images/robot/robot.png';
import StartButton from '@/app/_components/StartButton';

export default function Home() {
  return (
    <div className="bg-background-500">
      <SymbolOutline className="-translate-y-1/5 fixed bottom-0 right-0 w-1/4 -translate-x-1/2 stroke-white text-sm" />

      <main className="relative mx-auto w-4/5">
        <div className="flex flex-col gap-y-6 py-24">
          <Image
            style={{
              position: 'absolute',
              right: '0',
              width: '12vw',
              height: 'fit-content',
              objectPosition: 'top',
            }}
            src={RobotImage}
            alt="로봇"
          />
          <span className="flex w-11/12 flex-wrap pb-4 pr-2 text-3xl font-black text-primary-500">
            한국어 에세이 자동 채점 프로그램 - PASTA{' '}
            <span className=" text-xl font-bold text-secondary-500">
              ( <span className="text-3xl text-primary-500">P</span>ersonalized{' '}
              <span className="text-3xl text-primary-500">A</span>utomated{' '}
              <span className="text-3xl text-primary-500">S</span>coring and{' '}
              <span className="text-3xl text-primary-500">T</span>utoring{' '}
              <span className="text-3xl text-primary-500">A</span>ssistant )
            </span>
          </span>

          <p className="mt-6 text-2xl leading-loose">
            <b>PASTA</b>는 학습자의 에세이 글을 자동으로 채점하는 인공지능
            채점시스템으로서
            <br />
            학습자의 글을 입체적으로 분석하여 다양한 분석 결과를 제공합니다.
          </p>
          <StartButton />
          <Image
            src={ResultPageImage}
            style={{
              margin: '5rem auto',
              boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
              borderRadius: '1rem',
              border: '2px solid #eaeaea',
              width: '100%',
            }}
            alt="결과 화면 미리보기"
          />
        </div>
      </main>
    </div>
  );
}
