import React from 'react';

function Summary({
  topic,
  countCharacters,
  countSentences,
  createdAt,
}: {
  topic: string;
  countCharacters: number;
  countSentences: number;
  createdAt: string;
}) {
  return (
    <article className="col-start-1 col-end-3 row-start-2 row-end-3 flex flex-col items-center justify-between bg-white px-4 py-2">
      <h2 className="text-lg font-semibold">답안 요약</h2>
      <span>에세이 주제</span>
      <span className="text-center text-sm font-semibold text-primary-500">
        &quot;{topic}&quot;
      </span>
      <div className="grid w-4/5 grid-cols-[repeat(2,auto)] gap-y-1 font-semibold">
        <span>글자 수 :</span>
        <span>{countCharacters}자</span>
        <span>문장 수 :</span>
        <span>{countSentences}문장</span>
        <span>답안 제출일 :</span>
        <span>{createdAt.split(' ')[0]}</span>
      </div>
    </article>
  );
}

export default Summary;
