import React from 'react';
import clsx from 'clsx';
import { Statistic, SubStatistic } from '@/lib/types';

function DetailsView({
  dataList,
  total,
  className,
}: {
  dataList: SubStatistic[];
  total: Statistic;
  className: string;
}) {
  return (
    <article
      className={clsx(
        'flex flex-col items-center gap-y-6 bg-white px-6 py-6',
        className,
      )}
    >
      <h3 className="text-xl font-semibold">채점 영역별 점수</h3>
      {dataList.filter((value) => value).length > 0 && (
        <table className="w-full flex-1 whitespace-nowrap">
          <thead>
            <tr className="bg-primary-50">
              <th colSpan={2}>채점 영역</th>
              <th className="border-l border-white px-1">점수</th>
              <th className="border-l border-white px-1">총점</th>
            </tr>
          </thead>

          <tbody className="w-full text-center">
            {dataList.map((category, idx) =>
              category.detail.map((value, subIdx) => (
                <tr
                  key={value.title}
                  className={clsx('border-b border-white', {
                    'bg-accent-500/10': idx === 0,
                    'bg-success-500/10': idx === 1,
                    'bg-primary-500/10': idx === 2,
                  })}
                >
                  {subIdx === 0 && (
                    <td
                      rowSpan={category.detail.length}
                      className="whitespace-nowrap border-r border-white text-center"
                    >
                      {category.title} 영역
                    </td>
                  )}
                  <td className="whitespace-nowrap border-r border-white">
                    {value.title}
                  </td>
                  <td className="border-r border-white">
                    {value.score}{' '}
                    <span className="text-sm text-gray-400"> / 3</span>
                  </td>
                  {subIdx === 0 && (
                    <td
                      rowSpan={category.detail.length}
                      className="whitespace-nowrap text-center text-lg"
                    >
                      {category.score}
                      <span className="text-base text-gray-400">
                        {' '}
                        / {category.max}
                      </span>
                    </td>
                  )}
                </tr>
              )),
            )}
            <tr className="border-b border-white bg-gray-300/30">
              <td className="whitespace-nowrap border-r border-white text-center">
                종합
              </td>
              <td className="border-r border-white" />
              <td className="border-r border-white" />
              <td className="whitespace-nowrap text-center">
                {total.score}
                <span className="text-base text-gray-400"> / {total.max}</span>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </article>
  );
}

export default DetailsView;
