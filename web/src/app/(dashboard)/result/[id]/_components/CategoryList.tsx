import React from 'react';
import clsx from 'clsx';
import CategoryGrade from '@/app/(dashboard)/result/[id]/_components/CategoryGrade';
import { Statistic } from '@/lib/types';

function CategoryList({ dataList }: { dataList: Statistic[] }) {
  return (
    <div className="flex w-full flex-1 items-center">
      {dataList.map((category, index) => (
        <div
          className={clsx('w-1/4 ', {
            'border-r-4 border-background-500': index !== 3,
          })}
          key={category.title}
        >
          <CategoryGrade
            grade={category.grade}
            score={category.score}
            max={category.max}
            title={category.title}
          />
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
