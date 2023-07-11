import React from 'react';
import { RadarChart } from '@/components/ui/Chart';

function RadarView() {
  return (
    <div className="bg-white p-4">
      <RadarChart
        className="h-full w-full"
        labels={[
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
        ]}
        dataList={Array(10)
          .fill(0)
          .map(() => Math.round(Math.random() * 2 + 1))}
        totalDataList={Array(10)
          .fill(0)
          .map(() => Math.random() + 1.5)}
      />
    </div>
  );
}

export default RadarView;
