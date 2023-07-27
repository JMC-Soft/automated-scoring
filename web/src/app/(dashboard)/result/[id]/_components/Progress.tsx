import React from 'react';
import ProgressBar from '@/components/ui/ProgressBar';

function Progress({ max, current }: { max: number; current: number }) {
  return (
    <div className="flex h-10 w-3/4 items-center gap-x-10">
      <div className="h-3 flex-1 rounded-full bg-gray-200">
        <ProgressBar max={max} current={current} />
      </div>
      <h3 className="flex items-baseline gap-x-2 text-2xl font-bold text-secondary-500">
        {current}점
        <span className="text-base font-medium text-gray-400"> / {max}점</span>
      </h3>
    </div>
  );
}

export default Progress;
