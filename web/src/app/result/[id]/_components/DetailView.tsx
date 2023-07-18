import React from 'react';
import clsx from 'clsx';
import { SubStatistic } from '@/lib/types';

const DETAIL_MAP = {
  0: {
    mainTitle: '표현',
    subTitle: ['문법의 적절성', '단어 사용의 적절성', '문장 표현의 적절성'],
  },
  1: {
    mainTitle: '구성',
    subTitle: [
      '문단 내 구조의 적절성',
      '문단 간 구조의 적절성',
      '구조의 일관성',
      '분량의 적절성',
    ],
  },
  2: {
    mainTitle: '내용',
    subTitle: ['주제의 명료성', '근거의 적절성', '프롬프트 독해력'],
  },
};

function DetailView({
  className,
  exp,
  cont,
  org,
}: {
  className?: string;
  exp: SubStatistic;
  cont: SubStatistic;
  org: SubStatistic;
}) {
  return (
    <div
      className={clsx(
        ' flex flex-col items-center gap-y-6 bg-white px-8 py-6',
        className,
      )}
    >
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
          {[exp, org, cont].map((statistic, idx) => {
            const { sub } = statistic;
            const detail = DETAIL_MAP[idx as keyof typeof DETAIL_MAP];

            return detail.subTitle.map((title, subIdx) => (
              <tr key={detail.mainTitle} className="border-b">
                {subIdx === 0 && (
                  <td
                    rowSpan={detail.subTitle.length}
                    className="whitespace-nowrap border-r text-center"
                  >
                    {detail.mainTitle} 영역
                  </td>
                )}
                <td className="h-10 whitespace-nowrap border-r">{title}</td>
                <td className="border-r">
                  {sub[subIdx].score}
                  <span className="text-sm text-gray-400">/ 3</span>
                </td>
                {subIdx === 0 && (
                  <td
                    rowSpan={detail.subTitle.length}
                    className="whitespace-nowrap text-center text-lg"
                  >
                    {statistic.score}
                    <span className="text-base text-gray-400">
                      {' '}
                      / {3 * detail.subTitle.length}
                    </span>
                  </td>
                )}
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DetailView;
