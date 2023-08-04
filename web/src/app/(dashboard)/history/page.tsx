'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LineChart from '@/components/ui/Chart/LineChart';
import HistoryView from '@/app/(dashboard)/_components/HistoryView';
import WordTable from '@/app/(dashboard)/history/_components/WordTable';
import fetchHistory from '@/lib/utils/api/history/fetchHistory';
import CategoryRadar from '@/app/(dashboard)/history/_components/CategoryRadar';
import { HistoryResponse } from '@/lib/types/response';
import Summary from '@/app/(dashboard)/history/_components/Summary';

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
      if (!result?.resultHistory) {
        alert('아직 응시 이력이 없습니다.');
        router.push('/');
      }
      setData(result);
    };

    fetchData();
  }, [router]);

  const [radarData, setRadarData] = useState<
    { title: string; average: number; score: number | null }[]
  >([]);

  const {
    countAverageCharacters,
    countAverageSentences,
    countTotal,
    resultHistory,
    wordCloud,
  } = data;

  useEffect(() => {
    setRadarData([data.information, data.persuade, data.expression]);
  }, [data]);

  return (
    <div className="grid-rows-history grid-cols-history relative grid h-full  gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
      <Summary
        countAverageCharacters={countAverageCharacters}
        countAverageSentences={countAverageSentences}
        countTotal={countTotal}
        resultHistory={resultHistory}
        wordCloud={wordCloud}
        className="col-span-2 col-start-1 desktop:col-span-1 desktop:col-start-1 desktop:row-start-1 desktop:row-end-3"
      />
      <LineChart
        className="col-span-2 row-span-1 desktop:col-start-2 desktop:row-start-1"
        dataList={resultHistory?.slice(0, 10).reverse() ?? []}
        countTotal={countTotal}
      />
      <HistoryView
        className="col-span-2 row-start-4 desktop:col-start-4 desktop:row-start-1 desktop:row-end-3"
        title="응시 이력"
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
