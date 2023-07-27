import React from 'react';
import clsx from 'clsx';
import { HistoryEssay } from '@/lib/types';

function RecentGradeHistory({ dataList }: { dataList: HistoryEssay[] }) {
  return (
    <div className="flex flex-col gap-y-1 bg-background-500 py-3">
      <h2 className="px-8 text-lg">최근 제출 결과</h2>
      <div className="grid flex-1 grid-cols-5 gap-2 px-8">
        {dataList.map((data) => {
          const grade = data.grade ?? 'B';
          const [, month, day] = data.createdAt.split(' ')[0].split('-');

          return (
            <div
              key={Math.random()}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex w-full text-lg font-bold  ">
                <div
                  className={clsx(
                    'flex aspect-square w-full items-center justify-center rounded-full border-2',
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
