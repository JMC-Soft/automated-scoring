import React from 'react';
import clsx from 'clsx';

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
    subCategory: ['주제의 명료성', '근거의 적절성', '프롬프트 독해력'],
  },
];

function DetailView({ className }: { className?: string }) {
  const tempData = [2, 1, 2, 1, 2, 3, 1, 3, 2, 3];

  return (
    <div
      className={clsx(
        ' flex flex-col items-center gap-y-6 bg-white px-8 py-6',
        className,
      )}
    >
      <h3 className="text-2xl">채점 상세</h3>
      <table className="w-full flex-1 whitespace-nowrap">
        <thead>
          <tr className="bg-primary-50">
            <th colSpan={2}>채점 영역</th>
            <th className="h-10 border-l border-white px-1">점수</th>
            <th className="h-10 border-l border-white px-1">총점</th>
          </tr>
        </thead>
        <tbody className="w-full text-center">
          {defaultData.map((tableData, idx) =>
            tableData.subCategory.map((sub, subIdx) => (
              <tr key={sub} className="border-b">
                {subIdx === 0 && (
                  <td
                    rowSpan={tableData.subCategory.length}
                    className="whitespace-nowrap border-r text-center"
                  >
                    {tableData.mainCategory} 영역
                  </td>
                )}
                <td className="h-10 whitespace-nowrap border-r">{sub}</td>
                <td className="border-r">{tempData[idx * 3 + subIdx]}</td>
                {subIdx === 0 && (
                  <td
                    rowSpan={tableData.subCategory.length}
                    className="whitespace-nowrap text-center"
                  >
                    8
                  </td>
                )}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DetailView;
