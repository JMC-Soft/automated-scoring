'use client';

import React from 'react';
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
import { Chart } from 'react-chartjs-2';
import clsx from 'clsx';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';
import { Statistic } from '@/lib/types';
import pretendard from '@/lib/constants/fonts';

ChartJS.register(LinearScale, BoxPlotController, CategoryScale, BoxAndWiskers);

type Props = {
  dataList: Statistic[] | [];
  className: string;
};

export function BoxPlotView({ dataList, className }: Props) {
  const hasData = dataList.filter((value) => value).length > 0;

  const data: ChartData<'boxplot'> = {
    labels: dataList.map((value) => value?.title),
    datasets: [
      {
        outlierBackgroundColor: hexToRGBA(COLORS.accent[500], 0.5),
        outlierBorderColor: COLORS.accent[500],
        data: dataList.map((value) => {
          const { min, Q1: q1, median, Q3: q3, max, score } = value ?? {};
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
    responsive: true,
    maintainAspectRatio: false,
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
        ticks: {
          font(context) {
            const { height } = context.chart;
            const size = Math.round(height / 14);

            return {
              weight: 'bold',
              size,
              family: pretendard.style.fontFamily,
            };
          },
        },
      },
      x: {
        ticks: {
          font(context) {
            const { height } = context.chart;
            const size = Math.round(height / 12);

            return {
              weight: 'bold',
              size,
              family: pretendard.style.fontFamily,
            };
          },
        },
      },
    },
  };

  return (
    <article
      className={clsx(
        'overflow-auto bg-white px-3 py-2 scrollbar-hide',
        className,
      )}
    >
      {hasData && <Chart type="boxplot" data={data} options={options} />}
    </article>
  );
}

export default BoxPlotView;
