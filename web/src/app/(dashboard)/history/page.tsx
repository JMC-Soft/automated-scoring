'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import RecentGradeHistory from '@/app/(dashboard)/history/_components/RecentGradeHistory';
import LineChart from '@/components/ui/Chart/LineChart';
import HistoryView from '@/app/(dashboard)/_components/HistoryView';
import WordTable from '@/app/(dashboard)/history/_components/WordTable';
import fetchHistory from '@/lib/utils/api/history/fetchHistory';
import WordCloud from '@/app/(dashboard)/history/_components/WordCloud';
import CategoryRadar from '@/app/(dashboard)/history/_components/CategoryRadar';
import { HistoryResponse } from '@/lib/types/response';

function Page() {
  const [data, setData] = useState<HistoryResponse>({} as HistoryResponse);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let result = {} as HistoryResponse;
      try {
        result = await fetchHistory();
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'token is invalid') {
            alert('로그인이 필요합니다.');
            router.push('/signin');
            return;
          }
        }
      }
      setData(result);
    };

    fetchData();
  }, [router]);

  const {
    countAverageCharacters,
    countAverageSentences,
    countTotal,
    information,
    persuade,
    resultHistory,
    expression,
    wordCloud,
  } = data;

  const radarData = [information, persuade, expression];

  return (
    <div className="grid-rows-history grid-cols-history relative grid h-full  gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
      <div className="col-span-2 col-start-1 flex flex-wrap bg-white desktop:col-span-1 desktop:col-start-1 desktop:row-start-1 desktop:row-end-3 desktop:flex-col">
        <div className="w-1/2 tabletLandscape:w-1/3 desktop:w-full">
          <h2 className="flex w-full items-center justify-center bg-secondary-300 text-2xl font-semibold text-white">
            워드 클라우드
          </h2>
          <div className="aspect-[5/3] w-full">
            <WordCloud data={wordCloud} />
          </div>
        </div>
        <RecentGradeHistory dataList={resultHistory?.slice(0, 10)} />
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
                    'bg-white tabletLandscape:bg-background-500':
                      index % 2 === 1,
                    'bg-background-500 tabletLandscape:bg-white':
                      index % 2 === 0,
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

      <LineChart
        className="col-span-2 desktop:col-start-2 desktop:row-start-1"
        dataList={resultHistory?.slice(0, 10).reverse()}
      />
      <HistoryView
        className="col-span-2 row-start-4 desktop:col-start-4 desktop:row-start-1 desktop:row-end-3"
        title="점수 이력"
        data={resultHistory}
        countTotal={countTotal}
        isLink={false}
      />
      <WordTable
        className="row-start-3 desktop:col-start-2 desktop:col-end-3 desktop:row-start-2 desktop:row-end-3"
        data={wordCloud}
      />

      <CategoryRadar
        className="row-start-3 desktop:col-start-3 desktop:col-end-4 desktop:row-start-2 desktop:row-end-3"
        radarData={radarData}
      />
    </div>
  );
}

export default Page;
