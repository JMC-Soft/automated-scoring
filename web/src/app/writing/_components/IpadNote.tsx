'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import SelectTopic from '@/app/writing/_components/SelectTopic';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/essayStore';
import fetchEvaluateEssay from '@/lib/utils/api/essay/fetchEvaluateEssay';
import useAuthStore from '@/store/authStore';

function IpadNote() {
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const [title, type] = useStore(useEssayStore, (state) => [
    state.title,
    state.type,
  ]);
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

    if (!title || !type) {
      alert('주제를 선택해주세요.');
      return;
    }

    if (!window.confirm('채점을 시작하시겠습니까?')) {
      return;
    }

    try {
      const essayID = await fetchEvaluateEssay({
        essayText,
        topic: title,
        type,
        email: user?.email ?? null,
      });
      router.push(`/result/${essayID}`);
      return;
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  return (
    <div
      className="flex h-full max-h-full w-full flex-col overflow-hidden overflow-y-scroll scrollbar-hide"
      ref={sectionRef}
    >
      <div className="flex items-center">
        <span className="text-xl font-semibold">주제 :</span>
        <SelectTopic />
      </div>
      <textarea
        className="w-full flex-1 resize-none text-lg font-semibold outline-none"
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
