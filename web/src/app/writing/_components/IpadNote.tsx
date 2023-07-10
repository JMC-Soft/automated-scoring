'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import SelectTopic from '@/app/writing/_components/SelectTopic';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/essayStore';
import Robot from '@/components/Robot';

function IpadNote() {
  const [isRunning, setIsRunning] = useState(false);
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const setEssayText = useEssayStore((state) => state.setEssayText);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textLength = essayText?.length || 0;

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

  const onSubmitClick = () => {
    setIsRunning(true);
  };

  return (
    <div
      className="flex h-full max-h-full w-full flex-col overflow-hidden overflow-y-scroll scrollbar-hide"
      ref={sectionRef}
    >
      <Robot isRunning={isRunning} />
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
        <button type="button" onClick={onSubmitClick} className="font-bold">
          제출하기
        </button>
      </div>
    </div>
  );
}

export default IpadNote;
