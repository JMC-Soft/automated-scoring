'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import SelectTopic from '@/app/writing/_components/SelectTopic';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/essayStore';
import fetchEvaluateEssay from '@/lib/utils/api/essay/fetchEvaluateEssay';
import useAuthStore from '@/store/authStore';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';

function IpadNote() {
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const topic = useStore(useEssayStore, (state) => state.topic);
  const user = useStore(useAuthStore, (state) => state.user);
  const setEssayText = useEssayStore((state) => state.setEssayText);
  const router = useRouter();
  const textLength = essayText?.length || 0;

  const sectionRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = () => {
    if (!textAreaRef.current || !sectionRef.current) return;

    const currentScrollTop = sectionRef.current.scrollTop;

    textAreaRef.current.style.height = '100%';
    textAreaRef.current.style.height = `${textAreaRef.current}px`;

    sectionRef.current.scrollTop = currentScrollTop;
  };

  useEffect(resizeTextArea, [essayText]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEssayText(e.target.value);
  };

  const handleEvaluate = async () => {
    if (!essayText) {
      alert('에세이를 작성해주세요.');
      return;
    }

    if (!topic) {
      alert('주제를 선택해주세요.');
      return;
    }

    if (!window.confirm('채점을 시작하시겠습니까?')) {
      return;
    }

    try {
      setIsLoading(true);
      const essayID = await fetchEvaluateEssay({
        essayText,
        topic: topic.title,
        type: topic.type,
        id: topic.id,
        email: user?.email ?? null,
      });
      router.push(`/result/${essayID}`);
      return;
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }

    setIsLoading(false);
  };

  const onTogglePrompt = () => {
    setIsPromptOpen((prev) => !prev);
  };

  return (
    <div
      className="relative flex h-[88%] max-h-[88%] w-[91.4%] flex-col overflow-hidden overflow-y-scroll rounded-2xl bg-white px-6 py-2 scrollbar-hide"
      ref={sectionRef}
    >
      {isLoading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
          <div className="flex w-2/3 flex-col items-center justify-around gap-y-4 bg-white px-8 py-4">
            <span className="text-xl font-bold">채점중입니다.</span>
            <Loader />
            <span>채점이 완료되면 자동으로 결과 페이지로 이동합니다.</span>
          </div>
        </div>
      )}
      <div className="flex items-center">
        <span className="text-xl font-semibold">글쓰기 주제 :</span>
        <SelectTopic />
        <QuestionMarkCircleIcon
          className="ml-2 h-6 cursor-pointer stroke-2 text-primary-500"
          onClick={onTogglePrompt}
        />
        {isPromptOpen && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
            <div className="flex w-5/6 flex-col items-center justify-around gap-y-4 bg-white px-8 py-4 laptop:w-3/4">
              <span className="text-xl font-bold">주제에 대한 설명</span>
              <span className="whitespace-pre-wrap border py-3 pl-3 pr-1 font-semibold">
                {topic?.prompt.map((prompt) => (
                  <div className="flex">
                    <div>ㆍ</div>
                    <span className="flex-1">{prompt}</span>
                  </div>
                )) ?? '설명이 없습니다.'}
              </span>
              <Button size="small" onClick={onTogglePrompt}>
                닫기
              </Button>
            </div>
          </div>
        )}
      </div>
      <textarea
        className="w-full flex-1 resize-none bg-transparent text-lg font-semibold outline-none"
        ref={textAreaRef}
        defaultValue={essayText}
        onChange={handleTextChange}
        placeholder="내용을 입력하세요."
      />
      <div className="flex items-center justify-end gap-x-10 py-2 font-semibold">
        <span
          className={clsx('font-bold', {
            'text-black': textLength <= 1000,
            'text-yellow-500': textLength > 1000 && textLength <= 1250,
            'text-complementary-500': textLength > 1250 && textLength <= 1500,
            'text-red-500': textLength > 1500,
          })}
        >
          {textLength} / 1500
        </span>
        <button type="button" onClick={handleEvaluate} className="font-bold">
          제출하기
        </button>
      </div>
    </div>
  );
}

export default IpadNote;
