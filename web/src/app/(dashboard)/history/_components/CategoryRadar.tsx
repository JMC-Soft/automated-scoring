'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  RadialLinearScale,
  ScriptableContext,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import clsx from 'clsx';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';
import pretendard from '@/lib/constants/fonts';

ChartJS.register(RadialLinearScale);

function CategoryRadar({
  radarData,
  className,
}: {
  radarData: { title: string; average: number; score: number | null }[];
  className: string;
}) {
  const data: ChartData<'radar'> = {
    labels: radarData.map((v) => v?.title),
    datasets: [
      {
        label: '내 점수',
        data: radarData.map((v) => v?.score ?? 10),
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
        data: radarData.map((v) => v?.average ?? 10),
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
    // responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            const score = context.raw as number;

            return score.toFixed(1);
          },
        },
      },
      legend: {
        labels: {
          font(context: ScriptableContext<'radar'>) {
            const { width, height } = context.chart;
            const size = Math.min(
              Math.round(height / 28),
              Math.round(width / 28),
            );

            return {
              weight: 'bold',
              size,
              family: pretendard.style.fontFamily,
            };
          },
          boxHeight(context: ScriptableContext<'radar'>) {
            const { width, height } = context.chart;
            return Math.min(Math.round(height / 28), Math.round(width / 28));
          },
          boxWidth(context: ScriptableContext<'radar'>) {
            const { width, height } = context.chart;
            return Math.min(Math.round(height / 7), Math.round(width / 7));
          },
        } as any,
      },
    },
    scales: {
      r: {
        min: 10,
        max: 30,
        pointLabels: {
          font(context) {
            const { width, height } = context.chart;
            const size = Math.min(
              Math.round(height / 22),
              Math.round(width / 22),
            );

            return {
              weight: 'bold',
              size,
              family: pretendard.style.fontFamily,
            };
          },
        },
        // 간격
        ticks: {
          stepSize: 5,
          font(context) {
            const { width, height } = context.chart;
            const size = Math.min(
              Math.round(height / 28),
              Math.round(width / 28),
            );

            return {
              weight: 'bold',
              size,
              family: pretendard.style.fontFamily,
            };
          },
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
    <div
      className={clsx(
        'flex flex-col items-center gap-y-2 overflow-auto bg-white py-4',
        className,
      )}
    >
      <h2 className="text-xl font-semibold">유형별 종합 결과</h2>
      <div className="w-full flex-1 overflow-auto scrollbar-hide">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

export default CategoryRadar;
