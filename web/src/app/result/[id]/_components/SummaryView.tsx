import React from 'react';
import clsx from 'clsx';

function SummaryView({ className }: { className: string }) {
  return (
    <div
      className={clsx(' flex flex-col items-center bg-white px-4', className)}
    >
      <h2 className="py-3 text-xl font-semibold">답안 요약</h2>
      <span className="">에세이 주제</span>
      <span className="font-bold text-primary-500">
        &quot;나의 위인전&quot;
      </span>
      <div className="grid w-full grid-cols-[repeat(2,auto)] gap-y-3 px-4 py-3 font-semibold">
        <span>글자 수 :</span>
        <span>1520자</span>
        <span>문장 수 :</span>
        <span>30문장</span>
        <span>답안 제출일 :</span>
        <span>2023-07-29</span>
      </div>
    </div>
  );
}

export default SummaryView;
