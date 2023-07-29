'use client';

import React from 'react';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import COLORS, { GRADE_COLOR_MAP } from '@/lib/constants/colors';
import textCenterPlugin from '@/lib/utils/chart/plugin/textCenterPlugin';
import { Grade } from '@/lib/types';

type Props = {
  grade: Grade;
  score: number;
  max: number;
  title: string;
};

function CategoryGrade({ grade, score, max, title }: Props) {
  const data: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [score, max - score],
        backgroundColor: [GRADE_COLOR_MAP[grade], COLORS.background[500]],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -180,
    cutout: '70%',
    plugins: {
      title: {
        display: true,
        position: 'bottom',
        text: title,
        font(context) {
          const { height } = context.chart;
          const size = Math.round(height / 10);

          return {
            weight: 'bold',
            size,
            family: 'pretendard',
          };
        },
      },
    },
  };

  const plugins: Plugin<'doughnut'>[] = [
    textCenterPlugin({ title: grade, color: GRADE_COLOR_MAP[grade] }),
  ];

  return <Doughnut data={data} options={options} plugins={plugins} />;
}

export default CategoryGrade;
