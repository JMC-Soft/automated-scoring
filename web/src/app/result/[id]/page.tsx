'use client';

import React from 'react';
import OverallPercentage from '@/app/result/[id]/_components/OverallPercentage';
import CategoryGrade from '@/app/result/[id]/_components/CategoryGrade';
import DetailView from '@/app/result/[id]/_components/DetailView';
import SummaryView from '@/app/result/[id]/_components/SummaryView';
import ReviewNote from '@/app/result/[id]/_components/ReviewNote';
import RadarView from '@/app/result/[id]/_components/RadarView';
import RecentHistoryView from '@/app/result/[id]/_components/RecentHistoryView';
import BoxPlotView from '@/app/result/[id]/_components/BoxPlotView';
import { EssayResult } from '@/lib/types';

async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`/evaluate/${params.id}/result`);
  const {
    exp,
    org,
    countCharacters,
    countSentences,
    total,
    cont,
    createdAt,
    essayInfo: { text, topic: title },
  } = (await res.json()) as EssayResult;

  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <main className="grid-cols-result grid-rows-result relative grid h-full w-full gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
        <OverallPercentage percentage={total.percentage} />
        <CategoryGrade total={total} exp={exp} cont={cont} org={org} />
        <BoxPlotView total={total} exp={exp} cont={cont} org={org} />
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
        <RecentHistoryView />
        <RadarView exp={exp} cont={cont} org={org} />
      </main>
    </div>
  );
}

export default Page;
