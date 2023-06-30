'use client';

import React from 'react';
import clsx from 'clsx';
import useEssayStore from '@/store/subjectStore';
import useStore from '@/lib/hooks/useStore';

function Topic() {
  const topic = useStore(useEssayStore, (state) => state.topic);
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const textLength = essayText?.length || 0;

  return (
    <div className="my-auto flex flex-col items-center justify-center gap-y-1">
      <h2 className="text-3xl font-bold">{topic || '주제를 선택해주세요.'}</h2>
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
    </div>
  );
}

export default Topic;
