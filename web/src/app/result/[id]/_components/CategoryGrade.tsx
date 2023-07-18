'use client';

import React from 'react';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DEFAULT_OPTIONS, GRADE_COLOR_MAP } from '@/lib/constants/chart';
import COLORS from '@/lib/constants/colors';
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
    ...DEFAULT_OPTIONS,
    rotation: -180,
    cutout: 35,
    plugins: {
      title: {
        display: true,
        position: 'bottom',
        text: title,
        font: {
          size: 20,
          weight: 'bold',
          family: 'pretendard',
        },
      },
    },
  };

  const plugins: Plugin<'doughnut'>[] = [
    textCenterPlugin({ title: grade, color: GRADE_COLOR_MAP[grade] }),
  ];

  return (
    <Doughnut
      className="h-full w-full"
      data={data}
      options={options}
      plugins={plugins}
    />
  );
}

export default CategoryGrade;
