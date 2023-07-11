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

function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <main className="grid-cols-result grid-rows-result relative grid h-full w-full gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
        <OverallPercentage />
        <CategoryGrade />
        <BoxPlotView />
        <ReviewNote className="col-start-1 col-end-3 row-start-2 row-end-4 bg-white p-1.5" />
        <SummaryView className="col-start-3 col-end-4" />
        <RecentHistoryView />
        <RadarView />
        <DetailView className="col-start-4 col-end-5 row-start-2 row-end-4" />
      </main>
    </div>
  );
}

export default Page;
