'use client';

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
} from 'chart.js';
import { Detail } from '@/lib/types';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';
import { DEFAULT_OPTIONS } from '@/lib/constants/chart';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

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

function RadarView({ dataList }: { dataList: Detail[] }) {
  const data: ChartData<'radar'> = {
    labels: CATEGORY_LIST,
    datasets: [
      {
        label: '내 점수',
        data: dataList.map((value) => value.score),
        backgroundColor: hexToRGBA(COLORS.primary[500], 0.2),
        borderColor: COLORS.primary[500],
        pointBackgroundColor: COLORS.primary[500],
        pointBorderColor: COLORS.primary[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.secondary[500],
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: '전체 평균',
        data: dataList.map((value) => value.average),
        backgroundColor: hexToRGBA(COLORS.accent[500], 0.2),
        borderColor: COLORS.accent[500],
        pointBackgroundColor: COLORS.accent[500],
        pointBorderColor: COLORS.accent[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.accent[500],
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    ...DEFAULT_OPTIONS,
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            const score = context.raw as number;

            return score.toFixed(1);
          },
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 3,
        pointLabels: {
          font: {
            size: 14,
            weight: '500',
            family: 'pretendard',
          },
        },
        // 간격
        ticks: {
          stepSize: 1,
          display: false,
        },
        // 배경 선
        grid: {
          color: hexToRGBA(COLORS.primary[500], 0.2),
          lineWidth: 1,
        },
        // 수직 선
        angleLines: { color: hexToRGBA(COLORS.primary[500], 0.2) },
      },
    },
  };

  return (
    <article className="col-start-4 col-end-5 row-start-2 row-end-4 bg-white p-8">
      <Radar data={data} options={options} />
    </article>
  );
}

export default RadarView;
