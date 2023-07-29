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
import clsx from 'clsx';
import { SubStatistic } from '@/lib/types';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

export const CATEGORY_LIST = {
  '주제의 명료성': '주제 명료성',
  '근거의 적절성': '근거 적절성',
  '프롬프트 독해력': '독해력',
  '문단 내 구조의 적절성': '문단 내 구조',
  '문단 간 구조의 적절성': '문단 간 구조',
  '구조의 일관성': '구조 일관성',
  '분량의 적절성': '분량 적절성',
  '문법의 적절성': '문법',
  '단어 사용의 적절성': '단어 사용',
  '문장 표현의 적절성': '문장 표현',
};

type Props = {
  dataList: SubStatistic[];
  className: string;
};

function RadarView({ dataList, className }: Props) {
  const hasData = dataList.filter((value) => value).length > 0;

  const data: ChartData<'radar'> = {
    labels: dataList
      .map((value) =>
        value?.detail.map(
          (v) => CATEGORY_LIST[v.title as keyof typeof CATEGORY_LIST],
        ),
      )
      .flat(),
    datasets: [
      {
        label: '내 점수',
        data: dataList.map((value) => value?.detail.map((v) => v.score)).flat(),
        backgroundColor: hexToRGBA(COLORS.secondary[500], 0.2),
        borderColor: hexToRGBA(COLORS.secondary[500], 1),
        pointBackgroundColor: COLORS.secondary[500],
        pointBorderColor: COLORS.secondary[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.secondary[500],
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: '전체 평균',
        data: dataList.map((value) => value?.subAverage).flat(),
        backgroundColor: hexToRGBA(COLORS.warning[500], 0.15),
        borderColor: hexToRGBA(COLORS.warning[500], 1),
        pointBackgroundColor: COLORS.warning[500],
        pointBorderColor: COLORS.warning[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.warning[500],
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
    responsive: true,
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
          color: (context) => {
            const idx = context.index;
            if (idx >= 0 && idx < 3) return hexToRGBA(COLORS.accent[500], 1);
            if (idx >= 3 && idx < 7) return hexToRGBA(COLORS.success[500], 1);
            return hexToRGBA(COLORS.secondary[500], 1);
          },
          font(context) {
            const { width, height } = context.chart;
            const size = Math.min(
              Math.round(height / 28),
              Math.round(width / 32),
            );

            return {
              weight: 'bold',
              size,
              family: 'pretendard',
            };
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
      },
    },
  };

  return (
    <article
      className={clsx(
        'h-auto w-auto overflow-auto bg-white p-8 scrollbar-hide',
        className,
      )}
    >
      {hasData && <Radar data={data} options={options} />}
    </article>
  );
}

export default RadarView;
