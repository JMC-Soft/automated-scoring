import React from 'react';
import { SubStatistic } from '@/lib/types';
import RadarChart from '@/components/ui/Chart/RadarChart';

export const CATEGORY_LIST = [
  '문법',
  '단어 사용',
  '문장 표현',
  '문단 내 구조',
  '문단 간 구조',
  '구조 일관성',
  '분량 적절성',
  '주제 명료성',
  '근거 적절성',
  '독해력',
];

function RadarView({
  exp,
  cont,
  org,
}: {
  exp: SubStatistic;
  cont: SubStatistic;
  org: SubStatistic;
}) {
  const myScoreList = [
    ...exp.sub.map((sub) => sub.score),
    ...cont.sub.map((sub) => sub.score),
    ...org.sub.map((sub) => sub.score),
  ];

  const totalScoreList = [
    ...exp.sub.map((sub) => sub.average),
    ...cont.sub.map((sub) => sub.average),
    ...org.sub.map((sub) => sub.average),
  ];

  return (
    <div className="bg-white p-4">
      <RadarChart
        className="h-full w-full"
        labels={CATEGORY_LIST}
        dataList={myScoreList}
        totalDataList={totalScoreList}
      />
    </div>
  );
}

export default RadarView;
