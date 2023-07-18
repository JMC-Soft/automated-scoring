'use client';

import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import {
  BoxAndWiskers,
  BoxPlotController,
} from '@sgratzl/chartjs-chart-boxplot';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';
import { Statistic } from '@/lib/types';
import { DEFAULT_OPTIONS } from '@/lib/constants/chart';

ChartJS.register(LinearScale, BoxPlotController, CategoryScale, BoxAndWiskers);

type Props = {
  dataList: Statistic[];
};

export function BoxPlotView({ dataList }: Props) {
  const data: ChartData<'boxplot'> = {
    labels: dataList.map((value) => value.title),
    datasets: [
      {
        label: '11',
        outlierBackgroundColor: hexToRGBA(COLORS.accent[500], 0.5),
        outlierBorderColor: COLORS.accent[500],
        data: dataList.map((value) => {
          const { min, Q1: q1, median, Q3: q3, max, score } = value;
          return {
            min,
            q1,
            median,
            q3,
            max,
            outliers: [score],
          };
        }),
        backgroundColor: hexToRGBA(COLORS.secondary[500], 0.5),
        borderColor: COLORS.secondary[500],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'boxplot'> = {
    ...DEFAULT_OPTIONS,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <article className="bg-white px-3 py-2">
      <Chart type="boxplot" data={data} options={options} />
    </article>
  );
}

export default BoxPlotView;
