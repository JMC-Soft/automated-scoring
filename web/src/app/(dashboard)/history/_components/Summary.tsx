import React from 'react';
import clsx from 'clsx';
import RecentGradeHistory from '@/app/(dashboard)/history/_components/RecentGradeHistory';
import { HistoryEssay, WordCloud as WordCloudType } from '@/lib/types';
import WordCloud from '@/app/(dashboard)/history/_components/WordCloud';

function Summary({
  wordCloud,
  resultHistory,
  countTotal,
  countAverageSentences,
  countAverageCharacters,
  className,
}: {
  wordCloud: WordCloudType;
  resultHistory: HistoryEssay[];
  countTotal: number;
  countAverageSentences: number;
  countAverageCharacters: number;
  className: string;
}) {
  return (
    <div
      className={clsx('flex flex-wrap bg-white desktop:flex-col', className)}
    >
      <div className="w-1/2 tabletLandscape:w-1/3 desktop:w-full">
        <h2 className="flex w-full items-center justify-center bg-secondary-300 text-2xl font-semibold text-white">
          워드 클라우드
        </h2>
        <div className="aspect-[5/3] w-full">
          <WordCloud data={wordCloud} />
        </div>
      </div>
      <RecentGradeHistory dataList={resultHistory?.slice(0, 10) ?? []} />
      <div className="flex w-full tabletLandscape:w-1/3 tabletLandscape:flex-col desktop:w-full desktop:flex-1">
        {[
          { title: '전체 응시 횟수', value: countTotal },
          { title: '에세이별 평균 문장 수', value: countAverageSentences },
          { title: '에세이별 평균 글자 수', value: countAverageCharacters },
        ].map(({ title, value }, index) => {
          return (
            <div
              key={title}
              className={clsx(
                'flex h-40 w-1/3 flex-1 flex-col justify-evenly bg-background-500 px-4 tabletLandscape:w-full',
                {
                  'bg-white tabletLandscape:bg-background-500': index % 2 === 1,
                  'bg-background-500 tabletLandscape:bg-white': index % 2 === 0,
                },
              )}
            >
              <span className="text-3xl font-bold tabletLandscape:text-2xl">
                {value}
              </span>
              <h3 className="text-xl tabletLandscape:text-lg">{title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Summary;
