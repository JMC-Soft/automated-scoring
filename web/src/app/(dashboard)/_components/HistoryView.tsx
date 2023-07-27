import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { HistoryEssay } from '@/lib/types';
import calcDayDiff from '@/lib/utils/calcDayDiff';
import TypeTag from '@/components/TypeTag';

type Props = {
  data: HistoryEssay[];
  countTotal: number;
  title: string;
  className?: string;
  isLink?: boolean;
};

function HistoryView({
  className,
  data,
  title,
  countTotal,
  isLink = true,
}: Props) {
  const current = new Date();

  return (
    <article
      className={clsx(
        'flex flex-col items-center gap-y-2 overflow-y-scroll bg-white py-2',
        className,
      )}
    >
      <h2 className="text-xl">{title}</h2>
      {data ? (
        <div className="grid w-full flex-1 grid-rows-3">
          {data.map((value, idx) => {
            const { topic, type, scoringResult, essayId, createdAt } = value;
            const date = new Date(createdAt.split(' ')[0]);

            const dayDiff = calcDayDiff(current, date);

            return (
              <Link
                href={`/result/${essayId}`}
                key={essayId}
                className="grid-cols-recent-history grid-rows-recent-history grid w-full flex-1 cursor-pointer gap-x-4 gap-y-1 px-6 py-1 hover:bg-background-500"
              >
                <div className="self-center justify-self-center text-sm font-semibold text-gray-500">
                  {countTotal - idx} 회차
                </div>
                <h2 className="truncate text-lg font-semibold">{topic}</h2>
                <span className="self-end text-sm text-gray-400 ">
                  {dayDiff === 0 ? '오늘' : `${dayDiff}일 전`}
                </span>
                <TypeTag type={type} />
                <div className="col-span-2 flex flex-col justify-evenly">
                  <div>
                    <span className="font-bold">종합 :</span>{' '}
                    {scoringResult.total.score}
                  </div>
                  <div className="flex gap-x-2">
                    <div>
                      <span className="font-bold">내용 :</span>{' '}
                      {scoringResult.cont.score}
                    </div>
                    <div>
                      <span className="font-bold">구성 :</span>{' '}
                      {scoringResult.org.score}
                    </div>
                    <div>
                      <span className="font-bold">표현 :</span>{' '}
                      {scoringResult.exp.score}
                    </div>
                  </div>
                  <div>글자 수 : {scoringResult.countCharacters}자</div>
                  <div>문장 수 : {scoringResult.countSentences}문장</div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          로그인을 하시면 채점 기록을 확인할 수 있습니다.
        </div>
      )}

      {isLink && data && (
        <Link
          href="/history"
          className="font-semibolda rounded-sm border-2 border-primary-500 bg-secondary-500/20 px-4 py-1 text-sm transition-all hover:scale-105"
        >
          응시 이력 더 보러가기
        </Link>
      )}
    </article>
  );
}

export default HistoryView;
