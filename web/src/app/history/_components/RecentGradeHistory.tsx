import React from 'react';
import clsx from 'clsx';

function RecentGradeHistory() {
  return (
    <div className="flex flex-col gap-y-1 bg-background-500 py-3">
      <h2 className="px-8 text-lg">최근 제출 결과</h2>
      <div className="grid flex-1 grid-cols-5 gap-2 px-8">
        {Array(10)
          .fill(0)
          .map(() => (
            <div
              key={Math.random()}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex w-full text-lg font-bold text-primary-500 ">
                <div className="flex aspect-square w-full items-center justify-center rounded-full border-2 border-primary-500">
                  A
                </div>
              </div>
              <span className="text-xs">07/14</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentGradeHistory;
