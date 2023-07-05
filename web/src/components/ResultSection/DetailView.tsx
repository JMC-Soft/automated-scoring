'use client';

import React from 'react';
import clsx from 'clsx';
import HorizontalBarChart from '@/components/ui/Chart/HorizontalBarChart';

const defaultData = [
  {
    mainCategory: '표현',
    subCategory: ['문법의 적절성', '단어 사용의 적절성', '문장 표현의 적절성'],
  },
  {
    mainCategory: '구성',
    subCategory: [
      '문단 내 구조의 적절성',
      '문단 간 구조의 적절성',
      '구조의 일관성',
      '분량의 적절성',
    ],
  },
  {
    mainCategory: '내용',
    subCategory: [
      '주제의 명료성',
      '근거의 적절성',
      '사고의 창의성',
      '프롬프트 독해력',
    ],
  },
];

function DetailView() {
  return (
    <div className="col-start-2 row-start-1 row-end-3 flex h-full w-full flex-col justify-around self-center justify-self-center rounded-lg px-12 py-3">
      <span className="result-title flex h-16 items-center text-xl font-semibold text-primary-700">
        채점 상세
      </span>
      <table className="w-full overflow-hidden whitespace-nowrap rounded-t-xl">
        <thead>
          <tr className="h-12 rounded-t-xl border border-primary-700 bg-primary-700 text-white">
            <th colSpan={2} className="">
              채점 영역
            </th>
            <th className="">그래프</th>
            <th className="px-1">점수</th>
            <th className="px-1">등급</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {defaultData.map((tableData, idx) =>
            tableData.subCategory.map((sub, subIdx) => {
              return (
                <tr
                  className={clsx('h-12 border border-primary-700', {
                    'bg-gray-200': idx % 2 === 1,
                  })}
                >
                  {subIdx === 0 && (
                    <td
                      rowSpan={tableData.subCategory.length}
                      className="w-2/12 whitespace-nowrap border border-r border-primary-700 text-center"
                    >
                      {tableData.mainCategory} 영역
                    </td>
                  )}
                  <td className="w-3/12 whitespace-nowrap border border-primary-700 px-4 text-center">
                    {sub}
                  </td>
                  <td className="relative h-12">
                    <HorizontalBarChart
                      className="absolute inset-0 h-full w-full"
                      dataset1={80}
                    />
                  </td>
                  <td className="w-1/12 border border-primary-700 text-center">
                    9
                  </td>
                  <td className="w-1/12 border border-primary-700 text-center">
                    2
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DetailView;
