'use client';

import React from 'react';
import ProgressBar from '@/components/ui/ProgressBar';

function Progress({ max = 30, current = 0 }: { max: number; current: number }) {
  return (
    <div className="flex h-1/5 w-3/4 items-center gap-x-4 laptop:gap-x-10">
      <div className="h-3 flex-1 rounded-full bg-gray-200">
        <ProgressBar max={max} current={current} />
      </div>
      <div className="flex w-2/12 items-baseline justify-center gap-x-2 whitespace-nowrap">
        <span className="text-sm font-bold text-secondary-500">
          {current}점
        </span>
        <span className="text-sm font-medium text-gray-400"> / {max}점</span>
      </div>
    </div>
  );
}

export default Progress;
