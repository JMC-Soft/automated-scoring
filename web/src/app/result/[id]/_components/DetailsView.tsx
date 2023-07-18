import React from 'react';
import { SubStatistic } from '@/lib/types';

function DetailsView({ dataList }: { dataList: SubStatistic[] }) {
  return (
    <article className="col-start-3 col-end-4 row-start-2 row-end-4 flex flex-col items-center gap-y-6 bg-white px-8 py-6">
      <h3 className="text-2xl">채점 영역별 점수</h3>
      <table className="w-full flex-1 whitespace-nowrap">
        <thead>
          <tr className="bg-primary-50">
            <th colSpan={2}>채점 영역</th>
            <th className="h-10 border-l border-white px-1">점수</th>
            <th className="h-10 border-l border-white px-1">총점</th>
          </tr>
        </thead>
        <tbody className="w-full text-center">
          {dataList.map((category) =>
            category.detail.map((value, subIdx) => (
              <tr key={value.title} className="border-b">
                {subIdx === 0 && (
                  <td
                    rowSpan={category.detail.length}
                    className="whitespace-nowrap border-r text-center"
                  >
                    {category.title} 영역
                  </td>
                )}
                <td className="h-10 whitespace-nowrap border-r">
                  {value.title}
                </td>
                <td className="border-r">
                  {value.score}
                  <span className="text-sm text-gray-400">/ 3</span>
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
        </tbody>
      </table>
    </article>
  );
}

export default DetailsView;
