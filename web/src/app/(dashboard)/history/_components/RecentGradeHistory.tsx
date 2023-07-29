import React from 'react';
import clsx from 'clsx';
import { HistoryEssay } from '@/lib/types';

function RecentGradeHistory({ dataList }: { dataList: HistoryEssay[] }) {
  return (
    <div className="flex w-1/2 flex-col gap-y-2 bg-background-500 px-2 py-4 tabletLandscape:w-1/3 desktop:w-full">
      <h2 className="px-2 text-xl font-semibold">최근 제출 결과</h2>
      <div className="grid flex-1 grid-cols-5 grid-rows-2 gap-2 px-2">
        {dataList?.map((data) => {
          const grade = data.grade ?? 'B';
          const [, month, day] = data.createdAt.split(' ')[0].split('-');

          return (
            <div
              key={Math.random()}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <div
                className={clsx(
                  'flex aspect-square w-5/6 items-center justify-center rounded-full border-2 text-2xl font-bold',
                  {
                    'border-secondary-500 text-secondary-500': grade === 'A',
                  },
                  {
                    'border-primary-500 text-primary-500': grade === 'B',
                  },
                  {
                    'border-warning-500 text-warning-500': grade === 'C',
                  },
                )}
              >
                {grade}
              </div>
              <span className="text-xs">
                {month}/{day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentGradeHistory;
