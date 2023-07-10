'use client';

import React from 'react';
import OverallPercentage from '@/app/result/_components/OverallPercentage';
import CategoryGrade from '@/app/result/_components/CategoryGrade';
import BoxPlotView from '@/components/ui/Chart/BoxPlot';
import DetailView from '@/app/result/_components/DetailView';
import SummaryView from '@/app/result/_components/SummaryView';
import ReviewNote from '@/app/result/_components/ReviewNote';
import RadarView from '@/app/result/_components/RadarView';
import RecentHistoryView from '@/app/result/_components/RecentHistoryView';

function Page() {
  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <main className="grid-cols-result grid-rows-result relative grid h-full w-full gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
        <OverallPercentage />
        <CategoryGrade />
        <BoxPlotView
          max={30}
          min={17}
          q1={22}
          median={26}
          q3={29}
          point={25}
          categoryList={['표현', '구성', '문맥', '총합']}
        />
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
