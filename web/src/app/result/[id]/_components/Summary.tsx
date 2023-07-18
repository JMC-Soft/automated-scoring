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
    <article className="col-start-1 col-end-3 row-start-2 row-end-3 flex flex-col items-center bg-white px-4">
      <h2 className="py-2 text-xl font-semibold">답안 요약</h2>
      <span className="">에세이 주제</span>
      <span className="font-bold text-primary-500">&quot;{topic}&quot;</span>
      <div className="grid w-full grid-cols-[repeat(2,auto)] gap-y-1 px-4 py-3 font-semibold">
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
