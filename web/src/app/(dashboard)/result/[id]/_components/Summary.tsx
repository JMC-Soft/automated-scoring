import React from 'react';
import clsx from 'clsx';

function Summary({
  topic,
  countCharacters,
  countSentences,
  createdAt,
  className,
}: {
  topic: string;
  countCharacters: number;
  countSentences: number;
  createdAt: string;
  className: string;
}) {
  return (
    <article
      className={clsx(
        'flex flex-col items-center justify-between bg-white px-2 py-4 desktop:py-2',
        className,
      )}
    >
      <h2 className="text-lg font-semibold">답안 요약</h2>
      <span>에세이 주제</span>
      <span className="text-center text-sm font-semibold text-primary-500">
        &quot;{topic ?? ''}&quot;
      </span>
      <div className="grid w-4/5 grid-cols-[repeat(2,auto)] gap-y-1 font-semibold">
        <span>글자 수 :</span>
        <span>{countCharacters ?? 0}자</span>
        <span>문장 수 :</span>
        <span>{countSentences ?? 0}문장</span>
        <span>답안 제출일 :</span>
        <span>{createdAt?.split(' ')[0] ?? new Date().getFullYear()}</span>
      </div>
    </article>
  );
}

export default Summary;
