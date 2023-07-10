'use client';

import React from 'react';
import clsx from 'clsx';
import DoughnutChart from '@/components/ui/Chart/DoughnutChart';

function CategoryGrade() {
  return (
    <article className="col-start-2 col-end-5 flex flex-col items-center bg-white">
      <div className="flex h-10 w-full items-center gap-x-10 px-20">
        <div className="relative h-3 w-4/5 rounded-full bg-gray-200 before:absolute before:h-3 before:w-[90%] before:rounded-full before:bg-primary-500/80" />
        <h3 className="text-center text-xl font-bold text-primary-500">28점</h3>
      </div>
      <div className="flex flex-1 items-center">
        {['표현', '구성', '문맥', '총합'].map((category, index) => (
          <div
            className={clsx('w-1/4', {
              'border-r-4 border-background-500': index !== 3,
            })}
            key={category}
          >
            <DoughnutChart title={category} className="w-full" />
          </div>
        ))}
      </div>
    </article>
  );
}

export default CategoryGrade;
