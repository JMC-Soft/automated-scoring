import React from 'react';
import { RadarChart } from '@/components/ui/Chart';

function RadarView() {
  return (
    <div className="bg-white p-4">
      <RadarChart
        className="h-full w-full"
        labels={[
          '표현 1',
          '표현 2',
          '표현 3',
          '구성 1',
          '구성 2',
          '구성 3',
          '구성 4',
          '내용 1',
          '내용 2',
          '내용 3',
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
