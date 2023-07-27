import React from 'react';
import RecentGradeHistory from '@/app/(dashboard)/history/_components/RecentGradeHistory';
import LineChart from '@/components/ui/Chart/LineChart';
import HistoryView from '@/app/(dashboard)/_components/HistoryView';
import WordTable from '@/app/(dashboard)/history/_components/WordTable';
import fetchHistory from '@/lib/utils/api/history/fetchHistory';
import WordCloud from '@/app/(dashboard)/history/_components/WordCloud';
import CategoryRadar from '@/app/(dashboard)/history/_components/CategoryRadar';

async function Page() {
  const data = await fetchHistory();

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
    <div className="h-[calc(100vh-4rem)] p-4">
      <div className="grid-rows-history grid-cols-history relative grid h-full w-full gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
        <div className="col-start-1 row-start-1 row-end-3 flex flex-col bg-white">
          <h2 className="flex h-[4%] w-full items-center justify-center bg-secondary-300 text-lg font-semibold text-white">
            워드 클라우드
          </h2>
          <div className="aspect-[4/3] w-full">
            <WordCloud data={wordCloud} />
          </div>
          <RecentGradeHistory dataList={resultHistory.slice(0, 10)} />
          <div className="flex w-full flex-1 flex-col justify-center gap-y-1 bg-white px-4 xl:px-12">
            <span className="text-3xl font-bold">{countTotal}</span>
            <h3 className="text-lg">전체 응시 횟수</h3>
          </div>
          <div className="flex w-full flex-1 flex-col justify-center gap-y-1 bg-background-500 px-4 xl:px-12">
            <span className="text-3xl font-bold">{countAverageSentences}</span>
            <h3 className="text-lg">에세이별 평균 문장 수</h3>
          </div>
          <div className="flex w-full flex-1 flex-col justify-center gap-y-1 px-4 xl:px-12">
            <span className="text-3xl font-bold">{countAverageCharacters}</span>
            <h3 className="text-lg">에세이별 평균 글자 수</h3>
          </div>
        </div>

        <LineChart dataList={resultHistory.slice(0, 10).reverse()} />
        <HistoryView
          title="점수 이력"
          className="col-start-4 row-start-1 row-end-3"
          data={resultHistory}
          countTotal={countTotal}
          isLink={false}
        />
        <WordTable
          data={wordCloud}
          className="col-start-2 col-end-3 row-start-2 row-end-3"
        />

        <CategoryRadar radarData={radarData} />
      </div>
    </div>
  );
}

export default Page;
