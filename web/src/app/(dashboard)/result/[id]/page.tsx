import React from 'react';
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

async function Page({ params }: { params: { id: string } }) {
  const result = await fetchResult(params.id);

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
  } = result;

  console.log(exp);

  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <main className="grid-cols-result grid-rows-result relative grid h-full w-full gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
        <OverallPercentage percentage={total.percentage} />
        <article className="col-start-2 col-end-5 flex flex-col items-center bg-white">
          <Progress max={total.max} current={total.score} />
          <CategoryList dataList={[cont, org, exp, total]} />
        </article>
        <BoxPlotView dataList={[cont, org, exp]} />
        <ReviewNote text={text} />
        <Summary
          topic={topic}
          countCharacters={countCharacters}
          countSentences={countSentences}
          createdAt={createdAt}
        />
        <RadarView
          myDataList={[...cont.detail, ...org.detail, ...exp.detail]}
          averageDataList={[
            ...cont.subAverage,
            ...org.subAverage,
            ...exp.subAverage,
          ]}
        />
        <DetailsView dataList={[cont, org, exp]} total={total} />
        <HistoryView
          countTotal={countTotal}
          title="최근 3회 응시 이력"
          data={resultHistory}
          className="col-start-5 row-start-2 row-end-4"
        />
      </main>
    </div>
  );
}

export default Page;
