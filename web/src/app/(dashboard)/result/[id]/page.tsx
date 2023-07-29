'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OverallPercentage from '@/app/(dashboard)/result/[id]/_components/OverallPercentage';
import Progress from '@/app/(dashboard)/result/[id]/_components/Progress';
import BoxPlotView from '@/app/(dashboard)/result/[id]/_components/BoxPlotView';
import RadarView from '@/app/(dashboard)/result/[id]/_components/RadarView';
import HistoryView from '@/app/(dashboard)/_components/HistoryView';
import CategoryList from '@/app/(dashboard)/result/[id]/_components/CategoryList';
import ReviewNote from '@/app/(dashboard)/result/[id]/_components/ReviewNote';
import Summary from '@/app/(dashboard)/result/[id]/_components/Summary';
import DetailsView from '@/app/(dashboard)/result/[id]/_components/DetailsView';
import fetchResult from '@/lib/utils/api/essay/fetchResult';
import { ResultResponse } from '@/lib/types/response';

function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState({} as ResultResponse);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let result = {} as ResultResponse;
      try {
        result = await fetchResult(params.id);
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
  }, [params.id, router]);

  const {
    exp,
    org,
    countCharacters,
    countSentences,
    total,
    cont,
    createdAt,
    text,
    topic,
    resultHistory,
    countTotal,
  } = data;

  return (
    <main className="grid-cols-result grid-rows-result relative grid h-full w-full gap-4 bg-background-500 p-3 desktopWide:gap-8 desktopWide:p-6 [&>*]:shadow-lg">
      <OverallPercentage percentage={total?.percentage} />
      <article className="col-span-3 col-start-1 row-span-1 row-start-2 flex flex-col items-center overflow-auto bg-white tabletLandscape:col-start-2 tabletLandscape:col-end-4 tabletLandscape:row-start-1 desktopWide:col-end-5">
        <Progress max={total?.max} current={total?.score} />
        <CategoryList dataList={[cont, org, exp, total]} />
      </article>
      <BoxPlotView
        className="col-span-2 col-start-2 row-start-1 tabletLandscape:col-span-1 tabletLandscape:col-start-4 desktopWide:col-start-5"
        dataList={[cont, org, exp]}
      />
      <Summary
        className="col-span-1 col-start-1 tabletLandscape:col-span-2 tabletLandscape:row-span-1 tabletLandscape:row-start-2"
        topic={topic}
        countCharacters={countCharacters}
        countSentences={countSentences}
        createdAt={createdAt}
      />
      <ReviewNote
        className="col-span-2 col-start-2 row-span-1 row-start-3 tabletLandscape:col-start-1 tabletLandscape:col-end-3 tabletLandscape:row-start-3"
        text={text}
      />
      <RadarView
        className="col-span-3 col-start-1 tabletLandscape:col-span-2 tabletLandscape:col-start-3 tabletLandscape:row-span-2 tabletLandscape:row-start-2 desktopWide:col-span-1 desktopWide:col-start-4 desktopWide:row-span-2"
        dataList={[cont, org, exp]}
      />
      <DetailsView
        className="col-span-2 col-start-1 row-span-1 tabletLandscape:col-start-1 tabletLandscape:row-start-4 desktopWide:col-span-1 desktopWide:col-start-3 desktopWide:row-span-2 desktopWide:row-start-2"
        dataList={[cont, org, exp]}
        total={total}
      />
      <HistoryView
        countTotal={countTotal}
        title="최근 3회 응시 이력"
        data={resultHistory}
        className="col-span-1 tabletLandscape:col-span-2 tabletLandscape:col-start-3 tabletLandscape:row-span-1 tabletLandscape:row-start-4 desktopWide:col-span-1 desktopWide:col-start-5 desktopWide:row-span-2 desktopWide:row-start-2"
      />
    </main>
  );
}

export default Page;
