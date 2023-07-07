'use client';

import React from 'react';
import NormalDistributionGraph from '@/components/ui/Chart/NormalDistributionGraph';
import TwiceBarChart from '@/components/ui/Chart/TwiceBarChart';

type Props = {
  percentageStart: number;
  percentageEnd: number;
  totalScore: number;
  totalAverage: number;
};

function OverView({
  percentageStart,
  percentageEnd,
  totalScore,
  totalAverage,
}: Props) {
  return (
    <div className="flex h-full w-4/5 flex-col justify-around self-center justify-self-center">
      <span className="result-title flex h-16 items-center text-xl font-semibold text-primary-700">
        채점 개요
      </span>
      <div className="overview-grid h-4/5 w-full self-center justify-self-center rounded-lg border-4 border-primary-700">
        <h5 className="w-full bg-primary-700 py-2 text-center text-white">
          채점 결과
        </h5>
        <div className="flex h-4/5 w-11/12 items-center justify-center self-center justify-self-center">
          <NormalDistributionGraph
            innerText={`상위 ${(percentageStart + percentageEnd) / 2}%`}
            className="h-full w-full"
            rangeStart={100 - percentageEnd}
            rangeEnd={100 - percentageStart}
          />
        </div>
        <div className="flex flex-col items-center gap-y-1 self-center justify-self-center py-1">
          <div>
            <span className="text-4xl font-bold">{totalScore}</span>
            <span className="text-xl text-gray-300"> / 30 점</span>
          </div>
          <div className="font-bold text-gray-400">
            전체 평균 {totalAverage} 점
          </div>
        </div>
        <div className="col-start-2 row-start-1 row-end-4 flex h-full w-full items-center justify-center border-l-4 border-primary-700">
          <TwiceBarChart
            dataset1={totalScore}
            dataset2={totalAverage}
            className="h-full w-11/12"
          />
        </div>
      </div>
    </div>
  );
}

export default OverView;