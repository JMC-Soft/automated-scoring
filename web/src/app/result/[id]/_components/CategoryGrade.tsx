'use client';

import React, { useEffect } from 'react';
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
  const progressRef = React.useRef<HTMLDivElement>(null);
  const percentage = Math.round((total.score / 30) * 100);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.style.width = `${percentage}%`;
      }
    }, 100); // Short delay before starting the animation

    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <article className="col-start-2 col-end-5 flex flex-col items-center bg-white">
      <div className="flex h-10 w-3/4 items-center gap-x-10">
        <div className="h-3 flex-1 rounded-full bg-gray-200">
          <div
            ref={progressRef}
            style={{ width: 0 }}
            className="h-3 rounded-full bg-secondary-500/80 transition-all duration-1000 ease-out"
          />
        </div>
        <h3 className="flex items-baseline gap-x-2 text-2xl font-bold text-secondary-500">
          {total.score}점
          <span className="text-base font-medium text-gray-400"> / 30점</span>
        </h3>
      </div>
      <div className="flex flex-1 items-center">
        {[cont, org, exp, total].map((category, index) => {
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
