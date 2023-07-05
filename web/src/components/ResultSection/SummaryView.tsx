'use client';

import React from 'react';
import TriangleRadarChart from '@/components/ui/Chart/TriangleRadarChart';

function SummaryView() {
  return (
    <div className="flex h-full w-4/5 flex-col justify-around self-center justify-self-center">
      <span className="result-title flex h-16 items-center text-xl font-semibold text-primary-700">
        채점 요약
      </span>
      <div className="summary-grid h-4/5 w-full self-center justify-self-center rounded-lg">
        <TriangleRadarChart
          className="flex h-full w-full items-center justify-center"
          labels={['표현', '구성', '문맥']}
          dataList={[2, 4, 4]}
        />
        <div className="summary-text-grid items-center justify-items-center pb-6">
          <h5 className="col-span-2">총 응시자</h5>
          <span className="col-span-2">100명</span>
          <h5>표현 영역</h5>
          <h6 className="text-primary-600">A+</h6>
          <h6>
            9 <span className="text-sm font-medium text-gray-400">/ 9점</span>
          </h6>
          <span>100명</span>
          <h5>구성 영역</h5>
          <h6 className="text-primary-600">A+</h6>
          <h6>
            9 <span className="text-sm font-medium text-gray-400">/ 9점</span>
          </h6>
          <span>100명</span>
          <h5>내용 영역</h5>
          <h6 className="text-primary-600">A+</h6>
          <h6>
            9 <span className="text-sm font-medium text-gray-400">/ 9점</span>
          </h6>
          <span>100명</span>
        </div>
      </div>
    </div>
  );
}

export default SummaryView;
