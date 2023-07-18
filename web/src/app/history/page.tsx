'use client';

import React from 'react';
import Image from 'next/image';
import RecentGradeHistory from '@/app/history/_components/RecentGradeHistory';
import LineChart from '@/components/ui/Chart/LineChart';
import RecentHistoryView from '@/app/result/[id]/_components/RecentHistoryView';
import { RadarChart } from '@/components/ui/Chart/RadarChart';
import WordTable from '@/app/history/_components/WordTable';

function Page() {
  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <div className="grid-rows-history grid-cols-history relative grid h-full w-full gap-8 bg-background-500 p-6 [&>*]:shadow-lg">
        <div className="col-start-1 row-start-1 row-end-3 flex flex-col bg-white">
          <h2 className="flex h-[4%] w-full items-center justify-center bg-secondary-300 text-lg font-semibold text-white">
            워드 클라우드
          </h2>
          <div className="relative my-2 flex w-full justify-center">
            <Image
              src="/word_cloud.png"
              alt="워드 클라우드"
              width={400}
              height={300}
              style={{
                objectFit: 'contain',
                width: '95%',
                height: 'fit-content',
              }}
            />
          </div>
          <RecentGradeHistory />
          <div className="flex w-full flex-1 flex-col justify-center gap-y-1 bg-white px-12">
            <span className="text-3xl font-bold">15</span>
            <h3 className="text-lg">전체 제출 답안</h3>
          </div>
          <div className="flex w-full flex-1 flex-col justify-center gap-y-1 bg-background-500 px-12">
            <span className="text-3xl font-bold">120</span>
            <h3 className="text-lg">평균 사용 문장 수</h3>
          </div>
          <div className="flex w-full flex-1 flex-col justify-center gap-y-1 px-12">
            <span className="text-3xl font-bold">1,300</span>
            <h3 className="text-lg">평균 작성 글자 수</h3>
          </div>
        </div>

        <div className="col-start-2 col-end-4 row-start-1 bg-white p-4">
          <LineChart className="h-full w-full" />
        </div>
        <RecentHistoryView
          className="col-start-4 row-start-1 row-end-3"
          data={Array(5).fill(0)}
        />
        <WordTable className="col-start-2 col-end-3 row-start-2 row-end-3" />

        <div className="col-start-3 col-end-4 row-start-2 row-end-3 flex flex-col items-center gap-y-4 bg-white py-4">
          <h2 className="text-2xl font-semibold">유형별 종합 결과</h2>
          <div className="w-full flex-1">
            <RadarChart
              className="h-full w-full"
              labels={['자기표현', '설득', '정보전달']}
              totalDataList={[2.1, 2.5, 2.4]}
              dataList={[2, 3, 2]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

// <WordTable className="col-start-1 row-start-1 row-end-3" />
// <WordCloud className="col-start-2 row-start-1 row-end-3" />
// <div className="col-start-3 row-start-1 row-end-3 bg-white">
//   <RadarChart
//       className="h-full w-full"
//       labels={['표현', '구성', '내용']}
//       totalDataList={[2.1, 2.5, 2.4]}
//       dataList={[2, 3, 2]}
//   />
// </div>
// <RecentGradeHistory className="col-start-4 row-start-1" />
// <RecentHistoryView
//     className="col-start-4 row-start-2 row-end-4"
//     data={Array(5).fill(0)}
// />
//
// <div className="col-start-1 col-end-4 row-start-3 bg-white p-8">
//   <ComboChart className="h-full w-full" />
// </div>
