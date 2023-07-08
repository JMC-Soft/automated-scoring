'use client';

import React from 'react';
import clsx from 'clsx';
import useEssayStore from '@/store/essayStore';
import useStore from '@/lib/hooks/useStore';

function EssayLength() {
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const textLength = essayText?.length || 0;

  return (
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
  );
}

export default EssayLength;
