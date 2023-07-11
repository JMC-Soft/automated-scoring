'use client';

import React from 'react';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import merge from 'lodash/merge';
import GRADE_MAP from '@/lib/constants/chart';
import { Statistic } from '@/lib/types';
import COLORS from '@/lib/constants/colors';

type Props = {
  title: string;
  statistics: Statistic;
  className?: string;
  options?: ChartOptions<'doughnut'>;
  data?: Partial<ChartData<'doughnut'>>;
};

export function DoughnutChart({
  className,
  options: customOptions,
  data: customData,
  statistics,
  title,
}: Props) {
  const { percentage, grade } = statistics;

  const defaultData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [GRADE_MAP[grade].color, COLORS.background[500]],
        borderWidth: 0,
      },
    ],
  };

  const defaultOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
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

  const textCenter: Plugin<'doughnut'> = {
    id: 'textCenter',
    beforeDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.font = 'bold 1.75rem pretendard';
      ctx.fillStyle = GRADE_MAP[grade].color;
      ctx.textAlign = 'center';
      ctx.fillText(
        `${grade}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      );
    },
  };

  const plugins: Plugin<'doughnut'>[] = [textCenter];

  const data = merge({}, defaultData, customData);
  const options = merge({}, defaultOptions, customOptions);

  return (
    <div className={className}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default React.memo(DoughnutChart);
