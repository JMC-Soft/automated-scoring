'use client';

import React from 'react';
import clsx from 'clsx';
import DoughnutChart from '@/components/ui/Chart/DoughnutChart';
import { Statistic, SubStatistic } from '@/lib/types';

const CATEGORY_MAP = {
  0: '표현',
  1: '구성',
  2: '내용',
  3: '종합',
};

function CategoryGrade({
  total,
  exp,
  cont,
  org,
}: {
  total: Statistic;
  exp: SubStatistic;
  cont: SubStatistic;
  org: SubStatistic;
}) {
  return (
    <article className="col-start-2 col-end-5 flex flex-col items-center bg-white">
      <div className="flex h-10 w-3/4 items-center gap-x-10">
        <div
          className={`relative h-3 flex-1 rounded-full bg-gray-200 before:absolute before:h-3 before:w-[${
            (total.score / 30) * 100
          }%] before:rounded-full before:bg-secondary-500/80`}
        />
        <h3 className="flex items-baseline gap-x-2 text-2xl font-bold text-secondary-500">
          {total.score}점
          <span className="text-base font-medium text-gray-400"> / 30점</span>
        </h3>
      </div>
      <div className="flex flex-1 items-center">
        {[total, exp, cont, org].map((category, index) => {
          const title = CATEGORY_MAP[index as keyof typeof CATEGORY_MAP];

          return (
            <div
              className={clsx('w-1/4', {
                'border-r-4 border-background-500': index !== 3,
              })}
              key={title}
            >
              <DoughnutChart
                statistics={category}
                title={title}
                className="w-full"
              />
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default CategoryGrade;
