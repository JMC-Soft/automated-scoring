import React from 'react';
import clsx from 'clsx';

function SummaryView({
  className,
  title,
  countCharacters,
  countSentences,
  createdAt,
}: {
  className: string;
  title: string;
  countCharacters: number;
  countSentences: number;
  createdAt: string;
}) {
  return (
    <div
      className={clsx(' flex flex-col items-center bg-white px-4', className)}
    >
      <h2 className="py-2 text-xl font-semibold">답안 요약</h2>
      <span className="">에세이 주제</span>
      <span className="font-bold text-primary-500">&quot;{title}&quot;</span>
      <div className="grid w-full grid-cols-[repeat(2,auto)] gap-y-3 px-4 py-3 font-semibold">
        <span>글자 수 :</span>
        <span>{countCharacters}자</span>
        <span>문장 수 :</span>
        <span>{countSentences}문장</span>
        <span>답안 제출일 :</span>
        <span>{createdAt.split(' ')[0]}</span>
      </div>
    </div>
  );
}

export default SummaryView;
