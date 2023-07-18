'use client';

import React from 'react';
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Plugin,
  Title,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DEFAULT_OPTIONS } from '@/lib/constants/chart';
import COLORS from '@/lib/constants/colors';
import pretendard from '@/lib/constants/fonts';
import textCenterPlugin from '@/lib/utils/chart/plugin/textCenterPlugin';

ChartJS.register(Title, Tooltip, ArcElement);

function OverallPercentage({ percentage }: { percentage: number }) {
  const data: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [COLORS.primary[500], COLORS.background[500]],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    ...DEFAULT_OPTIONS,
    rotation: -90,
    cutout: 50,
    circumference: 180,
    plugins: {
      title: {
        display: true,
        text: '전체\n백분위',
        position: 'top',
        font: {
          size: 18,
          weight: 'bold',
          family: pretendard.style.fontFamily,
        },
      },
    },
  };

  const plugins: Plugin<'doughnut'>[] = [
    textCenterPlugin({ title: `${percentage}%` }),
  ];

  return (
    <article className="col-start-1 col-end-2 flex flex-col items-center bg-white px-6 py-2">
      <Doughnut
        className="h-full w-full"
        data={data}
        options={options}
        plugins={plugins}
      />
    </article>
  );
}

export default OverallPercentage;
