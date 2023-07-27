'use client';

import React from 'react';
import CategoryGrade from '@/app/(dashboard)/result/[id]/_components/CategoryGrade';
import { Statistic } from '@/lib/types';

function CategoryList({ dataList }: { dataList: Statistic[] }) {
  const isDataListEmpty = dataList.filter((value) => value).length === 0;

  return (
    <div className="relative flex h-4/5 max-h-[80%] w-full items-center justify-around overflow-auto">
      {!isDataListEmpty &&
        dataList.map((category, index) => (
          <>
            <div className="relative h-full w-1/5" key={category.title}>
              <div className="relative flex h-full w-full flex-col items-center overflow-auto scrollbar-hide">
                <CategoryGrade
                  grade={category.grade}
                  score={category.score}
                  max={category.max}
                  title={category.title}
                />
              </div>
            </div>
            {index !== 3 && (
              <div className="h-full w-1 rounded-full bg-background-500" />
            )}
          </>
        ))}
    </div>
  );
}

export default CategoryList;
