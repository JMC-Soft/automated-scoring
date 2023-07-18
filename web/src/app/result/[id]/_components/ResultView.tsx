'use client';

import React from 'react';
import OverallPercentage from '@/app/result/[id]/_components/OverallPercentage';
import CategoryGrade from '@/app/result/[id]/_components/CategoryGrade';
import BoxPlotView from '@/app/result/[id]/_components/BoxPlotView';
import ReviewNote from '@/app/result/[id]/_components/ReviewNote';
import SummaryView from '@/app/result/[id]/_components/SummaryView';
import DetailView from '@/app/result/[id]/_components/DetailView';
import RecentHistoryView from '@/app/result/[id]/_components/RecentHistoryView';
import RadarView from '@/app/result/[id]/_components/RadarView';
import { EssayResult } from '@/lib/types';

function ResultView({ data }: { data: EssayResult }) {
  const {
    exp,
    org,
    countCharacters,
    countSentences,
    total,
    cont,
    createdAt,
    essayInfo,
  } = data;

  console.log(data);

  const { text, topic: title } = essayInfo;

  return (
    <main className="grid-cols-result grid-rows-result relative grid h-full w-full gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
      <OverallPercentage percentage={Math.round(total.percentage)} />
      <CategoryGrade total={total} exp={exp} cont={cont} org={org} />
      <BoxPlotView exp={exp} cont={cont} org={org} />
      <ReviewNote
        text={text}
        className="col-start-1 col-end-3 row-start-2 row-end-4 bg-white p-1.5"
      />
      <SummaryView
        title={title}
        countCharacters={countCharacters}
        countSentences={countSentences}
        createdAt={createdAt}
        className="col-start-3 col-end-4"
      />
      <DetailView
        exp={exp}
        cont={cont}
        org={org}
        className="col-start-4 col-end-5 row-start-2 row-end-4"
      />
      <RecentHistoryView
        data={Array(3).fill(0)}
        className="col-start-5 row-start-2 row-end-4"
      />
      <RadarView exp={exp} cont={cont} org={org} />
    </main>
  );
}

export default ResultView;
